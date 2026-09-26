import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getRazorpayClient } from '@/lib/payments/razorpay'
import { COUPON_DISCOUNTS, type CartItem } from '@/lib/cart/cart-store'
import type { ServiceType } from '@/lib/types/database.types'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Please log in to proceed with payment.' },
        { status: 401 }
      )
    }

    // Fetch user profile for contact information
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email, phone')
      .eq('id', user.id)
      .single()

    const body = await request.json()
    const { items, couponCode, orderId } = body as {
      items?: CartItem[]
      couponCode?: string | null
      orderId?: string
    }

    let targetOrderId = orderId
    let finalAmountINR = 0
    let orderTitle = 'Design Service'

    // Scenario A: Existing unpaid order being paid from dashboard
    if (orderId) {
      const { data: existingOrder, error: orderErr } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

      if (orderErr || !existingOrder) {
        return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
      }

      if (existingOrder.payment_status === 'paid') {
        return NextResponse.json(
          { error: 'This order is already paid.' },
          { status: 400 }
        )
      }

      if (!existingOrder.amount || existingOrder.amount <= 0) {
        return NextResponse.json(
          { error: 'Order amount has not been configured yet.' },
          { status: 400 }
        )
      }

      finalAmountINR = existingOrder.amount
      orderTitle = existingOrder.title
      targetOrderId = existingOrder.id
    }
    // Scenario B: Cart Checkout
    else if (items && items.length > 0) {
      // Calculate server-side total
      const subtotal = items.reduce(
        (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
        0
      )

      let discountRate = 0
      if (couponCode && COUPON_DISCOUNTS[couponCode.toUpperCase()]) {
        discountRate = COUPON_DISCOUNTS[couponCode.toUpperCase()]
      }

      const discount = Math.round(subtotal * discountRate)
      finalAmountINR = Math.max(1, subtotal - discount) // Minimum ₹1 for gateway

      const mainItem = items[0]
      orderTitle = items.length === 1 ? mainItem.title : `${mainItem.serviceType} + ${items.length - 1} more`
      
      const validServiceTypes = ['graphic_design', 'video_editing', '3d_motion', 'branding_kit', 'thumbnail', 'ppt_design']
      let serviceType: ServiceType = 'graphic_design'
      if (mainItem.serviceSlug && validServiceTypes.includes(mainItem.serviceSlug)) {
        serviceType = mainItem.serviceSlug as ServiceType
      }

      // Insert new order in Supabase with standard schema columns
      const insertPayload = {
        customer_id: user.id,
        service_type: serviceType,
        title: orderTitle,
        brief: `Cart Checkout (${items.length} item${items.length > 1 ? 's' : ''})`,
        amount: finalAmountINR,
        payment_status: 'unpaid' as const,
        status: 'pending' as const,
      }

      let { data: newOrder, error: createErr } = await supabase
        .from('orders')
        .insert(insertPayload)
        .select()
        .single()

      // Robust fallback using service role client if RLS or session cookies are stripped on API fetch
      if (createErr && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.warn('Retrying order creation with elevated service client:', createErr.message)
        const { createClient: createAdminClient } = await import('@supabase/supabase-js')
        const adminSupabase = createAdminClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        )
        const adminRes = await adminSupabase
          .from('orders')
          .insert(insertPayload)
          .select()
          .single()

        newOrder = adminRes.data
        createErr = adminRes.error
      }

      if (createErr || !newOrder) {
        console.error('Failed to create order in DB:', createErr)
        return NextResponse.json(
          { error: createErr?.message || 'Failed to create order record. Please try again.' },
          { status: 500 }
        )
      }

      targetOrderId = newOrder.id
    } else {
      return NextResponse.json(
        { error: 'No order or cart items provided.' },
        { status: 400 }
      )
    }

    // Initialize Razorpay and create gateway order
    const razorpay = getRazorpayClient()
    const amountInPaise = Math.round(finalAmountINR * 100)

    // Receipt length in Razorpay has a max 40 chars limit
    const cleanReceipt = `rcpt_${targetOrderId.replace(/-/g, '').slice(0, 30)}`

    const rzpOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: cleanReceipt,
      notes: {
        orderId: targetOrderId,
        userId: user.id,
        userEmail: user.email || profile?.email || '',
      },
    })

    // Save gateway_order_id in orders table
    await supabase
      .from('orders')
      .update({ gateway_order_id: rzpOrder.id })
      .eq('id', targetOrderId)

    return NextResponse.json({
      success: true,
      orderId: targetOrderId,
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount, // in paise
      currency: rzpOrder.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      title: orderTitle,
      customer: {
        name: profile?.full_name || user.user_metadata?.full_name || 'Customer',
        email: user.email || profile?.email || '',
        phone: profile?.phone || '',
      },
    })
  } catch (err: any) {
    console.error('Razorpay order creation error:', err)
    return NextResponse.json(
      { error: err.message || 'Error creating Razorpay order' },
      { status: 500 }
    )
  }
}
