'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { logoutAction } from '@/app/auth/actions'

export function DashboardHeader({
  ordersCount = 2,
  avatarInitials = 'S',
  isLoggedIn = true,
  isAdmin = false,
}: {
  ordersCount?: number
  avatarInitials?: string
  isLoggedIn?: boolean
  isAdmin?: boolean
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#EDEDED]">
        <div className="flex items-center justify-between px-4 sm:px-8 md:px-[60px] py-3.5 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="h-[39px] w-[150px] overflow-hidden relative" aria-label="Menew">
              <div
                style={{
                  position: 'absolute',
                  width: '167.91px',
                  height: '165.83px',
                  left: '-8.955px',
                  top: '-63.414px',
                  backgroundImage: "url('/images/logo.png')",
                  backgroundSize: '100% 100%',
                }}
              />
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Admin Panel Direct Button (for Admins) */}
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#184043] px-4 py-2 font-inter font-semibold text-[13px] text-white shadow-sm transition-all hover:bg-[#102d30]"
              >
                <span>⚡ Admin Panel</span>
              </Link>
            )}

            {/* Desktop My Orders Button */}
            <Link
              href="/cart"
              className="hidden sm:inline-flex relative items-center gap-2 rounded-full bg-[#2952E1] px-5 py-2.5 font-inter font-medium text-[14px] text-white shadow-sm transition-all hover:bg-[#1e42c7]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>My Orders</span>
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-[11px] font-bold text-white shadow-sm">
                {ordersCount}
              </span>
            </Link>

            {/* Mobile Cart Button */}
            <Link
              href="/cart"
              className="sm:hidden relative flex h-10 w-10 items-center justify-center rounded-full bg-[#2952E1] text-white shadow-sm"
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white shadow-sm">
                {ordersCount}
              </span>
            </Link>

            {/* User Avatar with Dropdown */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2952E1] text-white font-inter font-semibold text-[15px] shadow-sm hover:opacity-90 transition-opacity focus:outline-none"
                  aria-label="User Menu"
                >
                  {avatarInitials}
                </button>

                {/* Dropdown Menu (Wireframe 27) */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-[16px] bg-white border border-[#EDEDED] shadow-xl py-2 z-50 animate-fadeIn">
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 font-inter text-[14px] font-semibold text-[#184043] bg-teal-50/70 hover:bg-teal-100/70 transition-colors"
                      >
                        <span>⚡ Admin Panel</span>
                      </Link>
                    )}
                    <Link
                      href="/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 font-inter text-[14px] text-[#111827] hover:bg-gray-50 transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2952E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                      <span>Settings</span>
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 font-inter text-[14px] text-[#111827] hover:bg-gray-50 transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2952E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>Contact</span>
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 font-inter text-[14px] text-[#111827] hover:bg-gray-50 transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2952E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                      </svg>
                      <span>Join the Team</span>
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 font-inter text-[14px] text-[#111827] hover:bg-gray-50 transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2952E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <span>Help Center</span>
                    </Link>

                    <div className="border-t border-[#EDEDED] my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false)
                        setShowLogoutModal(true)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 font-inter text-[14px] text-[#DC2626] font-medium hover:bg-red-50 transition-colors text-left"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#EAEFFF] text-[#2952E1] font-inter font-medium text-[14px] px-6 py-2 rounded-full hover:bg-[#d4dcff] transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Logout Confirmation Modal (Wireframe 28) ── */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-[24px] p-8 max-w-[400px] w-full text-center shadow-2xl space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-3xl">
              🏃
            </div>

            <h2 className="font-serif text-[24px] text-[#111827] font-normal leading-snug">
              Are You Sure You Want to Logout
            </h2>

            <div className="space-y-3">
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#DC2626] text-white py-3.5 px-6 font-inter font-semibold text-[15px] shadow-sm hover:bg-red-700 transition-all"
                >
                  LogOut
                </button>
              </form>

              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="w-full rounded-full bg-[#EAEFFF] text-[#2952E1] py-3.5 px-6 font-inter font-medium text-[15px] hover:bg-blue-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
