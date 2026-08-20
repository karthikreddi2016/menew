'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PaymentPendingPage() {
  const router = useRouter()

  function handleOpenEmail() {
    window.open('https://mail.google.com', '_blank')
  }

  function handleContinueToDashboard() {
    router.push('/dashboard?payment_success=true')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* ── Top Back Navigation Bar ── */}
      <header className="bg-white border-b border-[#EDEDED] py-3.5 px-4 sm:px-8">
        <div className="max-w-[500px] mx-auto flex items-center justify-start">
          <Link
            href="/order/summary"
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

      {/* ── Main Content ── */}
      <main className="flex-1 max-w-[500px] w-full mx-auto px-4 py-8 flex flex-col justify-center">
        {/* Top Pink Security Banner */}
        <div className="rounded-[12px] bg-[#FFF1F5] border border-[#FBCFE8] p-4 text-[#BE185D] flex items-start gap-3 mb-8">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-[#DB2777] mt-0.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <p className="font-inter text-[13px] leading-snug">
            <strong className="font-semibold">Secure Payment:</strong> Payments are handled via a secure payment link. Your financial information is protected and never stored by us.
          </p>
        </div>

        {/* Center Card */}
        <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-8 sm:p-10 shadow-xs text-center flex flex-col items-center">
          {/* Big Green Check Circle */}
          <div className="w-16 h-16 rounded-full bg-[#00C288] text-white flex items-center justify-center shadow-md mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="font-serif text-[28px] sm:text-[32px] text-[#191919] font-normal tracking-[-0.25px]">
            Almost there!
          </h1>

          {/* Description */}
          <p className="font-inter text-[14px] sm:text-[15px] text-black/70 max-w-[340px] mt-2 mb-8 leading-relaxed">
            We&apos;ve sent a payment link to your email. Once paid, your designer will start working.
          </p>

          {/* Open Email Primary Button */}
          <button
            type="button"
            onClick={handleOpenEmail}
            className="w-full rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white font-inter font-medium text-[15px] py-3.5 flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] active:scale-95 transition-all mb-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Open Email</span>
          </button>

          {/* Continue to Dashboard Secondary Button */}
          <button
            type="button"
            onClick={handleContinueToDashboard}
            className="w-full rounded-full bg-[#E8EFFF] hover:bg-[#d5e2ff] text-[#2952E1] font-inter font-medium text-[15px] py-3.5 flex items-center justify-center active:scale-95 transition-all"
          >
            <span>Continue to Dashboard</span>
          </button>
        </div>

        {/* Having Trouble Link */}
        <p className="font-inter text-[14px] text-[#6f6f6f] mt-8 text-center">
          Having trouble?{' '}
          <Link href="/contact" className="text-[#2952E1] font-medium hover:underline">
            Contact support
          </Link>
        </p>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#9CA3AF] font-inter">
        Menew Pilot Mode &bull; Fast, on-demand creative delivery
      </footer>
    </div>
  )
}
