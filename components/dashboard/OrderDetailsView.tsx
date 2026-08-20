'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export type OrderTrackingStatus =
  | 'payment_pending'
  | 'confirmed'
  | 'in_progress'
  | 'cancel_requested'
  | 'refund_initiated'
  | 'completed'
  | 'cancelled'

interface OrderDetailsProps {
  orderId: string
  serviceTitle: string
  orderedDate: string
  expectedDelivery: string
  status: OrderTrackingStatus
  backHref?: string
}

export function OrderDetailsView({
  orderId = '23456789',
  serviceTitle = 'Graphic Design',
  orderedDate = '14 Jan 2026',
  expectedDelivery = '15 Jan 2026',
  status = 'confirmed',
  backHref = '/cart',
}: OrderDetailsProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<OrderTrackingStatus>(status)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [cancelMethod, setCancelMethod] = useState<'whatsapp' | 'email' | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Sync status if props change
  useEffect(() => {
    setCurrentStatus(status)
  }, [status])

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isPending = currentStatus === 'payment_pending'
  const isCompleted = currentStatus === 'completed'
  const isCancelled = currentStatus === 'cancelled'
  const isRefundInitiated = currentStatus === 'refund_initiated'
  const isCancelRequested = currentStatus === 'cancel_requested'
  const isCancellationFlow = isCancelRequested || isRefundInitiated || isCancelled

  const whatsappMessage = encodeURIComponent(
    `Hi Menew Team, I would like to request cancellation and discuss refund for Order #${orderId} (${serviceTitle}).`
  )
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMessage}`

  const emailSubject = encodeURIComponent(`Cancellation Request for Order #${orderId}`)
  const emailBody = encodeURIComponent(
    `Hi Menew Support Team,\n\nI would like to cancel my order and discuss refund details.\n\nOrder ID: ${orderId}\nService: ${serviceTitle}\nOrdered Date: ${orderedDate}\n\nThank you.`
  )
  const emailUrl = `mailto:support@menew.in?subject=${emailSubject}&body=${emailBody}`

  function handleCancelOrder() {
    setIsMenuOpen(false)
    setShowCancelModal(true)
  }

  function handleContactWhatsApp() {
    setCurrentStatus('cancel_requested')
    setShowCancelModal(false)
    window.open(whatsappUrl, '_blank')
  }

  function handleContactEmail() {
    setCurrentStatus('cancel_requested')
    setShowCancelModal(false)
    window.open(emailUrl, '_blank')
  }

  function handleReportIssue() {
    setIsMenuOpen(false)
    setShowReportModal(true)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* ── Top Back Navigation Bar ── */}
      <header className="bg-white border-b border-[#EDEDED] py-3.5 px-4 sm:px-8 mb-6 sticky top-0 z-30">
        <div className="max-w-[480px] sm:max-w-[520px] mx-auto flex items-center justify-start">
          <Link
            href={backHref}
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

      {/* ── Main Container matching mobile/desktop prototype layout ── */}
      <main className="max-w-[480px] sm:max-w-[520px] mx-auto px-4 space-y-4">
        {/* ── Card 1: Order Details Header Card ── */}
        <div className="bg-white rounded-[20px] border border-[#E5E7EB] p-6 shadow-2xs relative">
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-serif text-[26px] sm:text-[28px] font-normal text-[#191919] tracking-[-0.25px]">
              {serviceTitle}
            </h1>

            {/* Three Dots Button */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isMenuOpen ? 'bg-gray-100 text-[#191919]' : 'text-[#6f6f6f] hover:bg-gray-50 hover:text-[#191919]'
                }`}
                aria-label="Order Options"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </button>

              {/* Three Dots Dropdown Popover */}
              {isMenuOpen && (
                <div className="absolute right-0 top-10 z-40 w-[170px] rounded-[14px] bg-white py-2 shadow-xl border border-[#E5E7EB] animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={handleCancelOrder}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left font-inter text-[14px] text-[#374151] hover:bg-gray-50 hover:text-[#DC2626] transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>Cancel Order</span>
                  </button>

                  <div className="my-1 border-t border-[#F3F4F6]" />

                  <button
                    type="button"
                    onClick={handleReportIssue}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left font-inter text-[14px] text-[#DC2626] hover:bg-gray-50 transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                      <line x1="4" y1="22" x2="4" y2="15" />
                    </svg>
                    <span>Report Issue</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Details List */}
          <div className="mt-3 space-y-1.5 font-inter text-[14px] text-[#191919]">
            <p>
              Order ID: <span className="font-normal">{orderId}</span>
            </p>
            <p>
              Ordered: <span className="font-normal">{orderedDate}</span>
            </p>
            <p>
              Expected Delivery: <span className="font-normal">{expectedDelivery}</span>
            </p>
          </div>

          {/* Status Badge */}
          <div className="mt-4">
            {isCompleted ? (
              <span className="inline-flex items-center px-3 py-1 rounded-[6px] bg-[#005B3A] text-white font-inter text-[13px] font-medium">
                Completed
              </span>
            ) : isCancelled ? (
              <span className="inline-flex items-center px-3 py-1 rounded-[6px] border border-[#EF4444] text-[#DC2626] bg-[#FEF2F2] font-inter text-[13px] font-medium">
                Order Cancelled
              </span>
            ) : isRefundInitiated ? (
              <span className="inline-flex items-center px-3 py-1 rounded-[6px] border border-[#00C288] text-[#008F64] bg-[#E8FFF7] font-inter text-[13px] font-medium">
                Refund Initiated
              </span>
            ) : isCancelRequested ? (
              <span className="inline-flex items-center px-3 py-1 rounded-[6px] border border-[#F59E0B] text-[#D97706] bg-[#FFFBEB] font-inter text-[13px] font-medium">
                Cancel Requested
              </span>
            ) : isPending ? (
              <span className="inline-flex items-center px-3 py-1 rounded-[6px] border border-[#F59E0B] text-[#D97706] bg-[#FFFBEB] font-inter text-[13px] font-medium">
                Payment Pending
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-[6px] border border-[#10B981] text-[#059669] bg-[#ECFDF5] font-inter text-[13px] font-medium">
                Order Confirmed
              </span>
            )}
          </div>
        </div>

        {/* ── Card 2: Order Progress Stepper Card ── */}
        <div className="bg-white rounded-[20px] border border-[#E5E7EB] p-6 shadow-2xs">
          <h2 className="font-inter text-[16px] font-semibold text-[#191919] mb-6">
            Order Progress
          </h2>

          <div className="space-y-6 relative pl-1">
            {isCancellationFlow ? (
              /* ── Dynamic Cancel & Refund Flow Stepper (Figma Order Tracking/Order Can...) ── */
              <>
                {/* Step 1: Order Placed (Always completed in cancel flow) */}
                <div className="relative flex items-start gap-4">
                  <div className={`absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] ${isCancelRequested || isRefundInitiated || isCancelled ? 'bg-[#00C288]' : 'bg-[#E5E7EB]'}`} />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C288] text-white shadow-2xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-inter text-[14px] sm:text-[15px] font-semibold text-[#191919]">Order Placed</h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#6f6f6f] mt-0.5 leading-snug">Payment successfully initiated by you</p>
                    </div>
                    <span className="font-inter text-[12px] text-[#6f6f6f] shrink-0">{expectedDelivery}</span>
                  </div>
                </div>

                {/* Step 2: Cancel Request sent */}
                <div className="relative flex items-start gap-4">
                  <div className={`absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] ${isRefundInitiated || isCancelled ? 'bg-[#00C288]' : 'bg-[#E5E7EB]'}`} />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFA500] text-white shadow-2xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-inter text-[14px] sm:text-[15px] font-semibold text-[#191919]">Cancel Request sent</h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#6f6f6f] mt-0.5 leading-snug">Order cancelation request sent to spokesperson</p>
                    </div>
                    <span className="font-inter text-[12px] text-[#6f6f6f] shrink-0">{expectedDelivery}</span>
                  </div>
                </div>

                {/* Step 3: Refund Initiated */}
                <div className="relative flex items-start gap-4">
                  <div className={`absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] ${isCancelled ? 'bg-[#00C288]' : 'bg-[#E5E7EB]'}`} />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    {isRefundInitiated || isCancelled ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C288] text-white shadow-2xs">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-[#D1D5DB] bg-white" />
                    )}
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`font-inter text-[14px] sm:text-[15px] ${isRefundInitiated || isCancelled ? 'font-semibold text-[#191919]' : 'font-normal text-[#9CA3AF]'}`}>
                        Refund Initiated
                      </h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#6f6f6f] mt-0.5 leading-snug">
                        {isRefundInitiated || isCancelled ? 'Refund sent by admin.' : 'Awaiting admin processing'}
                      </p>
                    </div>
                    {(isRefundInitiated || isCancelled) && (
                      <span className="font-inter text-[12px] text-[#6f6f6f] shrink-0">{expectedDelivery}</span>
                    )}
                  </div>
                </div>

                {/* Step 4: Order Cancelled */}
                <div className="relative flex items-start gap-4">
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    {isCancelled ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9383A] text-white shadow-2xs">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-[#D1D5DB] bg-white" />
                    )}
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`font-inter text-[14px] sm:text-[15px] ${isCancelled ? 'font-semibold text-[#191919]' : 'font-normal text-[#9CA3AF]'}`}>
                        Order Cancelled
                      </h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#6f6f6f] mt-0.5 leading-snug">
                        {isCancelled ? 'Order cancelled on your request' : 'Pending final review by admin'}
                      </p>
                    </div>
                    {isCancelled && (
                      <span className="font-inter text-[12px] text-[#6f6f6f] shrink-0">16 Jan 2026</span>
                    )}
                  </div>
                </div>
              </>
            ) : isCompleted ? (
              /* ── All 6 Steps Completed (Figma Order Tracking/Order Deli...) ── */
              <>
                {/* Step 1: Order Placed */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] bg-[#00C288]" />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C288] text-white shadow-2xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-inter text-[14px] sm:text-[15px] font-semibold text-[#191919]">Order Placed</h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#6f6f6f] mt-0.5 leading-snug">Payment successfully initiated by you</p>
                    </div>
                    <span className="font-inter text-[12px] text-[#6f6f6f] shrink-0">{expectedDelivery}</span>
                  </div>
                </div>

                {/* Step 2: In Progress */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] bg-[#00C288]" />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C288] text-white shadow-2xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-inter text-[14px] sm:text-[15px] font-semibold text-[#191919]">In Progress</h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#6f6f6f] mt-0.5 leading-snug">Designer assigned to your project</p>
                    </div>
                    <span className="font-inter text-[12px] text-[#6f6f6f] shrink-0">{expectedDelivery}</span>
                  </div>
                </div>

                {/* Step 3: Draft Sent to Mail */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] bg-[#00C288]" />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C288] text-white shadow-2xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-inter text-[14px] sm:text-[15px] font-semibold text-[#191919]">Draft Sent to Mail</h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#6f6f6f] mt-0.5 leading-snug">Initial draft shared via email</p>
                    </div>
                    <span className="font-inter text-[12px] text-[#6f6f6f] shrink-0">16 Jan 2026</span>
                  </div>
                </div>

                {/* Step 4: Revision Requested */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] bg-[#00C288]" />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C288] text-white shadow-2xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-inter text-[14px] sm:text-[15px] font-semibold text-[#191919]">Revision Requested</h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#6f6f6f] mt-0.5 leading-snug">Changes are in progress.</p>
                    </div>
                    <span className="font-inter text-[12px] text-[#6f6f6f] shrink-0">16 Jan 2026</span>
                  </div>
                </div>

                {/* Step 5: Final Draft Sent */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] bg-[#00C288]" />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C288] text-white shadow-2xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-inter text-[14px] sm:text-[15px] font-semibold text-[#191919]">Final Draft Sent</h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#6f6f6f] mt-0.5 leading-snug">Final design delivered on mail</p>
                    </div>
                    <span className="font-inter text-[12px] text-[#6f6f6f] shrink-0">17 Jan 2026</span>
                  </div>
                </div>

                {/* Step 6: Completed */}
                <div className="relative flex items-start gap-4">
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C288] text-white shadow-2xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-inter text-[14px] sm:text-[15px] font-semibold text-[#191919]">Completed</h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#6f6f6f] mt-0.5 leading-snug">Project successfully completed</p>
                    </div>
                    <span className="font-inter text-[12px] text-[#6f6f6f] shrink-0">18 Jan 2026</span>
                  </div>
                </div>
              </>
            ) : (
              /* ── Initial In Progress / Pending Payment Stepper ── */
              <>
                {/* Step 1 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] bg-[#E5E7EB]" />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    {isPending ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-2xs">
                        <span className="font-serif font-bold text-[13px]">i</span>
                      </div>
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C288] text-white shadow-2xs">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-inter text-[14px] sm:text-[15px] font-semibold text-[#191919]">
                        {isPending ? 'Payment Pending' : 'Order Placed'}
                      </h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#6f6f6f] mt-0.5 max-w-[240px] leading-snug">
                        {isPending
                          ? 'Complete The payment through the link sent on you email'
                          : 'Payment successfully initiated by you'}
                      </p>
                    </div>
                    <span className="font-inter text-[12px] text-[#6f6f6f] shrink-0">{expectedDelivery}</span>
                  </div>
                </div>

                {/* Step 2: In Progress */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] bg-[#E5E7EB]" />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="h-5 w-5 rounded-full border-2 border-[#D1D5DB] bg-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-inter text-[14px] sm:text-[15px] font-normal text-[#9CA3AF]">In Progress</h3>
                  </div>
                </div>

                {/* Step 3: Draft Sent to Mail */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] bg-[#E5E7EB]" />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="h-5 w-5 rounded-full border-2 border-[#D1D5DB] bg-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-inter text-[14px] sm:text-[15px] font-normal text-[#9CA3AF]">Draft Sent to Mail</h3>
                  </div>
                </div>

                {/* Step 4: Final Draft Sent */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] bg-[#E5E7EB]" />
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="h-5 w-5 rounded-full border-2 border-[#D1D5DB] bg-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-inter text-[14px] sm:text-[15px] font-normal text-[#9CA3AF]">Final Draft Sent</h3>
                  </div>
                </div>

                {/* Step 5: Completed */}
                <div className="relative flex items-start gap-4">
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div className="h-5 w-5 rounded-full border-2 border-[#D1D5DB] bg-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-inter text-[14px] sm:text-[15px] font-normal text-[#9CA3AF]">Completed</h3>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Pink Payment Info Box ── */}
        <div className="rounded-[12px] bg-[#FFF1F5] border border-[#FBCFE8] p-4 flex items-start gap-3 text-[#BE185D]">
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
      </main>

      {/* ── Cancel Order? Modal with WhatsApp & Email direct connection ── */}
      {showCancelModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowCancelModal(false)}
        >
          <div
            className="w-full max-w-[360px] rounded-[24px] bg-white p-7 shadow-2xl border border-[#EDEDED] text-center flex flex-col items-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Pleading Emoji 🥺 */}
            <div className="text-4xl mb-3 select-none">
              🥺
            </div>

            {/* Title */}
            <h3 className="font-serif text-[24px] font-normal text-[#191919] tracking-[-0.25px]">
              Cancel Order?
            </h3>

            {/* Order ID */}
            <p className="font-inter text-[14px] font-medium text-[#191919] mt-1 mb-3">
              Order ID: {orderId}
            </p>

            {/* Description */}
            <p className="font-inter text-[13px] sm:text-[14px] leading-relaxed text-[#545454] mb-6 max-w-[270px]">
              Talk to our Team to cancel your order and Discuss refund queries.
            </p>

            {/* Contact Action Buttons */}
            <div className="w-full space-y-2.5">
              <button
                type="button"
                onClick={handleContactWhatsApp}
                className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-inter font-medium text-[15px] shadow-[0_4px_14px_0_rgba(37,211,102,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleContactEmail}
                className="w-full py-3 rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white font-inter font-medium text-[14px] shadow-[0_4px_14px_0_rgba(41,82,225,0.25)] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Email Spokesperson</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="w-full py-2 font-inter text-[13px] text-[#6f6f6f] hover:underline"
              >
                Keep Order Active
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Report Issue Modal ── */}
      {showReportModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowReportModal(false)}
        >
          <div
            className="w-full max-w-[360px] rounded-[24px] bg-white p-7 shadow-2xl border border-[#EDEDED] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 text-[#D97706] mx-auto flex items-center justify-center mb-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
            </div>
            <h3 className="font-serif text-[22px] font-normal text-[#191919]">Report an Issue</h3>
            <p className="font-inter text-[13px] text-[#6f6f6f] mt-1.5 mb-5">
              Need assistance with Order #{orderId}? Reach out directly to our dedicated support team.
            </p>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block w-full py-3 rounded-full bg-[#2952E1] text-white font-inter text-[14px] font-medium hover:bg-[#1e42c7]"
              >
                Contact Support
              </Link>
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="w-full py-2 font-inter text-[13px] text-[#6f6f6f] hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
