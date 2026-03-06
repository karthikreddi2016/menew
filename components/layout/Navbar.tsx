"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#dadada]">
      <div className="flex items-center justify-between px-[70px] py-[16px] max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <div
            className="h-[39px] w-[150px] overflow-hidden relative"
            aria-label="Menew"
          >
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

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <button className="font-inter text-[16px] leading-[1.5] tracking-[-0.25px] text-black hover:text-black/70 transition-colors">
            Services
          </button>

          <div className="flex items-center gap-1">
            <span className="font-inter text-[16px] leading-[1.5] tracking-[-0.25px] text-black">
              For Enterprise
            </span>
            <span className="bg-[#e865aa] text-[#fff1f8] text-[10px] font-inter rounded-[2px] px-1 py-0.5 leading-none">
              Upcoming
            </span>
          </div>

          <Link
            href="#contact"
            className="font-inter text-[16px] leading-[1.5] tracking-[-0.25px] text-black hover:text-black/70 transition-colors"
          >
            Contact
          </Link>

          <Link
            href="#join"
            className="font-inter text-[16px] leading-[1.5] tracking-[-0.25px] text-black hover:text-black/70 transition-colors"
          >
            Join the Team
          </Link>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-5">
          <Link
            href="#login"
            className="bg-[#e7ecff] text-[#2952e1] font-inter font-medium text-[16px] tracking-[-0.25px] leading-[1.5] px-8 py-4 rounded-full hover:bg-[#d4dcff] transition-colors whitespace-nowrap"
          >
            Login
          </Link>
          <Link
            href="#get-started"
            className="bg-[#2952e1] text-white font-inter font-medium text-[16px] tracking-[-0.25px] leading-[1.5] px-8 py-4 rounded-full hover:bg-[#1e42c7] transition-colors whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
