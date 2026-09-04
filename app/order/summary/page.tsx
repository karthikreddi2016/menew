'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  getCartItems,
  saveCartItems,
  addCartItem,
  removeCartItem,
  getAppliedCoupon,
  setAppliedCoupon,
  COUPON_DISCOUNTS,
  type CartItem,
} from '@/lib/cart/cart-store'

function OrderSummaryContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [items, setItems] = useState<CartItem[]>([])
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setApplied] = useState<string | null>(null)
  const [couponError, setCouponError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loaded = getCartItems()
    setItems(loaded)
    const savedCoupon = getAppliedCoupon()
    if (savedCoupon && COUPON_DISCOUNTS[savedCoupon]) {
      setApplied(savedCoupon)
    }
  }, [])

  // Calculate totals
  const rawSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const discountRate = appliedCoupon ? COUPON_DISCOUNTS[appliedCoupon] || 0 : 0
  const discountAmount = Math.round(rawSubtotal * discountRate)
  const finalTotal = Math.max(0, rawSubtotal - discountAmount)

  function handleApplyCoupon(e?: React.FormEvent) {
    if (e) e.preventDefault()
    setCouponError('')
    const code = couponCode.trim().toUpperCase()
    if (!code) return

    if (COUPON_DISCOUNTS[code]) {
      setApplied(code)
      setAppliedCoupon(code)
      setCouponCode('')
    } else {
      setCouponError('Invalid coupon code. Try PILOT10, FIRST20, or MENEW15')
    }
  }

  function handleRemoveCoupon() {
    setApplied(null)
    setAppliedCoupon(null)
  }

  function handleAddAnotherRequest() {
    // Add another sample request or navigate to order page
    const newItem = addCartItem({
      serviceType: 'Video Editing',
      serviceSlug: 'video_editing',
      title: 'Promotional campaign reel for the New Customers to post on our brand page on...',
      price: 500,
      quantity: 3,
    })
    setItems((prev) => [...prev, newItem])
  }

  function handleRemoveItem(id: string) {
    const updated = removeCartItem(id)
    setItems(updated)
  }

  function handleCheckout() {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* ── Top Back Navigation Bar ── */}
      <header className="bg-white border-b border-[#EDEDED] py-3.5 px-4 sm:px-8 sticky top-0 z-30">
        <div className="max-w-[480px] sm:max-w-[540px] mx-auto flex items-center justify-start">
          <Link
            href="/order"
            className="inline-flex items-center gap-2 font-inter text-[14px] font-medium text-[#49454f] hover:text-[#2952E1] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back</span>
          </Link>
        </div>
      </header>

      {/* ── Order Summary Main Content ── */}
      <main className="max-w-[480px] sm:max-w-[540px] mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="font-serif text-[28px] sm:text-[32px] text-[#191919] font-normal mb-6 tracking-[-0.25px]">
          Order Summary
        </h1>

        {/* List of Order Request Cards */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const itemTotal = item.price * item.quantity
            return (
              <div
                key={item.id || idx}
                className="rounded-[16px] border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-2xs relative transition-all"
              >
                {/* Header Box with Service & Icon */}
                <div className="rounded-[12px] border border-[#EDEDED] p-4 bg-white mb-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-[18px] sm:text-[20px] font-normal text-[#191919] tracking-[-0.25px]">
                      {item.serviceType}
                    </h3>
                    <div className="text-[#191919] shrink-0 p-0.5">
                      {item.serviceSlug.includes('video') ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                          <line x1="7" y1="2" x2="7" y2="22" />
                          <line x1="17" y1="2" x2="17" y2="22" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 19l7-7 3 3-7 7-3-3z" />
                          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L11 18l7-5z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="font-inter text-[13px] text-[#6f6f6f] mt-2 line-clamp-2 leading-relaxed">
                    {item.title}
                  </p>
                </div>

                {/* Details Breakdown */}
                <div className="space-y-2.5 font-inter text-[14px]">
                  <div className="flex items-center justify-between text-[#191919]">
                    <span className="text-[#6f6f6f]">Order ID:</span>
                    <span className="font-medium">{item.orderId}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#191919]">
                    <span className="text-[#6f6f6f]">Expected Delivery:</span>
                    <span className="font-medium">{item.expectedDelivery}</span>
                  </div>

                  <div className="border-t border-[#F0F0F0] my-2" />

                  <div className="flex items-center justify-between text-[#191919]">
                    <span className="text-[#6f6f6f]">Price</span>
                    <span className="font-medium">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#191919]">
                    <span className="text-[#6f6f6f]">Quantity:</span>
                    <span className="font-medium">{item.quantity}</span>
                  </div>

                  <div className="border-t border-[#F0F0F0] my-2" />

                  <div className="flex items-center justify-between text-[#191919] pt-0.5">
                    <span className="font-semibold text-[15px]">Total</span>
                    <span className="font-bold text-[16px]">₹{itemTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Remove button if multiple items */}
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-2 right-2 text-xs text-[#DC2626] hover:underline p-1"
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Add Request Button ── */}
        <div className="mt-5 mb-6">
          <button
            type="button"
            onClick={handleAddAnotherRequest}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#DCE6FF] hover:bg-[#CADBFF] px-5 py-2.5 font-inter text-[14px] font-medium text-[#2952E1] transition-all active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add Request</span>
          </button>
        </div>

        {/* ── Coupon / Promo Box ── */}
        <div className="rounded-[16px] border border-[#E5E7EB] bg-white p-4 sm:p-5 shadow-2xs space-y-3 mb-6">
          {/* Pink Coupon Suggestions */}
          <div className="rounded-[10px] bg-[#FFF1F5] border border-[#FBCFE8] p-3 text-[#BE185D] flex items-center gap-2 font-inter text-[13px] font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            <span>First time? <strong className="font-bold">Try: PILOT10, FIRST20, MENEW15</strong></span>
          </div>

          {/* Coupon Input Form */}
          <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Add Coupon/Promotional Code"
                className="w-full rounded-[10px] border border-[#EDEDED] bg-white pl-10 pr-4 py-2.5 font-inter text-[14px] text-[#191919] placeholder:text-[#9CA3AF] outline-none focus:border-[#2952E1] uppercase"
              />
            </div>
            <button
              type="submit"
              className="font-inter text-[14px] font-medium text-[#737373] hover:text-[#2952E1] px-4 py-2.5 rounded-[10px] border border-[#EDEDED] hover:border-[#2952E1]/40 transition-colors shrink-0"
            >
              Apply
            </button>
          </form>

          {couponError && (
            <p className="font-inter text-xs text-[#DC2626]">{couponError}</p>
          )}

          {appliedCoupon && (
            <div className="flex items-center justify-between text-xs font-inter text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] p-2.5 rounded-[8px]">
              <span>Coupon <strong>{appliedCoupon}</strong> applied (-₹{discountAmount})</span>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-[#DC2626] font-medium hover:underline ml-2"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* ── Pink Pilot Payment Info Box ── */}
        <div className="rounded-[12px] bg-[#FFF1F5] border border-[#FBCFE8] p-4 flex items-start gap-3 text-[#BE185D] mb-8">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-[#DB2777] mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <p className="font-inter text-[13px] leading-relaxed">
            <strong className="font-semibold">Payment:</strong> After submitting, you&apos;ll receive a payment link via email. Once paid, your designer will start working on your project!
          </p>
        </div>

        {/* ── Bottom SubTotal & Action Buttons Bar ── */}
        <div className="border-t border-[#E5E7EB] pt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between font-inter text-[#191919]">
            <span className="text-[20px] sm:text-[22px] font-bold">SubTotal</span>
            <span className="text-[20px] sm:text-[22px] font-bold">₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/order"
              className="inline-flex items-center justify-center rounded-full border border-[#2952E1] bg-white px-8 py-3.5 font-inter font-medium text-[15px] text-[#2952E1] hover:bg-[#2952E1]/5 transition-all flex-1 max-w-[130px] text-center"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isSubmitting || items.length === 0}
              className="inline-flex items-center justify-center rounded-full bg-[#2952E1] px-10 py-3.5 font-inter font-medium text-[15px] text-white shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] hover:bg-[#1e42c7] active:scale-95 transition-all flex-1 text-center disabled:opacity-60"
            >
              {isSubmitting ? 'Processing…' : 'Checkout'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function OrderSummaryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-inter text-black/40">Loading Summary…</div>}>
      <OrderSummaryContent />
    </Suspense>
  )
}
