import Link from 'next/link'
import { NavbarClient } from '@/components/layout/NavbarClient'

const serviceCards = [
  {
    title: 'Graphic Design',
    subtitle: 'Posts, banners, thumbnails',
    bgColor: 'bg-[#E865AA]',
    hoverBorder: 'hover:border-[#E865AA]',
    href: '/order?service=graphic_design',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L11 18l7-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: 'PPT Design',
    subtitle: 'Decks, slides, templates',
    bgColor: 'bg-[#D97706]',
    hoverBorder: 'hover:border-[#D97706]',
    href: '/services/ppt',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h20v14H2z" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 8h5a2 2 0 0 1 0 4H7V8z" />
      </svg>
    ),
  },
  {
    title: 'Video Editing',
    subtitle: 'Reels, shorts, promos',
    bgColor: 'bg-[#10B981]',
    hoverBorder: 'hover:border-[#10B981]',
    href: '/services/video-editing',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Branding',
    subtitle: 'Logo, kit, identity',
    bgColor: 'bg-[#D9383A]',
    hoverBorder: 'hover:border-[#D9383A]',
    href: '/services/branding',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <path d="M14 10h4" />
        <path d="M14 14h3" />
      </svg>
    ),
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* ── Top Back Navigation Bar ── */}
      <header className="bg-white border-b border-[#EDEDED] py-3.5 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-inter text-[14px] font-medium text-[#49454f] hover:text-[#2952E1] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* ── Main Choose Your Need Content ── */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col justify-center">
        {/* Header Title & Subtitle */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-[32px] sm:text-[40px] text-[#111827] font-normal tracking-[-0.01em]">
            Choose Your Need
          </h1>
          <p className="font-inter text-[15px] sm:text-[16px] text-[#6f6f6f] mt-2">
            Pick one, we&apos;ll guide you next.
          </p>
        </div>

        {/* Big White Card Container holding 4 Service Cards */}
        <div className="bg-white rounded-[20px] border border-[#EDEDED] p-6 sm:p-10 shadow-xs max-w-[1100px] w-full mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
            {serviceCards.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className={`group rounded-[16px] border border-[#EDEDED] bg-white p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all ${service.hoverBorder} hover:shadow-md hover:-translate-y-1`}
              >
                <div
                  className={`w-14 h-14 rounded-full ${service.bgColor} text-white flex items-center justify-center mb-4 transition-transform group-hover:scale-105 shadow-xs`}
                >
                  {service.icon}
                </div>
                <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#111827] group-hover:text-[#2952E1] transition-colors">
                  {service.title}
                </h3>
                <p className="font-inter text-[13px] text-[#6f6f6f] mt-1.5 leading-normal">
                  {service.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Blue Info Callout Box */}
        <div className="rounded-[16px] border border-[#DBEAFE] bg-[#F0F6FF] p-5 sm:p-6 flex items-start gap-4 max-w-[1100px] w-full mx-auto mt-6 shadow-xs">
          <div className="w-9 h-9 rounded-full bg-[#3B82F6]/15 text-[#2563EB] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div>
            <h4 className="font-inter text-[15px] font-semibold text-[#1E3A8A]">
              No perfect brief needed
            </h4>
            <p className="font-inter text-[13px] sm:text-[14px] text-[#3B82F6] leading-relaxed mt-0.5">
              Explain like you would to a friend. Our team will help refine your ideas and bring them to life. We&apos;re here to make the process easy and friendly!
            </p>
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
