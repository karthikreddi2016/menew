"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";
import { forgotPasswordAction } from "./actions";

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, null);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AuthLeftPanel />

      <div className="flex flex-1 md:flex-none shrink-0 items-center justify-center bg-white px-4 sm:px-[40px] py-10 sm:py-16">
        <div className="flex w-full max-w-[383px] flex-col gap-10">

          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="font-inter font-semibold text-[24px] leading-tight text-[#11225f]">
              Forgot password?
            </h1>
            <p className="font-inter text-[14px] text-[#49454f] leading-relaxed">
              Enter the email linked to your account and we&apos;ll send you a reset link.
            </p>
          </div>

          {state?.success ? (
            /* Success state */
            <div className="flex flex-col items-center gap-6 py-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e7ecff]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    stroke="#2952e1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-inter font-semibold text-[20px] text-[#11225f]">
                  Check your email
                </h2>
                <p className="font-inter text-[14px] text-[#49454f] leading-relaxed">
                  We sent a password reset link to{" "}
                  <span className="font-medium text-[#11225f]">{state.email}</span>.
                  <br />
                  Click the link in the email to set a new password.
                </p>
              </div>
              <Link
                href="/login"
                className="font-inter font-medium text-[14px] text-[#2952e1] underline"
              >
                Back to login
              </Link>
            </div>
          ) : (
            /* Form */
            <form action={formAction} className="flex flex-col gap-8">
              <FloatingInput
                name="email"
                label="Enter Your Email"
                placeholder="user@example.com"
                type="email"
                autoComplete="email"
              />

              {state?.error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 font-inter text-sm text-red-700">
                  {state.error}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-[31px] bg-[#2952e1] py-4 text-center font-inter font-medium text-[16px] leading-normal tracking-[-0.25px] text-white transition-colors hover:bg-[#1e42c7] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? "Sending…" : "Send reset link"}
              </button>

              <p className="text-center font-inter text-[14px] text-[#49454f]">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#2952e1]"
                >
                  Log in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

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
