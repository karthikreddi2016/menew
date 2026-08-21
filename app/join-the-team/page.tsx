'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'

const showcaseImages = [
  { id: 1, src: '/images/inspiration_sample_art.png', alt: 'Creative Work 1' },
  { id: 2, src: '/images/inspiration_sample_art.png', alt: 'Creative Work 2' },
  { id: 3, src: '/images/inspiration_sample_art.png', alt: 'Creative Work 3' },
  { id: 4, src: '/images/inspiration_sample_art.png', alt: 'Creative Work 4' },
]

interface JobPosition {
  id: string
  title: string
  team: string
  location: string
  type: string
  icon: React.ReactNode
}

const jobPositions: JobPosition[] = [
  {
    id: 'prod-designer-1',
    title: 'Product Designer',
    team: 'Product Team',
    location: 'Remote',
    type: 'Full-time',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#191919]">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: 'prod-designer-2',
    title: 'Product Designer',
    team: 'Product Team',
    location: 'Remote',
    type: 'Full-time',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#191919]">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: 'mktg-designer-1',
    title: 'Marketing Designer',
    team: 'Marketing Team',
    location: 'Remote',
    type: 'Full-time',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#191919]">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.992 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 'mktg-designer-2',
    title: 'Marketing Designer',
    team: 'Marketing Team',
    location: 'Remote',
    type: 'Full-time',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#191919]">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.992 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
]

export default function JoinTheTeamPage() {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null)
  const [appliedSuccess, setAppliedSuccess] = useState(false)
  const [applicantName, setApplicantName] = useState('')
  const [applicantEmail, setApplicantEmail] = useState('')
  const [portfolioLink, setPortfolioLink] = useState('')

  function handleApplySubmit(e: React.FormEvent) {
    e.preventDefault()
    setAppliedSuccess(true)
    setTimeout(() => {
      setSelectedJob(null)
      setAppliedSuccess(false)
      setApplicantName('')
      setApplicantEmail('')
      setPortfolioLink('')
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* ── Top Navbar matching Figma Header ── */}
      <header className="border-b border-[#EDEDED] py-3.5 bg-white sticky top-0 z-40">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 xl:px-10 flex items-center justify-between">
          {/* Logo */}
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

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/services"
              className="font-inter text-[15px] text-[#191919] hover:text-[#2952E1] transition-colors"
            >
              Services
            </Link>

            <div className="flex items-center gap-1.5">
              <span className="font-inter text-[15px] text-[#191919]">
                For Enterprise
              </span>
              <span className="bg-[#E865AA] text-white text-[10px] font-inter font-semibold rounded-[3px] px-1.5 py-0.5 leading-none">
                Upcoming
              </span>
            </div>

            <Link
              href="/contact"
              className="font-inter text-[15px] text-[#191919] hover:text-[#2952E1] transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/join-the-team"
              className="font-inter text-[15px] font-medium text-[#2952E1] transition-colors"
            >
              Join the Team
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full bg-[#E8EFFF] text-[#2952E1] font-inter font-medium text-[14px] px-6 py-2.5 hover:bg-[#d5e2ff] transition-all"
            >
              Login
            </Link>
            <Link
              href="/order"
              className="rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white font-inter font-medium text-[14px] px-6 py-2.5 shadow-[0_4px_14px_0_rgba(41,82,225,0.3)] transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Join the Team Content ── */}
      <main className="flex-1 w-full pb-20">
        {/* ── Section 1: Hero Section ── */}
        <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 text-center max-w-[1340px] mx-auto px-4 sm:px-8 xl:px-10">
          <h1 className="font-serif text-[40px] sm:text-[50px] md:text-[56px] text-[#191919] font-normal tracking-[-0.02em] leading-[1.12] max-w-[760px] mx-auto">
            Build Value, with the<br />help of your skills
          </h1>

          <p className="font-inter text-[15px] sm:text-[16px] text-[#545454] max-w-[480px] mx-auto mt-4 mb-8 leading-relaxed">
            We&apos;re on a mission to build the best design on demand team and create values to the future.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/about"
              className="font-inter font-medium text-[15px] text-[#2952E1] hover:underline px-4 py-2.5"
            >
              About Us
            </Link>
            <a
              href="#open-positions"
              className="inline-flex items-center justify-center rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white px-7 py-3 font-inter font-medium text-[15px] shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] transition-all active:scale-95"
            >
              See Open Positions
            </a>
          </div>
        </section>

        {/* ── Section 2: Horizontal 3D Artwork Showcase (Screenshot 1) ── */}
        <section className="py-6 overflow-hidden max-w-[1340px] mx-auto px-4 sm:px-8 xl:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseImages.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="relative h-[240px] sm:h-[280px] md:h-[300px] rounded-[20px] overflow-hidden group shadow-sm bg-[#001E1D]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />

                {/* Floating Play Button in Bottom Left matching Screenshot 1 */}
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#191919] shadow-md transition-transform group-hover:scale-110">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: "Join Our Team" Open Positions (Screenshot 2) ── */}
        <section id="open-positions" className="pt-16 sm:pt-20 max-w-[1340px] mx-auto px-4 sm:px-8 xl:px-10">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10">
            <h2 className="font-serif text-[32px] sm:text-[36px] font-normal text-[#191919] tracking-[-0.25px]">
              Join Our Team
            </h2>
            <p className="font-inter text-[15px] text-[#545454] mt-1">
              Be the part of something creative
            </p>
          </div>

          {/* 2×2 Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobPositions.map((job) => (
              <div
                key={job.id}
                className="rounded-[16px] border border-[#E5E7EB] bg-white p-7 sm:p-8 flex flex-col justify-between min-h-[220px] shadow-2xs hover:border-[#2952E1]/40 hover:shadow-md transition-all"
              >
                {/* Header & Icon */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-[22px] font-normal text-[#191919] tracking-[-0.25px]">
                      {job.title}
                    </h3>
                    <p className="font-serif text-[18px] text-[#191919] mt-0.5">
                      {job.team}
                    </p>
                  </div>
                  <div className="shrink-0 p-1 text-[#191919]">
                    {job.icon}
                  </div>
                </div>

                {/* Location & Apply Button */}
                <div className="mt-4">
                  <p className="font-inter text-[13px] text-[#6f6f6f] mb-3">
                    {job.location}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white px-6 py-2.5 font-inter font-medium text-[14px] shadow-[0_4px_12px_0_rgba(41,82,225,0.3)] active:scale-95 transition-all"
                  >
                    <span>Apply</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Application Modal ── */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="w-full max-w-[460px] rounded-[24px] bg-white p-7 sm:p-9 shadow-2xl border border-[#EDEDED] relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {appliedSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#00C288] text-white mx-auto flex items-center justify-center mb-4 shadow-md">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-serif text-[24px] font-normal text-[#191919]">
                  Application Sent!
                </h3>
                <p className="font-inter text-[14px] text-[#545454] mt-2">
                  Thank you for applying for the <strong>{selectedJob.title}</strong> role. Our team will review your portfolio and get back to you shortly!
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-[24px] font-normal text-[#191919] tracking-[-0.25px]">
                  Apply for {selectedJob.title}
                </h3>
                <p className="font-inter text-[13px] text-[#6f6f6f] mt-1 mb-6">
                  {selectedJob.team} &bull; {selectedJob.location} &bull; {selectedJob.type}
                </p>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block font-inter text-[13px] font-medium text-[#191919] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-[10px] border border-[#EDEDED] px-4 py-2.5 font-inter text-[14px] outline-none focus:border-[#2952E1]"
                    />
                  </div>

                  <div>
                    <label className="block font-inter text-[13px] font-medium text-[#191919] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full rounded-[10px] border border-[#EDEDED] px-4 py-2.5 font-inter text-[14px] outline-none focus:border-[#2952E1]"
                    />
                  </div>

                  <div>
                    <label className="block font-inter text-[13px] font-medium text-[#191919] mb-1">
                      Portfolio / Behance / Dribbble Link
                    </label>
                    <input
                      type="url"
                      required
                      value={portfolioLink}
                      onChange={(e) => setPortfolioLink(e.target.value)}
                      placeholder="https://behance.net/yourprofile"
                      className="w-full rounded-[10px] border border-[#EDEDED] px-4 py-2.5 font-inter text-[14px] outline-none focus:border-[#2952E1]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white py-3 font-inter font-medium text-[15px] shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] transition-all"
                  >
                    Submit Application
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Footer matching Figma Screenshot 3 (max-w-[1300px], px-[70px]) ── */}
      <Footer />
    </div>
  )
}
