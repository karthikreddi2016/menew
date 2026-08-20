"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";
import { FloatingInput, FloatingPasswordInput } from "@/components/auth/AuthInput";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [remember, setRemember] = useState(true);
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AuthLeftPanel />

      {/* ── Right: form panel ── */}
      <div className="flex flex-1 md:flex-none shrink-0 items-center justify-center bg-white px-4 sm:px-[40px] py-10 sm:py-16">
        <div className="flex w-full max-w-[383px] flex-col gap-12">

          {/* Signup / Login toggle — Login is active */}
          <div className="rounded-[8px] bg-[#e7ecff] p-[4px]">
            <div className="flex gap-2">
              <Link
                href="/signup"
                className="flex h-12 flex-1 items-center justify-center rounded-[8px]"
              >
                <span className="font-inter font-medium text-[14px] leading-normal tracking-[-0.25px] text-[#11225f]">
                  Signup
                </span>
              </Link>
              <div className="flex h-12 flex-1 items-center justify-center rounded-[8px] bg-white shadow-[0px_2px_8px_0px_rgba(41,82,225,0.15)]">
                <span className="font-inter font-medium text-[14px] leading-normal tracking-[-0.25px] text-[#2952e1]">
                  Login
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form action={formAction} className="flex flex-col gap-7">
            {/* Email */}
            <FloatingInput
              name="email"
              label="Enter Your Email"
              type="email"
              autoComplete="email"
            />

            {/* Password */}
            <FloatingPasswordInput
              name="password"
              label="Enter Password"
              autoComplete="current-password"
            />

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRemember((v) => !v)}>
                <div
                  className={`flex h-[18px] w-[18px] items-center justify-center rounded-[3px] transition-colors ${
                    remember ? "bg-[#2952e1]" : "border-2 border-[#747775] bg-white"
                  }`}
                >
                  {remember && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="font-inter text-[14px] text-[#161616] select-none">
                  Remember me
                </span>
              </div>

              <Link
                href="/forgot-password"
                className="font-inter font-medium text-[14px] text-[#2952e1] hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            {/* Error */}
            {state?.error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 font-inter text-sm text-red-700">
                {state.error}
              </div>
            )}

            {/* Login CTA */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-[31px] bg-[#2952e1] py-4 text-center font-inter font-medium text-[16px] leading-normal tracking-[-0.25px] text-white transition-all hover:bg-[#1e42c7] shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {isPending ? "Logging in…" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
