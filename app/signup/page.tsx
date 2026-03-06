"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AuthLeftPanel />

      {/* ── Right: form panel ── */}
      <div className="flex flex-1 md:flex-none shrink-0 items-center justify-center bg-white px-4 sm:px-[40px] py-10 sm:py-16">
        <div className="flex w-full max-w-[383px] flex-col gap-12">

          {/* Signup / Login toggle */}
          <div className="rounded-[8px] bg-[#e7ecff] p-[4px]">
            <div className="flex gap-2">
              <div className="flex h-12 flex-1 items-center justify-center rounded-[8px] bg-white shadow-[0px_2px_8px_0px_rgba(41,82,225,0.15)]">
                <span className="font-inter font-medium text-[14px] leading-normal tracking-[-0.25px] text-[#2952e1]">
                  Signup
                </span>
              </div>
              <Link
                href="/login"
                className="flex h-12 flex-1 items-center justify-center rounded-[8px]"
              >
                <span className="font-inter font-medium text-[14px] leading-normal tracking-[-0.25px] text-[#11225f]">
                  Login
                </span>
              </Link>
            </div>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-8">
            <FloatingInput label="Enter Your Name" placeholder="First and last name" type="text" autoComplete="name" />
            <FloatingInput label="Enter Your Email" placeholder="user@example.com" type="email" autoComplete="email" />

            {/* Phone row */}
            <div className="flex gap-2 items-stretch">
              {/* Country code */}
              <div className="relative flex w-[90px] shrink-0 items-center rounded-[4px] border border-[#79747e]">
                <span className="pl-4 font-inter text-[16px] text-[#49454f] tracking-[0.5px]">+91</span>
                <button className="flex h-12 w-12 shrink-0 items-center justify-center">
                  <ChevronDown />
                </button>
              </div>
              {/* Phone number */}
              <div className="flex-1">
                <FloatingInput label="Phone Number" placeholder="Enter your phone number" type="tel" autoComplete="tel" />
              </div>
            </div>

            {/* Password */}
            <div className="relative flex h-14 items-center rounded-[4px] border border-[#79747e]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center">
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="h-full flex-1 bg-transparent font-inter text-[16px] text-[#49454f] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="flex h-12 w-12 shrink-0 items-center justify-center"
              >
                <EyeIcon open={showPassword} />
              </button>
              {/* Floating label — offset left to clear the lock icon */}
              <span className="absolute left-[40px] -top-[11px] bg-white px-1 font-inter text-[12px] leading-normal tracking-[-0.25px] text-[#49454f]">
                Create Password
              </span>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setAgreed((v) => !v)}
                className="flex h-6 w-6 shrink-0 items-center justify-center"
              >
                <div
                  className={`flex h-[18px] w-[18px] items-center justify-center rounded-[2px] ${agreed ? "bg-[#2952e1]" : "border-2 border-[#49454f]"
                    }`}
                >
                  {agreed && <CheckIcon />}
                </div>
              </button>
              <p className="font-inter text-[14px] leading-[22px] text-[#161616]">
                I accept all the{" "}
                <Link href="/terms" className="font-medium text-[#2952e1]">
                  terms and conditions
                </Link>
              </p>
            </div>
          </div>

          {/* Register CTA */}
          <button
            type="submit"
            className="w-full rounded-[31px] bg-[#2952e1] py-4 text-center font-inter font-medium text-[16px] leading-normal tracking-[-0.25px] text-white transition-colors hover:bg-[#1e42c7]"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Shared input with floating label ── */
function FloatingInput({
  label,
  placeholder,
  type,
  autoComplete,
}: {
  label: string;
  placeholder: string;
  type: string;
  autoComplete?: string;
}) {
  return (
    <div className="relative flex h-14 items-center rounded-[4px] border border-[#79747e] px-4">
      <input
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-full w-full bg-transparent font-inter text-[16px] text-[#49454f] placeholder:text-[#49454f] outline-none"
      />
      <span className="absolute left-3 -top-[11px] bg-white px-1 font-inter text-[12px] leading-normal tracking-[-0.25px] text-[#49454f]">
        {label}
      </span>
    </div>
  );
}

/* ── Icons ── */
function ChevronDown() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M7 10l5 5 5-5" stroke="#49454f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="#49454f" strokeWidth="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#49454f" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#49454f" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="#49454f" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#49454f" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1" y1="1" x2="23" y2="23" stroke="#49454f" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
