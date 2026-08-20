"use client";

import { useState } from "react";

interface FloatingInputProps {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
  minLength?: number;
}

export function FloatingInput({
  name,
  label,
  type = "text",
  autoComplete,
  required = true,
  defaultValue = "",
  minLength,
}: FloatingInputProps) {
  const [hasValue, setHasValue] = useState(Boolean(defaultValue));
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || hasValue;

  return (
    <div
      className={`relative flex h-14 w-full items-center rounded-[6px] bg-white px-4 transition-all duration-200 ${
        isFocused
          ? "border-2 border-[#2952E1]"
          : "border border-[#747775] hover:border-[#1F1F1F]"
      }`}
    >
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        minLength={minLength}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(Boolean(e.target.value));
        }}
        onChange={(e) => setHasValue(Boolean(e.target.value))}
        className="h-full w-full bg-transparent font-inter text-[15px] sm:text-[16px] text-[#1F1F1F] outline-none z-10 pt-1"
      />
      <label
        className={`pointer-events-none absolute left-3 bg-white px-1 font-inter transition-all duration-200 ease-out ${
          isFloating
            ? "-top-[10px] text-[12px] font-medium leading-none z-20 " +
              (isFocused ? "text-[#2952E1]" : "text-[#49454F]")
            : "top-1/2 -translate-y-1/2 text-[15px] text-[#5F6368] z-0"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

interface FloatingPasswordInputProps {
  name?: string;
  label?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  defaultValue?: string;
}

export function FloatingPasswordInput({
  name = "password",
  label = "Enter Password",
  autoComplete = "current-password",
  required = true,
  minLength,
  defaultValue = "",
}: FloatingPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(defaultValue));
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || hasValue;

  return (
    <div
      className={`relative flex h-14 w-full items-center rounded-[6px] bg-white pl-3.5 pr-2 transition-all duration-200 ${
        isFocused
          ? "border-2 border-[#2952E1]"
          : "border border-[#747775] hover:border-[#1F1F1F]"
      }`}
    >
      {/* Lock Icon */}
      <span
        className={`flex h-10 w-8 shrink-0 items-center justify-center transition-colors duration-200 ${
          isFocused ? "text-[#2952E1]" : "text-[#49454F]"
        }`}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </span>

      {/* Input */}
      <input
        name={name}
        type={showPassword ? "text" : "password"}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        defaultValue={defaultValue}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(Boolean(e.target.value));
        }}
        onChange={(e) => setHasValue(Boolean(e.target.value))}
        className="h-full flex-1 bg-transparent pl-2 font-inter text-[15px] sm:text-[16px] text-[#1F1F1F] outline-none z-10 pt-1"
      />

      {/* Show / Hide Toggle Button */}
      <button
        type="button"
        onClick={() => setShowPassword((v) => !v)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#5F6368] hover:bg-black/5 hover:text-[#1F1F1F] transition-colors z-20"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        )}
      </button>

      {/* Floating Label with Google Sign-In animation */}
      <label
        className={`pointer-events-none absolute bg-white px-1 font-inter transition-all duration-200 ease-out ${
          isFloating
            ? "left-3 -top-[10px] text-[12px] font-medium leading-none z-20 " +
              (isFocused ? "text-[#2952E1]" : "text-[#49454F]")
            : "left-11 top-1/2 -translate-y-1/2 text-[15px] text-[#5F6368] z-0"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
