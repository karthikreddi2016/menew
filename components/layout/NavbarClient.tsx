"use client";

import { useState } from "react";
import Link from "next/link";
import { logoutAction } from "@/app/auth/actions";

export function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#dadada]">
      <div className="flex items-center justify-between px-4 md:px-[70px] py-[16px] max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <div
            className="h-[39px] w-[150px] overflow-hidden relative"
            aria-label="Menew"
          >
            <div
              style={{
                position: "absolute",
                width: "167.91px",
                height: "165.83px",
                left: "-8.955px",
                top: "-63.414px",
                backgroundImage: "url('/images/logo.png')",
                backgroundSize: "100% 100%",
              }}
            />
          </div>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <button className="font-inter text-[16px] leading-normal tracking-[-0.25px] text-black hover:text-black/70 transition-colors">
            Services
          </button>

          <div className="flex items-center gap-1">
            <span className="font-inter text-[16px] leading-normal tracking-[-0.25px] text-black">
              For Enterprise
            </span>
            <span className="bg-[#e865aa] text-[#fff1f8] text-[10px] font-inter rounded-[2px] px-1 py-0.5 leading-none">
              Upcoming
            </span>
          </div>

          <Link
            href="/contact"
            className="font-inter text-[16px] leading-normal tracking-[-0.25px] text-black hover:text-black/70 transition-colors"
          >
            Contact
          </Link>

          <Link
            href="#join"
            className="font-inter text-[16px] leading-normal tracking-[-0.25px] text-black hover:text-black/70 transition-colors"
          >
            Join the Team
          </Link>
        </nav>

        {/* Action buttons — desktop */}
        <div className="hidden md:flex items-center gap-5">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="bg-[#e7ecff] text-[#2952e1] font-inter font-medium text-[16px] tracking-[-0.25px] leading-normal px-8 py-4 rounded-full hover:bg-[#d4dcff] transition-colors whitespace-nowrap"
              >
                Dashboard
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="bg-[#2952e1] text-white font-inter font-medium text-[16px] tracking-[-0.25px] leading-normal px-8 py-4 rounded-full hover:bg-[#1e42c7] transition-colors whitespace-nowrap"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-[#e7ecff] text-[#2952e1] font-inter font-medium text-[16px] tracking-[-0.25px] leading-normal px-8 py-4 rounded-full hover:bg-[#d4dcff] transition-colors whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                href="/order"
                className="bg-[#2952e1] text-white font-inter font-medium text-[16px] tracking-[-0.25px] leading-normal px-8 py-4 rounded-full hover:bg-[#1e42c7] transition-colors whitespace-nowrap"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger — mobile */}
        <button
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-black/5"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#dadada] bg-white px-4 pb-6 pt-4">
          <nav className="flex flex-col gap-4">
            <button className="font-inter text-[16px] leading-normal tracking-[-0.25px] text-black text-left hover:text-black/70 transition-colors">
              Services
            </button>

            <div className="flex items-center gap-1">
              <span className="font-inter text-[16px] leading-normal tracking-[-0.25px] text-black">
                For Enterprise
              </span>
              <span className="bg-[#e865aa] text-[#fff1f8] text-[10px] font-inter rounded-[2px] px-1 py-0.5 leading-none">
                Upcoming
              </span>
            </div>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="font-inter text-[16px] leading-normal tracking-[-0.25px] text-black hover:text-black/70 transition-colors"
            >
              Contact
            </Link>

            <Link
              href="#join"
              onClick={() => setMenuOpen(false)}
              className="font-inter text-[16px] leading-normal tracking-[-0.25px] text-black hover:text-black/70 transition-colors"
            >
              Join the Team
            </Link>
          </nav>

          <div className="mt-5 flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#e7ecff] text-[#2952e1] font-inter font-medium text-[16px] tracking-[-0.25px] leading-normal px-8 py-4 rounded-full hover:bg-[#d4dcff] transition-colors text-center"
                >
                  Dashboard
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="w-full bg-[#2952e1] text-white font-inter font-medium text-[16px] tracking-[-0.25px] leading-normal px-8 py-4 rounded-full hover:bg-[#1e42c7] transition-colors text-center"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#e7ecff] text-[#2952e1] font-inter font-medium text-[16px] tracking-[-0.25px] leading-normal px-8 py-4 rounded-full hover:bg-[#d4dcff] transition-colors text-center"
                >
                  Login
                </Link>
                <Link
                  href="/order"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#2952e1] text-white font-inter font-medium text-[16px] tracking-[-0.25px] leading-normal px-8 py-4 rounded-full hover:bg-[#1e42c7] transition-colors text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
