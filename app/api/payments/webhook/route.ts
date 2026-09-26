import { NextResponse } from 'next/server'
import { verifyRazorpayWebhook } from '@/lib/payments/razorpay'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing x-razorpay-signature header' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const isValid = verifyRazorpayWebhook({ rawBody, signature })
    if (!isValid) {
      console.error('[Razorpay Webhook] Invalid webhook signature detected')
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
    }

    const event = JSON.parse(rawBody)
    const eventType = event.event
    console.log(`[Razorpay Webhook] Received verified event: ${eventType}`)

    // Create elevated Supabase client for background webhook updates
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient(supabaseUrl, serviceRoleKey)

    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity
      const orderEntity = event.payload?.order?.entity

      const rzpOrderId = paymentEntity?.order_id || orderEntity?.id
      const paymentId = paymentEntity?.id
      const notesOrderId = paymentEntity?.notes?.orderId || orderEntity?.notes?.orderId

      if (rzpOrderId || notesOrderId) {
        let updateQuery = supabase.from('orders').update({
          payment_status: 'paid',
          payment_id: paymentId,
          paid_at: new Date().toISOString(),
          status: 'in_progress',
        })

        if (notesOrderId) {
          updateQuery = updateQuery.eq('id', notesOrderId)
        } else if (rzpOrderId) {
          updateQuery = updateQuery.eq('gateway_order_id', rzpOrderId)
        }

        const { error: updateErr } = await updateQuery

        if (updateErr) {
          console.error('[Razorpay Webhook] Failed to update order in database:', updateErr)
        } else {
          console.log(`[Razorpay Webhook] Order linked to ${rzpOrderId || notesOrderId} successfully marked PAID!`)
        }
      }
    }

    return NextResponse.json({ status: 'ok' })
  } catch (err: any) {
    console.error('[Razorpay Webhook Error]:', err)
    return NextResponse.json({ error: err.message || 'Webhook processing error' }, { status: 500 })
  }
}
