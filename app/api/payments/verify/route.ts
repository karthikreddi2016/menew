import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { verifyRazorpaySignature } from '@/lib/payments/razorpay'
import { appendOrderToGoogleSheet } from '@/lib/services/google-sheets'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body as {
      orderId?: string
      razorpay_order_id: string
      razorpay_payment_id: string
      razorpay_signature: string
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required Razorpay verification parameters.' },
        { status: 400 }
      )
    }

    // Verify HMAC SHA256 signature
    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    })

    if (!isValid) {
      console.error('[Razorpay Verify] Invalid signature for payment:', razorpay_payment_id)
      return NextResponse.json(
        { error: 'Payment signature verification failed. Transaction flagged.' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Find the target order either by orderId or gateway_order_id
    let query = supabase.from('orders').select('*')
    if (orderId) {
      query = query.eq('id', orderId)
    } else {
      query = query.eq('gateway_order_id', razorpay_order_id)
    }

    const { data: order, error: fetchErr } = await query.single()

    if (fetchErr || !order) {
      console.warn('[Razorpay Verify] Order not found for update, attempting fallback match:', fetchErr)
    }

    const targetId = order?.id || orderId

    if (targetId) {
      const nowIso = new Date().toISOString()
      const { error: updateErr } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          payment_id: razorpay_payment_id,
          paid_at: nowIso,
          status: 'in_progress', // Start working on order immediately upon payment
        })
        .eq('id', targetId)

      if (updateErr) {
        console.error('[Razorpay Verify] Failed to update order status:', updateErr)
      } else {
        console.log(`[Razorpay Verify] Order #${targetId} marked PAID successfully!`)
      }

      // Try appending to Google Sheet in background
      try {
        if (order) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email, phone')
            .eq('id', order.customer_id)
            .single()

          appendOrderToGoogleSheet({
            orderId: targetId,
            createdAt: nowIso,
            serviceType: order.service_type,
            title: order.title,
            creativeType: order.creative_type,
            brief: order.brief,
            copyContent: order.copy_content,
            needContentHelp: order.need_content_help,
            assetLink: order.asset_link,
            referenceLink: order.reference_link,
            stylePref: order.style_pref,
            brandName: order.brand_name,
            industry: order.industry,
            tagline: order.tagline,
            brandPersonality: order.brand_personality,
            quantity: order.quantity,
            numSlides: order.num_slides,
            deadline: order.deadline_pref,
            customerName: profile?.full_name || 'Customer',
            customerEmail: profile?.email || '',
            contactPref: profile?.phone || order.contact_pref || '',
            status: 'in_progress',
            notes: `Paid via Razorpay (Payment ID: ${razorpay_payment_id})`,
          }).catch((e) => console.error('[Google Sheets Sync Error]', e))
        }
      } catch (sheetErr) {
        console.error('[Razorpay Verify] Google sheets sync skipped:', sheetErr)
      }
    }

    return NextResponse.json({
      success: true,
      orderId: targetId,
      paymentId: razorpay_payment_id,
    })
  } catch (err: any) {
    console.error('[Razorpay Verify] Server error:', err)
    return NextResponse.json(
      { error: err.message || 'Payment verification failed' },
      { status: 500 }
    )
  }
}
