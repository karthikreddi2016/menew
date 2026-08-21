'use client'

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";

const contactCards = [
  {
    title: "Product support.",
    subtitle: "Get help from an expert.",
    cta: "Start Chat",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#191919]">
        <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
        <path d="M2 14a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3z" fill="currentColor" fillOpacity="0.08" />
        <path d="M17 14a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3z" fill="currentColor" fillOpacity="0.08" />
        <circle cx="9" cy="13" r="1.2" fill="currentColor" />
        <circle cx="15" cy="13" r="1.2" fill="currentColor" />
        <path d="M10 16.5c1 .5 3 .5 4 0" />
      </svg>
    ),
    action: "https://wa.me/919999999999?text=Hi%20Menew%20Team%2C%20I%20need%20product%20support",
  },
  {
    title: "Billing support",
    subtitle: "Fix account or billing issues.",
    cta: "Start Chat",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#191919]">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    action: "https://wa.me/919999999999?text=Hi%20Menew%20Team%2C%20I%20have%20a%20billing%20question",
  },
  {
    title: "Emergency support",
    subtitle: "Urgent help when your site's down.",
    cta: "Start Chat",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#191919]">
        <path d="M12 2v20" />
        <path d="M2 12h20" />
        <path d="M4.93 4.93l14.14 14.14" />
        <path d="M19.07 4.93L4.93 19.07" />
      </svg>
    ),
    action: "https://wa.me/919999999999?text=Hi%20Menew%20Team%2C%20I%20need%20urgent%20emergency%20support",
  },
  {
    title: "Talk to sales.",
    subtitle: "Work with us on enterprise solutions.",
    cta: "Talk To Sales",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#191919]">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="18" cy="8" r="1.5" fill="currentColor" />
      </svg>
    ),
    action: "https://wa.me/919999999999?text=Hi%20Menew%20Sales%20Team%2C%20I%20would%20like%20to%20discuss%20enterprise%20solutions",
  },
];

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* ── Top Navigation Bar: Max 1340px ── */}
      <header className="border-b border-[#EDEDED] py-4 bg-white sticky top-0 z-40">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 xl:px-10 flex items-center justify-between">
          <Link href="/" className="inline-block shrink-0">
            <div className="h-[39px] w-[150px] overflow-hidden relative" aria-label="Menew">
              <div
                style={{
                  position: "absolute",
                  width: "167.91px",
                  height: "165.83px",
                  left: "-8.955px",
                  top: "-63.414px",
                  backgroundImage: "url('/images/logo.png')",
                  backgroundSize: "100% 100%",
                }}
              />
            </div>
          </Link>

          {/* Right Hamburger / Menu button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white flex items-center justify-center shadow-sm transition-transform active:scale-95"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dropdown Menu for Nav Links */}
        {mobileMenuOpen && (
          <div className="absolute top-full right-4 sm:right-8 xl:right-10 mt-2 w-56 rounded-[16px] bg-white p-3 shadow-xl border border-[#E5E7EB] z-50 animate-in fade-in zoom-in-95 duration-150">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-[8px] font-inter text-[14px] text-[#191919] hover:bg-[#F3F4F6] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-[8px] font-inter text-[14px] text-[#191919] hover:bg-[#F3F4F6] transition-colors"
            >
              Services & Pricing
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-[8px] font-inter text-[14px] text-[#191919] hover:bg-[#F3F4F6] transition-colors"
            >
              My Orders & Cart
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-[8px] font-inter text-[14px] text-[#191919] hover:bg-[#F3F4F6] transition-colors"
            >
              Dashboard
            </Link>
          </div>
        )}
      </header>

      {/* ── Contact Main Content: Max 1340px ── */}
      <main className="flex-1 w-full max-w-[1340px] mx-auto px-4 sm:px-8 xl:px-10 py-10 sm:py-16">
        {/* Heading */}
        <div className="mb-8 sm:mb-12">
          <h1 className="font-serif text-[38px] sm:text-[44px] font-normal text-[#191919] tracking-[-0.02em]">
            Contact
          </h1>
          <p className="font-inter text-[16px] sm:text-[17px] text-[#545454] mt-2">
            Get help from support, sales, or experts.
          </p>
        </div>

        {/* 2×2 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[16px] border border-[#E5E7EB] bg-white p-7 sm:p-9 lg:p-10 flex flex-col justify-between gap-8 shadow-2xs hover:border-[#2952E1]/40 hover:shadow-md transition-all"
            >
              {/* Card Header & Icon */}
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-serif text-[22px] sm:text-[24px] font-normal text-[#191919] tracking-[-0.25px]">
                    {card.title}
                  </h3>
                  <p className="font-inter text-[15px] sm:text-[16px] text-[#545454] mt-1.5 leading-snug">
                    {card.subtitle}
                  </p>
                </div>
                <div className="shrink-0 p-1">
                  {card.icon}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <a
                  href={card.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white px-8 py-3.5 font-inter font-medium text-[15px] shadow-[0_4px_14px_0_rgba(41,82,225,0.3)] active:scale-95 transition-all"
                >
                  <span>{card.cta}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Footer with Max 1300px and 70px desktop margin ── */}
      <Footer />
    </div>
  );
}
