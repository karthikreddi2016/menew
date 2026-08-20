"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";
import { FloatingInput, FloatingPasswordInput } from "@/components/auth/AuthInput";
import { signupAction } from "./actions";

export default function SignupPage() {
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
          <form action={formAction} className="flex flex-col gap-7">
            <FloatingInput name="name" label="Enter Your Name" type="text" autoComplete="name" />
            <FloatingInput name="email" label="Enter Your Email" type="email" autoComplete="email" />

            {/* Phone row */}
            <div className="flex gap-2 items-stretch">
              {/* Country code */}
              <div className="relative flex w-[90px] shrink-0 items-center justify-center rounded-[6px] border border-[#747775] bg-white">
                <span className="font-inter text-[15px] text-[#1F1F1F] font-medium">+91</span>
              </div>
              {/* Phone number */}
              <div className="flex-1">
                <FloatingInput name="phone" label="Phone Number" type="tel" autoComplete="tel" />
              </div>
            </div>

            {/* Password */}
            <FloatingPasswordInput
              name="password"
              label="Create Password"
              autoComplete="new-password"
              minLength={6}
            />

            {/* Terms */}
            <div className="flex items-center gap-2 cursor-pointer pt-1" onClick={() => setAgreed((v) => !v)}>
              <div
                className={`flex h-[18px] w-[18px] items-center justify-center rounded-[3px] transition-colors shrink-0 ${
                  agreed ? "bg-[#2952e1]" : "border-2 border-[#747775] bg-white"
                }`}
              >
                {agreed && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <p className="font-inter text-[14px] leading-[22px] text-[#161616] select-none">
                I accept all the{" "}
                <Link href="/terms" className="font-medium text-[#2952e1] hover:underline" onClick={(e) => e.stopPropagation()}>
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
              className="w-full rounded-[31px] bg-[#2952e1] py-4 text-center font-inter font-medium text-[16px] leading-normal tracking-[-0.25px] text-white transition-all hover:bg-[#1e42c7] shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
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
