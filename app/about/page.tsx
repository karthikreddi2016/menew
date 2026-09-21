import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Menew | Creative Work, On Demand",
  description:
    "Menew is an on-demand creative production platform built for businesses, founders, marketers, and creators who need high-quality creative work without the usual back-and-forth.",
};

const PILLARS = [
  {
    title: "Simple Ordering",
    description: "Choose what you need, share your brief, and place an order in minutes.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: "Clear Pricing",
    description: "Predictable, upfront pricing with zero hidden costs or negotiation battles.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Defined Delivery Timelines",
    description: "Realistic, guaranteed turnaround times so you never miss a campaign deadline.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Streamlined Production Process",
    description: "Vetted creatives, standardized workflows, and AI-assisted speed.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* ── Top Navigation with Announcement Bar ── */}
      <Navbar />

      {/* ── Main About Content ── */}
      <main className="flex-1 w-full">
        {/* ── Section 1: Hero & Introduction ── */}
        <section className="pt-14 pb-16 sm:pt-20 sm:pb-24 max-w-[1340px] mx-auto px-4 sm:px-8 xl:px-10">
          <div className="max-w-[880px]">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAEFFF] text-[#2952E1] font-inter text-[13px] font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2952E1]" />
              About Menew
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[40px] sm:text-[54px] lg:text-[62px] font-normal text-[#191919] leading-[1.12] tracking-[-0.025em]">
              Creative work, <span className="text-[#2952E1] italic">on demand.</span>
            </h1>

            {/* Body Copy */}
            <div className="mt-8 sm:mt-10 space-y-6 text-[#444444] font-inter text-[17px] sm:text-[19px] leading-[30px] sm:leading-[34px] tracking-[-0.2px]">
              <p>
                Menew is an on-demand creative production platform built for businesses,
                founders, marketers, and creators who need high-quality creative work without
                the usual back-and-forth of hiring freelancers or managing multiple agencies.
              </p>
              <p>
                From social media posts and reels to banners, branding, motion graphics, and
                marketing assets, you simply choose what you need, share your brief, and place an order.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 2: Core Value Callout Banner ── */}
        <section className="border-y border-[#EDEDED] bg-[#FBFBFB] py-14 sm:py-20">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 xl:px-10">
            <div className="max-w-[880px]">
              <div className="inline-flex items-center gap-2 text-[#2952E1] font-inter text-[14px] font-semibold uppercase tracking-wider mb-3">
                <span>✦</span>
                <span>The Menew Advantage</span>
              </div>
              <h2 className="font-serif text-[30px] sm:text-[38px] lg:text-[44px] font-normal text-[#191919] leading-[1.2] tracking-[-0.02em]">
                No hiring. No negotiations. No endless follow-ups.
              </h2>
              <p className="mt-5 text-[#545454] font-inter text-[16px] sm:text-[18px] leading-[28px] sm:leading-[32px] tracking-[-0.2px]">
                We combine a vetted creative network, standardized workflows, technology, and
                AI-assisted processes to make creative production faster and more predictable.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 3: Built for the way modern teams work ── */}
        <section className="py-16 sm:py-24 max-w-[1340px] mx-auto px-4 sm:px-8 xl:px-10">
          <div className="max-w-[880px] mb-12 sm:mb-16">
            <h2 className="font-serif text-[32px] sm:text-[42px] font-normal text-[#191919] leading-[1.18] tracking-[-0.02em]">
              Built for the way modern teams work
            </h2>
            <p className="mt-5 text-[#545454] font-inter text-[16px] sm:text-[18px] leading-[28px] sm:leading-[32px] tracking-[-0.2px]">
              Creative demand doesn&apos;t always arrive weeks in advance. Sometimes you need a
              campaign asset today, a reel tomorrow, or a new design before your next launch.
            </p>
            <p className="mt-4 text-[#191919] font-inter font-medium text-[16px] sm:text-[18px] leading-[28px] sm:leading-[32px] tracking-[-0.2px]">
              Menew is designed around that reality:{" "}
              <span className="text-[#2952E1] font-semibold">
                simple ordering, clear pricing, defined delivery timelines, and a streamlined production process.
              </span>
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[20px] border border-[#E5E7EB] bg-white p-7 flex flex-col justify-between gap-6 shadow-2xs hover:border-[#2952E1]/40 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-[12px] bg-[#EAEFFF] text-[#2952E1] flex items-center justify-center transition-colors group-hover:bg-[#2952E1] group-hover:text-white">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-inter text-[18px] font-semibold text-[#191919] tracking-[-0.2px]">
                    {pillar.title}
                  </h3>
                  <p className="font-inter text-[14px] text-[#545454] leading-[22px] mt-2">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Our Mission & Tagline ── */}
        <section className="bg-[#F8FAFC] border-t border-[#EDEDED] py-16 sm:py-24">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 xl:px-10">
            <div className="rounded-[28px] bg-white border border-[#E5E7EB] p-8 sm:p-14 lg:p-16 shadow-xs max-w-[960px] mx-auto text-center flex flex-col items-center">
              <span className="text-[#2952E1] font-inter text-[13px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#EAEFFF] mb-6">
                Our Mission
              </span>

              <h2 className="font-serif text-[30px] sm:text-[40px] lg:text-[46px] font-normal text-[#191919] leading-[1.22] tracking-[-0.025em] max-w-[760px]">
                To make professional creative production as simple as ordering a service online.
              </h2>

              <div className="my-8 w-16 h-[2px] bg-[#2952E1]/30 rounded-full" />

              <div className="space-y-1.5">
                <p className="font-inter text-[20px] sm:text-[24px] font-semibold text-[#191919] tracking-tight">
                  You bring the idea.
                </p>
                <p className="font-inter text-[20px] sm:text-[24px] font-semibold text-[#2952E1] tracking-tight">
                  We make it happen.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-9 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/order"
                  className="rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white px-8 py-3.5 font-inter font-medium text-[15px] shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] transition-all active:scale-95"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/services"
                  className="rounded-full bg-[#EAEFFF] hover:bg-[#d8e3ff] text-[#2952E1] px-8 py-3.5 font-inter font-medium text-[15px] transition-all"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
