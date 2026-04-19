"use client";

import { useState, useActionState } from "react";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";
import { resetPasswordAction } from "./actions";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, formAction, isPending] = useActionState(resetPasswordAction, null);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AuthLeftPanel />

      <div className="flex flex-1 md:flex-none shrink-0 items-center justify-center bg-white px-4 sm:px-[40px] py-10 sm:py-16">
        <div className="flex w-full max-w-[383px] flex-col gap-10">

          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="font-inter font-semibold text-[24px] leading-tight text-[#11225f]">
              Set new password
            </h1>
            <p className="font-inter text-[14px] text-[#49454f] leading-relaxed">
              Choose a strong password for your account.
            </p>
          </div>

          {/* Form */}
          <form action={formAction} className="flex flex-col gap-8">
            {/* New password */}
            <div className="relative flex h-14 items-center rounded-[4px] border border-[#79747e]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center">
                <LockIcon />
              </span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                required
                minLength={6}
                className="h-full flex-1 bg-transparent font-inter text-[16px] text-[#49454f] placeholder:text-[#49454f] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="flex h-12 w-12 shrink-0 items-center justify-center"
              >
                <EyeIcon open={showPassword} />
              </button>
              <span className="absolute left-[40px] -top-[11px] bg-white px-1 font-inter text-[12px] leading-normal tracking-[-0.25px] text-[#49454f]">
                New Password
              </span>
            </div>

            {/* Confirm password */}
            <div className="relative flex h-14 items-center rounded-[4px] border border-[#79747e]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center">
                <LockIcon />
              </span>
              <input
                name="confirm"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                required
                minLength={6}
                className="h-full flex-1 bg-transparent font-inter text-[16px] text-[#49454f] placeholder:text-[#49454f] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="flex h-12 w-12 shrink-0 items-center justify-center"
              >
                <EyeIcon open={showConfirm} />
              </button>
              <span className="absolute left-[40px] -top-[11px] bg-white px-1 font-inter text-[12px] leading-normal tracking-[-0.25px] text-[#49454f]">
                Confirm Password
              </span>
            </div>

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
              {isPending ? "Updating…" : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </div>
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
