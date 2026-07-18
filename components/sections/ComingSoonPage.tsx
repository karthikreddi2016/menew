"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="cs-page">
      {/* Background image (inverted to dark) */}
      <div className="cs-bg" aria-hidden="true">
        <Image
          src="/images/coming-soon-bg.jpg"
          alt=""
          fill
          className="cs-bg__img"
          priority
        />
      </div>

      {/* Blue sparkle top-right */}
      <div className="cs-sparkle" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0L12.2 7.8L20 10L12.2 12.2L10 20L7.8 12.2L0 10L7.8 7.8L10 0Z" fill="#4F8EFF" />
        </svg>
      </div>

      {/* ─── Section 1: Hero (full viewport) ─── */}
      <section className="cs-hero">
        {/* Header logo */}
        <header className="cs-header">
          <Image
            src="/images/logo.png"
            alt="Menew"
            width={130}
            height={44}
            className="cs-logo"
            priority
          />
        </header>

        {/* Main content */}
        <div className="cs-hero__content">
          {/* Launching Soon badge */}
          <div className="cs-badge">
            Launching Soon!
          </div>

          {/* Headline */}
          <h1 className="cs-headline">
            The Era of Hiring Freelancers Ends.
            <br />
            <span className="cs-headline__highlight">
              Menew
              <Image
                src="/images/coming-soon-underline.svg"
                alt=""
                width={132}
                height={12}
                className="cs-headline__underline"
                aria-hidden="true"
              />
            </span>{" "}
            is the new way.
          </h1>

          {/* Subtitle — hidden on success */}
          {status !== "success" && (
            <p className="cs-subtitle">
              Join our waiting list to gain access to the world&apos;s most practical and efficient on-demand content production platform.
            </p>
          )}

          {/* Email form — hidden on success */}
          {status !== "success" && (
            <form className="cs-form" onSubmit={handleSubmit}>
              <div className="cs-form__group">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="cs-form__input"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  required
                  disabled={status === "loading"}
                  id="waitlist-email"
                />
                <button
                  type="submit"
                  className="cs-form__btn"
                  disabled={status === "loading"}
                  id="waitlist-submit"
                >
                  {status === "loading" ? (
                    <span className="cs-spinner" />
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
              </div>

              {/* Error feedback */}
              {status === "error" && (
                <p className="cs-feedback cs-feedback--error">{message}</p>
              )}
            </form>
          )}

          {/* Success state — shown after successful signup */}
          {status === "success" && (
            <div className="cs-success">
              <div className="cs-success__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="cs-success__title">You&apos;re on the list!</h2>
              <p className="cs-success__text">
                We&apos;ve added you to our early-access queue. Look out for an email from us
                as we roll out the first invite codes.
              </p>
            </div>
          )}
        </div>

        {/* Social links */}
        <footer className="cs-footer">
          <span className="cs-footer__label">Get in Touch</span>
          <div className="cs-social">
            <a href="#" className="cs-social__link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cs-social__icon">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" className="cs-social__link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="cs-social__icon">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="cs-social__link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="cs-social__icon">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="cs-social__link" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="cs-social__icon">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </footer>

        {/* ─── Section 2: Big Menew watermark background ─── */}
        <div className="cs-watermark-wrap" aria-hidden="true">
          <Image
            src="/images/logo.png"
            alt=""
            width={900}
            height={300}
            className="cs-watermark__img"
            priority
          />
        </div>
      </section>
    </div>
  );
}
