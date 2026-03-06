"use client";

import { useState } from "react";
import Image from "next/image";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-black">

      {/* ── Full-page background ── */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2"
        style={{ aspectRatio: "2880/2388" }}
      >
        <Image
          src="/images/coming-soon-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>

      {/* ── Navbar ── */}
      <header className="relative z-10 flex w-full items-center justify-center border-b border-[#545454] bg-black px-[70px] py-4">
        <div className="relative h-[39px] w-[150px] overflow-hidden">
          <div
            style={{
              position: "absolute",
              width: "167.91px",
              height: "165.83px",
              left: "-8.955px",
              top: "-63.414px",
              backgroundImage: "url('/images/logo.png')",
              backgroundSize: "100% 100%",
              filter: "invert(1)",
            }}
          />
        </div>
      </header>

      {/* ── Hero — fills remaining viewport height ── */}
      <div className="relative z-10 flex w-[790px] max-w-[90vw] flex-1 flex-col items-center justify-center gap-[89px]">

        <div className="flex flex-col items-center gap-8 text-center">

          {/* Badge */}
          <div className="inline-flex items-center rounded-[4px] border border-[#20bf86] px-2 py-1">
            <span className="font-inter font-medium text-[14px] leading-[1.5] tracking-[-0.25px] text-[#75e093]">
              Launching Soon!
            </span>
          </div>

          {/* Headline */}
          <div className="relative">
            <h1 className="font-serif text-[42px] leading-none tracking-[-0.25px] text-white">
              <span className="block">The Era of Hiring Freelancers Ends.</span>
              <span className="block mt-2">
                <span className="relative inline-block text-[#ff8cc9]">
                  Menew
                  <span className="absolute left-0 -bottom-2 w-full">
                    <Image
                      src="/images/coming-soon-underline.svg"
                      alt=""
                      width={132}
                      height={10}
                      className="w-full"
                    />
                  </span>
                </span>
                {" is the new way."}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="max-w-[600px] font-inter font-medium text-[14px] leading-[1.5] tracking-[-0.25px] text-[#c2c2c2]">
            Join our waiting list to gain access to the world&apos;s most practical and
            efficient on-demand content production platform.
          </p>

          {/* Email + CTA */}
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-[367px] items-center rounded-[39px] border border-[#919191] bg-[#161616] px-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full bg-transparent font-inter text-[16px] leading-[1.5] tracking-[-0.25px] text-white placeholder:text-[#919191] outline-none"
              />
            </div>
            <button
              type="button"
              className="whitespace-nowrap rounded-[31px] bg-[#2952e1] px-8 py-4 font-inter font-medium text-[16px] leading-[1.5] tracking-[-0.25px] text-[#eaeefc] transition-colors hover:bg-[#1e42c7]"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Get In Touch */}
        <div className="flex flex-col items-center gap-5">
          <p className="font-inter text-[16px] leading-[1.5] tracking-[-0.25px] text-[#c2c2c2]">
            Get In Touch
          </p>
          <div className="flex items-center gap-5">
            {[
              { href: "https://instagram.com", icon: <InstagramIcon /> },
              { href: "https://facebook.com", icon: <FacebookIcon /> },
              { href: "https://linkedin.com", icon: <LinkedInIcon /> },
              { href: "https://x.com", icon: <XIcon /> },
            ].map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-white opacity-70 transition-opacity hover:opacity-100"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom watermark ── */}
      <div className="relative z-10 h-[215px] w-full overflow-hidden shrink-0">
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 z-10 h-[55%] bg-gradient-to-b from-transparent to-black/75" />
        {/* Large logo letterforms */}
        <div className="absolute inset-0 flex items-center pl-[9%]">
          <div
            className="relative opacity-20"
            style={{ height: "180px", width: "calc(180px * 5.5)" }}
          >
            <Image
              src="/images/logo.png"
              alt=""
              fill
              className="object-contain object-left grayscale brightness-200"
            />
          </div>
        </div>
        {/* Black bottom cap */}
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-black" />
      </div>

    </div>
  );
}

/* ── Social icons ── */
function InstagramIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="5" y="5" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="19.5" cy="8.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M22 4h-4a6 6 0 0 0-6 6v3H8v4h4v9h4v-9h4l1-4h-5v-3a1 1 0 0 1 1-1h4V4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="3" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <line x1="9" y1="12" x2="9" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9" cy="8.5" r="1.2" fill="currentColor" />
      <path d="M13 12v9M13 16a4 4 0 0 1 8 0v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M4 4l8.5 11.5L4 24h3l7-7.8L20 24h4l-9-12.2L23.5 4H21l-6.5 7.2L8 4H4z"
        fill="currentColor"
      />
    </svg>
  );
}
