import Razorpay from 'razorpay'
import crypto from 'crypto'

export function getRazorpayClient() {
  const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET

  if (!key_id || !key_secret) {
    throw new Error(
      'Razorpay credentials missing. Please set NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment.'
    )
  }

  return new Razorpay({
    key_id,
    key_secret,
  })
}

/**
 * Verifies the payment signature returned by the Razorpay checkout modal
 * Generated as: HMAC-SHA256(order_id + "|" + razorpay_payment_id, secret)
 */
export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string
  paymentId: string
  signature: string
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) return false

  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(generatedSignature),
    Buffer.from(signature)
  )
}

/**
 * Verifies incoming Razorpay webhook signature from the x-razorpay-signature header
 */
export function verifyRazorpayWebhook({
  rawBody,
  signature,
}: {
  rawBody: string
  signature: string
}): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!webhookSecret) return false

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex')

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    )
  } catch {
    return false
  }
}
