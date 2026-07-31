'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const pptOptions = [
  'Pitch Deck',
  'Sales Deck',
  'Business Presentation',
  'Webinar Slides',
  'Academic PPT',
  'Portfolio',
  'Product Deck',
  'Other',
]

export default function PPTChoosePage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState('Pitch Deck')

  function handleNext() {
    if (!selectedOption) return
    const slug = encodeURIComponent(selectedOption)
    router.push(`/services/ppt/inspiration?type=${slug}`)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* ── Top Back Navigation Bar ── */}
      <header className="bg-white border-b border-[#EDEDED] py-3.5 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center justify-start">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-inter text-[14px] font-medium text-[#49454f] hover:text-[#2952E1] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Services</span>
          </Link>
        </div>
      </header>

      {/* ── Main Choose Your PPT Type Content ── */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col justify-center">
        {/* Header Title & Subtitle */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-[32px] sm:text-[40px] text-[#111827] font-normal tracking-[-0.01em]">
            Choose Your PPT Type
          </h1>
          <p className="font-inter text-[15px] sm:text-[16px] text-[#6f6f6f] mt-2">
            Pick one, we&apos;ll guide you next.
          </p>
        </div>

        {/* White Card Container holding 8 PPT Options */}
        <div className="bg-white rounded-[20px] border border-[#EDEDED] p-6 sm:p-10 shadow-xs max-w-[960px] w-full mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {pptOptions.map((opt) => {
              const isSelected = selectedOption === opt
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setSelectedOption(opt)}
                  className={`rounded-[12px] py-4 px-4 font-inter text-[14px] sm:text-[15px] font-medium text-center transition-all ${
                    isSelected
                      ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                      : 'border border-[#EDEDED] bg-white text-[#111827] hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Next Button aligned to bottom right */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-[#2952E1] text-white px-10 py-3 font-inter font-medium text-[15px] shadow-sm hover:bg-[#1e42c7] active:scale-95 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EDEDED] py-6 px-4 text-center">
        <p className="font-inter text-[13px] text-[#6f6f6f]">
          Copyright &copy; 2026-2027 Menew Company All rights reserved.
        </p>
      </footer>
    </div>
  )
}
