"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";
import { signupAction } from "./actions";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [state, formAction, isPending] = useActionState(signupAction, null);

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

          {/* Form */}
          {state?.success ? (
            <div className="flex flex-col items-center gap-6 py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e7ecff]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#2952e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-inter font-semibold text-[20px] text-[#11225f]">Check your email</h2>
                <p className="font-inter text-[14px] text-[#49454f] leading-relaxed">
                  We sent a confirmation link to <span className="font-medium text-[#11225f]">{state.email}</span>.<br />
                  Click it to activate your account, then{" "}
                  <Link href="/login" className="font-medium text-[#2952e1] underline">log in</Link>.
                </p>
              </div>
            </div>
          ) : (
          <form action={formAction} className="flex flex-col gap-8">
            <FloatingInput name="name" label="Enter Your Name" placeholder="First and last name" type="text" autoComplete="name" />
            <FloatingInput name="email" label="Enter Your Email" placeholder="user@example.com" type="email" autoComplete="email" />

            {/* Phone row */}
            <div className="flex gap-2 items-stretch">
              {/* Country code */}
              <div className="relative flex w-[90px] shrink-0 items-center rounded-[4px] border border-[#79747e]">
                <span className="pl-4 font-inter text-[16px] text-[#49454f] tracking-[0.5px]">+91</span>
              </div>
              {/* Phone number */}
              <div className="flex-1">
                <FloatingInput name="phone" label="Phone Number" placeholder="Enter your phone number" type="tel" autoComplete="tel" />
              </div>
            </div>

            {/* Password */}
            <div className="relative flex h-14 items-center rounded-[4px] border border-[#79747e]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center">
                <LockIcon />
              </span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={6}
                className="h-full flex-1 bg-transparent font-inter text-[16px] text-[#49454f] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="flex h-12 w-12 shrink-0 items-center justify-center"
              >
                <EyeIcon open={showPassword} />
              </button>
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

            {/* Error */}
            {state?.error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 font-inter text-sm text-red-700">
                {state.error}
              </div>
            )}

            {/* Register CTA */}
            <button
              type="submit"
              disabled={isPending || !agreed}
              className="w-full rounded-[31px] bg-[#2952e1] py-4 text-center font-inter font-medium text-[16px] leading-normal tracking-[-0.25px] text-white transition-colors hover:bg-[#1e42c7] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Creating account…" : "Register"}
            </button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Shared input with floating label ── */
function FloatingInput({
  name,
  label,
  placeholder,
  type,
  autoComplete,
}: {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  autoComplete?: string;
}) {
  return (
    <div className="relative flex h-14 items-center rounded-[4px] border border-[#79747e] px-4">
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className="h-full w-full bg-transparent font-inter text-[16px] text-[#49454f] placeholder:text-[#49454f] outline-none"
      />
      <span className="absolute left-3 -top-[11px] bg-white px-1 font-inter text-[12px] leading-normal tracking-[-0.25px] text-[#49454f]">
        {label}
      </span>
    </div>
  );
}

/* ── Icons ── */
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
