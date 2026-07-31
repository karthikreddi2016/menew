'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const inspirationItems = [
  { id: 1, title: 'Inspiration 1', image: '/images/video-inspiration.png' },
  { id: 2, title: 'Inspiration 2', image: '/images/video-inspiration.png' },
  { id: 3, title: 'Inspiration 3', image: '/images/video-inspiration.png' },
  { id: 4, title: 'Inspiration 4', image: '/images/video-inspiration.png' },
  { id: 5, title: 'Inspiration 5', image: '/images/video-inspiration.png' },
  { id: 6, title: 'Inspiration 6', image: '/images/video-inspiration.png' },
  { id: 7, title: 'Inspiration 7', image: '/images/video-inspiration.png' },
  { id: 8, title: 'Inspiration 8', image: '/images/video-inspiration.png' },
]

export default function VideoInspirationPage() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  function handleNext() {
    const refParam = selectedId ? `&refId=${selectedId}` : ''
    router.push(`/order?service=video_editing${refParam}`)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* ── Top Back Navigation Bar ── */}
      <header className="bg-white border-b border-[#EDEDED] py-3.5 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center justify-start">
          <Link
            href="/services/video-editing"
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

      {/* ── Main Design Inspiration Content ── */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 py-10 sm:py-14 flex flex-col justify-center">
        {/* Header Title & Subtitle */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-serif text-[30px] sm:text-[38px] text-[#111827] font-normal tracking-[-0.01em]">
            Design Inspiration that you are feel best fit.
          </h1>
          <p className="font-inter text-[14px] sm:text-[15px] text-[#6f6f6f] mt-2">
            Pick one, we&apos;ll guide you next.
          </p>
        </div>

        {/* White Card Container holding 8 Video Reference Cards */}
        <div className="bg-white rounded-[20px] border border-[#EDEDED] p-6 sm:p-10 shadow-xs max-w-[1000px] w-full mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {inspirationItems.map((item) => {
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
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

                  {/* Play Button Icon at Bottom Left */}
                  <div className="absolute bottom-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#111827] shadow-sm transition-transform group-hover:scale-110">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>

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
