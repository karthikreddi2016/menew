'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ALL_ITEMS = [
  'Logo',
  'Business Card',
  'Color Guideline',
  'Typography',
  'Social Templates',
  'Packaging',
  'Brand Guidelines',
  'Pitch Deck Theme',
  'Motion Graphic',
]

export default function CustomBrandingPackagePage() {
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'Logo',
    'Business Card',
    'Color Guideline',
    'Typography',
  ])

  const availableItems = ALL_ITEMS.filter((item) => !selectedItems.includes(item))

  function addItem(item: string) {
    setSelectedItems((prev) => [...prev, item])
  }

  function removeItem(item: string) {
    setSelectedItems((prev) => prev.filter((i) => i !== item))
  }

  function handleBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/services/branding')
    }
  }

  function handleNext() {
    if (selectedItems.length < 3) return
    const itemsParam = encodeURIComponent(selectedItems.join(', '))
    router.push(`/order?service=branding_kit&type=Custom%20Kit&items=${itemsParam}`)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* ── Top Back Navigation Bar ── */}
      <header className="bg-white border-b border-[#EDEDED] py-3.5 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center justify-start">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 font-inter text-[14px] font-medium text-[#49454f] hover:text-[#2952E1] transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back</span>
          </button>
        </div>
      </header>

      {/* ── Main Build your Custom Branding package Content ── */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col justify-center">
        {/* Header Title & Subtitle */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-[32px] sm:text-[40px] text-[#111827] font-normal tracking-[-0.01em]">
            Build your Custom Branding package
          </h1>
          <p className="font-inter text-[15px] sm:text-[16px] text-[#6f6f6f] mt-2">
            Choose all that you need.
          </p>
        </div>

        {/* White Container holding Selected Chips Box */}
        <div className="max-w-[720px] w-full mx-auto space-y-6">
          <div className="bg-white rounded-[20px] border border-[#EDEDED] p-6 sm:p-8 shadow-xs min-h-[160px] flex flex-col justify-between">
            {/* Selected Chips */}
            <div className="flex flex-wrap gap-2.5 items-center">
              {selectedItems.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 bg-[#18181B] text-white rounded-lg px-3.5 py-2 font-inter text-[13px] font-medium shadow-2xs"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(item)}
                    className="hover:text-red-400 transition-colors focus:outline-none"
                    aria-label={`Remove ${item}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}

              {selectedItems.length === 0 && (
                <span className="font-inter text-[14px] text-[#9CA3AF] italic">
                  Select items below to add to your custom package
                </span>
              )}
            </div>

            {/* Bottom note inside container */}
            <div className="mt-6 pt-3">
              <span className={`font-inter text-[12px] font-medium ${selectedItems.length < 3 ? 'text-amber-600 font-semibold' : 'text-[#6F6F6F]'}`}>
                Min 3 Items {selectedItems.length < 3 ? `(${3 - selectedItems.length} more needed)` : ''}
              </span>
            </div>
          </div>

          {/* Addable Light Blue Pills Below */}
          <div className="flex flex-wrap gap-2.5 items-center justify-start">
            {availableItems.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => addItem(item)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#EAEFFF] text-[#2952E1] hover:bg-[#D9E3FF] px-4 py-2.5 font-inter text-[13px] font-medium transition-all"
              >
                <span>{item}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            ))}
          </div>

          {/* Next Button aligned to bottom right */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={selectedItems.length < 3}
              className="rounded-full bg-[#2952E1] text-white px-10 py-3 font-inter font-medium text-[15px] shadow-sm hover:bg-[#1e42c7] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
