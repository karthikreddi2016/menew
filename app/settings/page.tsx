'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [fullName, setFullName] = useState('Jason Glare')
  const [email, setEmail] = useState('Jasonglaremail@Gmail.com')
  const [phone, setPhone] = useState('+91 9876543210')
  const [language, setLanguage] = useState('English (India)')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [savedSuccess, setSavedSuccess] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setPasswordSuccess(true)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setPasswordSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* ── Top Back Navigation Bar ── */}
      <header className="bg-white border-b border-[#EDEDED] py-3.5 px-4 sm:px-8 mb-8">
        <div className="max-w-[860px] mx-auto flex items-center justify-start">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 font-inter text-[14px] font-medium text-[#49454f] hover:text-[#2952E1] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back</span>
          </Link>
        </div>
      </header>

      {/* ── Main Settings Container ── */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 space-y-6">
        {/* Title */}
        <div>
          <h1 className="font-serif text-[30px] sm:text-[36px] text-[#111827] font-normal tracking-[-0.01em]">
            Settings
          </h1>
        </div>

        {/* ── Card 1: Profile Info ── */}
        <form onSubmit={handleSaveProfile} className="bg-white rounded-[20px] border border-[#EDEDED] p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="font-inter text-[16px] font-bold text-[#111827]">
            Profile Info
          </h2>

          {savedSuccess && (
            <div className="rounded-lg bg-green-50 p-3 text-xs text-green-700 font-medium font-inter">
              Profile information updated successfully!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Name */}
            <div>
              <label className="block font-inter text-[13px] font-semibold text-[#111827] mb-1.5">
                Name <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-2.5 font-inter text-[14px] text-[#111827] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
              />
            </div>

            {/* Email ID */}
            <div>
              <label className="block font-inter text-[13px] font-semibold text-[#111827] mb-1.5">
                Email ID <span className="text-amber-600">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-2.5 font-inter text-[14px] text-[#111827] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
              />
            </div>

            {/* WhatsApp Contact */}
            <div>
              <label className="block font-inter text-[13px] font-semibold text-[#111827] mb-1.5">
                WhatsApp Contact <span className="text-amber-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-2.5 font-inter text-[14px] text-[#111827] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block font-inter text-[13px] font-semibold text-[#111827] mb-1.5">
              Language <span className="text-amber-600">*</span>
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-2.5 font-inter text-[14px] text-[#111827] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
            >
              <option value="English (India)">English (India)</option>
              <option value="English (US)">English (US)</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="rounded-full border border-[#2952E1] bg-white px-6 py-2.5 font-inter font-medium text-[14px] text-[#2952E1] hover:bg-[#2952E1]/5 transition-colors shadow-2xs"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* ── Card 2: Password ── */}
        <form onSubmit={handleChangePassword} className="bg-white rounded-[20px] border border-[#EDEDED] p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="font-inter text-[16px] font-bold text-[#111827]">
            Password
          </h2>

          {passwordSuccess && (
            <div className="rounded-lg bg-green-50 p-3 text-xs text-green-700 font-medium font-inter">
              Password changed successfully!
            </div>
          )}

          <div>
            <label className="block font-inter text-[13px] text-[#6F6F6F] mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder=""
              className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-2.5 font-inter text-[14px] text-[#111827] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
            />
          </div>

          <div>
            <label className="block font-inter text-[13px] text-[#6F6F6F] mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder=""
              className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-2.5 font-inter text-[14px] text-[#111827] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
            />
          </div>

          <div>
            <label className="block font-inter text-[13px] text-[#6F6F6F] mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=""
              className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-2.5 font-inter text-[14px] text-[#111827] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="rounded-full border border-[#2952E1] bg-white px-6 py-2.5 font-inter font-medium text-[14px] text-[#2952E1] hover:bg-[#2952E1]/5 transition-colors shadow-2xs"
            >
              Change Password
            </button>
          </div>
        </form>

        {/* ── Card 3: Danger Zone ── */}
        <div className="rounded-[20px] bg-white border border-[#FEE2E2] p-6 sm:p-8 shadow-xs space-y-3">
          <h2 className="font-inter text-[15px] font-bold text-[#DC2626]">
            Danger Zone
          </h2>
          <p className="font-inter text-[13px] text-[#6F6F6F]">
            Deleting your account and data is irreversible; once it&apos;s done, there&apos;s no way to recover it.
          </p>

          <div className="pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#EF4444] bg-white px-5 py-2 font-inter font-medium text-[14px] text-[#EF4444] hover:bg-red-50 transition-colors shadow-2xs"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>Contact Support Team</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
