'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface BrandingPackage {
  id: string
  title: string
  iconType: 'cup' | 'briefcase' | 'sparkles' | 'plus'
  iconColor: string
  bullets?: string[]
  description?: string
}

const packages: BrandingPackage[] = [
  {
    id: 'starter',
    title: 'Starter Kit',
    iconType: 'cup',
    iconColor: 'text-[#2952E1]',
    bullets: ['Logo', 'Color Palette', 'Typography'],
  },
  {
    id: 'business',
    title: 'Business Kit',
    iconType: 'briefcase',
    iconColor: 'text-[#E865AA]',
    bullets: ['Logo', 'Brand colors', 'Social templates', 'Business card'],
  },
  {
    id: 'premium',
    title: 'Premium Branding Kit',
    iconType: 'sparkles',
    iconColor: 'text-[#D97706]',
    bullets: ['Logo', 'Brand guide', 'Social templates', 'Packaging', 'Business card'],
  },
  {
    id: 'custom',
    title: 'Custom Kit',
    iconType: 'plus',
    iconColor: 'text-[#D9383A]',
    description: 'Choose your own Brand design requirements',
  },
]

export default function BrandingChoosePage() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState('starter')

  function handleNext() {
    if (selectedId === 'custom') {
      router.push('/services/branding/custom')
      return
    }
    const pkg = packages.find((p) => p.id === selectedId)
    const titleSlug = encodeURIComponent(pkg?.title || 'Starter Kit')
    router.push(`/order?service=branding_kit&type=${titleSlug}`)
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

      {/* ── Main Choose your branding package Content ── */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col justify-center">
        {/* Header Title & Subtitle */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-[32px] sm:text-[40px] text-[#111827] font-normal tracking-[-0.01em]">
            Choose your branding package
          </h1>
          <p className="font-inter text-[15px] sm:text-[16px] text-[#6f6f6f] mt-2">
            Pick one, we&apos;ll guide you next.
          </p>
        </div>

        {/* White Container holding 4 Package Cards */}
        <div className="bg-white rounded-[20px] border border-[#EDEDED] p-6 sm:p-10 shadow-xs max-w-[1020px] w-full mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
            {packages.map((pkg) => {
              const isSelected = selectedId === pkg.id
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedId(pkg.id)}
                  className={`rounded-[16px] p-6 text-left cursor-pointer transition-all flex flex-col justify-between min-h-[220px] border ${
                    isSelected
                      ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 shadow-xs scale-[1.01]'
                      : 'border-[#EDEDED] bg-white hover:border-gray-300 hover:shadow-xs'
                  }`}
                >
                  <div>
                    {/* Icon Header */}
                    <div className={`mb-3 ${pkg.iconColor}`}>
                      {pkg.iconType === 'cup' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                          <line x1="6" y1="2" x2="6" y2="4" />
                          <line x1="10" y1="2" x2="10" y2="4" />
                          <line x1="14" y1="2" x2="14" y2="4" />
                        </svg>
                      )}
                      {pkg.iconType === 'briefcase' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                      )}
                      {pkg.iconType === 'sparkles' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        </svg>
                      )}
                      {pkg.iconType === 'plus' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-inter font-bold text-[16px] text-[#111827] mb-2">
                      {pkg.title}
                    </h3>

                    {/* Bullets or Description */}
                    {pkg.bullets && (
                      <ul className="font-inter text-[13px] text-[#6f6f6f] space-y-1.5 leading-tight">
                        {pkg.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#9CA3AF]">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {pkg.description && (
                      <p className="font-inter text-[13px] text-[#6f6f6f] leading-snug">
                        {pkg.description}
                      </p>
                    )}
                  </div>
                </div>
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
