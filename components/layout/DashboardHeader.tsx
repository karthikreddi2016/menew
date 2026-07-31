'use client'

import Link from 'next/link'
import { logoutAction } from '@/app/auth/actions'

export function DashboardHeader({
  ordersCount = 2,
  avatarInitials = 'U',
  isLoggedIn = true,
}: {
  ordersCount?: number
  avatarInitials?: string
  isLoggedIn?: boolean
}) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#EDEDED]">
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

          {/* User Avatar */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2952E1] text-white font-inter font-semibold text-[15px] shadow-sm">
                {avatarInitials}
              </div>
              <form action={logoutAction}>
                <button
                  type="submit"
                  title="Sign out"
                  className="font-inter text-xs text-[#6f6f6f] hover:text-red-600 transition-colors hidden md:block"
                >
                  Sign out
                </button>
              </form>
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
  )
}
