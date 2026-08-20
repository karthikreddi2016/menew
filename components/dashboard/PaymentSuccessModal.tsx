'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export function PaymentSuccessModal() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (searchParams.get('payment_success') === 'true') {
      setIsOpen(true)
    }
  }, [searchParams])

  function handleClose() {
    setIsOpen(false)
    // Remove query param from URL without page reload
    router.replace('/dashboard')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-[24px] bg-white p-7 sm:p-9 shadow-2xl text-center border border-[#EDEDED] flex flex-col items-center animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Party Popper / Confetti Celebration Icon */}
        <div className="mb-4 text-4xl select-none flex items-center justify-center w-16 h-16 rounded-full bg-[#F3F6FF]">
          🎉
        </div>

        {/* Title */}
        <h2 className="font-serif text-[24px] sm:text-[26px] font-normal text-[#191919] tracking-[-0.25px]">
          Payment Success
        </h2>

        {/* Subtitle / Body */}
        <p className="font-inter text-[14px] leading-relaxed text-[#545454] mt-2 mb-6 max-w-[280px] sm:max-w-[300px]">
          We&apos;ve got your payment! One of our team members will reach out to you shortly.
        </p>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleClose}
          className="w-full rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white font-inter font-medium text-[15px] py-3.5 shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] active:scale-95 transition-all"
        >
          Continue to Dashboard
        </button>

        {/* Support Link */}
        <p className="font-inter text-[13px] text-[#6f6f6f] mt-4">
          Having trouble?{' '}
          <Link
            href="/contact"
            onClick={handleClose}
            className="text-[#2952E1] font-medium hover:underline"
          >
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}
