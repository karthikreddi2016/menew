"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[383px] flex flex-col gap-12 py-16">

        {/* Signup / Login toggle */}
        <div className="bg-[#e7ecff] rounded-[8px] p-[4px]">
          <div className="flex gap-2">
            <div className="flex-1 h-12 flex items-center justify-center rounded-[8px] bg-white shadow-[0px_2px_8px_0px_rgba(41,82,225,0.15)]">
              <span className="font-inter font-medium text-[14px] leading-[1.5] tracking-[-0.25px] text-[#2952e1]">
                Signup
              </span>
            </div>
            <Link
              href="/login"
              className="flex-1 h-12 flex items-center justify-center rounded-[8px]"
            >
              <span className="font-inter font-medium text-[14px] leading-[1.5] tracking-[-0.25px] text-[#11225f]">
                Login
              </span>
            </Link>
          </div>
        </div>

        {/* Input fields */}
        <div className="flex flex-col gap-8">

          {/* Name */}
          <FloatingLabelInput
            label="Enter Your Name"
            placeholder="First and last name"
            type="text"
            autoComplete="name"
          />

          {/* Email */}
          <FloatingLabelInput
            label="Enter Your Email"
            placeholder="user@example.com"
            type="email"
            autoComplete="email"
          />

          {/* Phone */}
          <div className="flex gap-2 items-stretch">
            {/* Country code */}
            <div className="relative border border-[#79747e] rounded-[4px] flex items-center pl-4 pr-1 gap-0 w-[90px] shrink-0">
              <span className="font-inter text-[16px] text-[#49454f] whitespace-nowrap">
                +91
              </span>
              <button className="flex items-center justify-center w-10 h-10 shrink-0">
                <ChevronDownIcon />
              </button>
            </div>

            {/* Phone number */}
            <div className="relative flex-1">
              <FloatingLabelInput
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative border border-[#79747e] rounded-[4px] h-14 flex items-center">
            <div className="flex items-center justify-center w-12 h-12 shrink-0">
              <LockIcon />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className="flex-1 h-full bg-transparent font-inter text-[16px] text-[#49454f] outline-none pr-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="flex items-center justify-center w-12 h-12 shrink-0"
            >
              <EyeIcon open={showPassword} />
            </button>
            <span className="absolute left-10 -top-[11px] bg-white px-1 font-inter text-[12px] leading-[1.5] tracking-[-0.25px] text-[#49454f]">
              Create Password
            </span>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setAgreed((v) => !v)}
              className="flex items-center justify-center w-6 h-6 p-1 shrink-0"
            >
              <div
                className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center ${
                  agreed ? "bg-[#2952e1]" : "border-2 border-[#49454f]"
                }`}
              >
                {agreed && <CheckIcon />}
              </div>
            </button>
            <p className="font-inter text-[14px] text-[#161616] leading-[22px]">
              I accept all the{" "}
              <Link href="/terms" className="font-medium text-[#2952e1]">
                terms and conditions
              </Link>
            </p>
          </div>
        </div>

        {/* Register button */}
        <button
          type="submit"
          className="w-full bg-[#2952e1] text-white font-inter font-medium text-[16px] leading-[1.5] tracking-[-0.25px] py-4 rounded-[31px] text-center hover:bg-[#1e42c7] transition-colors"
        >
          Register
        </button>
      </div>
    </div>
  );
}

/* ── Floating label input ── */
function FloatingLabelInput({
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
    <div className="relative border border-[#79747e] rounded-[4px] h-14 flex items-center px-4">
      <input
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full h-full bg-transparent font-inter text-[16px] text-[#49454f] placeholder:text-[#49454f] outline-none"
      />
      <span className="absolute left-3 -top-[11px] bg-white px-1 font-inter text-[12px] leading-[1.5] tracking-[-0.25px] text-[#49454f]">
        {label}
      </span>
    </div>
  );
}

/* ── Icons (inline SVG) ── */
function ChevronDownIcon() {
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
