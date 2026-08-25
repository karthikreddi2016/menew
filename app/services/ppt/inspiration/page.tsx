'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

const pptInspirationItems = [
  { id: 1, title: 'PPT Inspiration 1', image: '/images/inspiration_sample_art.png' },
  { id: 2, title: 'PPT Inspiration 2', image: '/images/inspiration_sample_art.png' },
  { id: 3, title: 'PPT Inspiration 3', image: '/images/inspiration_sample_art.png' },
  { id: 4, title: 'PPT Inspiration 4', image: '/images/inspiration_sample_art.png' },
  { id: 5, title: 'PPT Inspiration 5', image: '/images/inspiration_sample_art.png' },
  { id: 6, title: 'PPT Inspiration 6', image: '/images/inspiration_sample_art.png' },
  { id: 7, title: 'PPT Inspiration 7', image: '/images/inspiration_sample_art.png' },
  { id: 8, title: 'PPT Inspiration 8', image: '/images/inspiration_sample_art.png' },
]

function PPTInspirationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedType = searchParams.get('type') || ''
  const [selectedId, setSelectedId] = useState<number | null>(null)

  function handleBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/services/ppt')
    }
  }

  function handleNext() {
    const refParam = selectedId ? `&refId=${selectedId}` : ''
    const typeParam = selectedType ? `&type=${encodeURIComponent(selectedType)}` : ''
    router.push(`/order?service=ppt_design${typeParam}${refParam}`)
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

      {/* ── Main Design Inspiration Content ── */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 py-10 sm:py-14 flex flex-col justify-center">
        {/* Header Title & Subtitle matching Figma */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] text-[#111827] font-normal tracking-[-0.25px]">
            Design Inspiration that you are feel best fit.
          </h1>
          <p className="font-inter text-[14px] sm:text-[15px] text-[#6f6f6f] mt-2 tracking-[-0.2px]">
            Pick one, we&apos;ll guide you next.
          </p>
        </div>

        {/* White Card Container holding 8 PPT Reference Cards */}
        <div className="bg-white rounded-[20px] border border-[#EDEDED] p-6 sm:p-10 shadow-xs max-w-[1000px] w-full mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {pptInspirationItems.map((item) => {
              const isSelected = selectedId === item.id
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(isSelected ? null : item.id)}
                  className={`group relative aspect-square rounded-[16px] overflow-hidden cursor-pointer border-2 transition-all ${
                    isSelected
                      ? 'border-[#2952E1] ring-4 ring-[#2952E1]/20 shadow-md scale-[1.02]'
                      : 'border-transparent hover:border-[#2952E1]/50 hover:shadow-sm'
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-[14px]"
                  />

                  {/* Selected checkmark indicator on top right */}
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#2952E1] text-white shadow-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Next Button aligned to bottom right */}
          <div className="mt-8 flex items-center justify-between">
            <p className="font-inter text-xs text-[#6f6f6f]">
              {selectedId ? '1 reference selected (Optional)' : 'Selecting reference is optional'}
            </p>

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

export default function PPTInspirationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-inter text-black/40">Loading…</div>}>
      <PPTInspirationContent />
    </Suspense>
  )
}
