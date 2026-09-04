'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { OrderStatusBadge } from '@/components/dashboard/OrderStatusBadge'
import { SERVICE_CONFIG } from '@/lib/types/order.types'
import type { Order, OrderStatus, OrderFile } from '@/lib/types/database.types'
import { assignOrderAction } from '@/app/admin/actions'

export type AdminOrder = Order & {
  profiles: { full_name: string; email: string; phone?: string | null } | null
  assigned_profile?: { full_name: string; email: string } | null
  order_files?: OrderFile[]
}

const STATUS_FILTERS: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Revision', value: 'revision' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]

function formatBytes(bytes?: number | null) {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export function OrderTable({
  orders,
  teamMembers = [],
}: {
  orders: AdminOrder[]
  teamMembers?: { id: string; full_name: string; role: string }[]
}) {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [search, setSearch] = useState('')
  const [assigningId, setAssigningId] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Handle escape key to close modal
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelectedOrder(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const filtered = orders.filter((o) => {
    const matchesFilter = filter === 'all' || o.status === filter
    const matchesSearch =
      !search.trim() ||
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.profiles?.full_name.toLowerCase().includes(search.toLowerCase()) ||
      o.profiles?.email.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  async function handleAssign(orderId: string, memberId: string) {
    setAssigningId(orderId)
    await assignOrderAction(orderId, memberId || null)
    setAssigningId(null)
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, assigned_admin: memberId || null } : null))
    }
  }

  function handleCopy(text: string, label: string) {
    navigator.clipboard.writeText(text)
    setCopiedField(label)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 flex-1">
          {STATUS_FILTERS.map((f) => {
            const count = f.value === 'all' ? orders.length : orders.filter((o) => o.status === f.value).length
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-full border px-3 py-1.5 font-inter text-xs transition-colors ${
                  filter === f.value
                    ? 'border-[#184043] bg-[#184043] text-white shadow-sm font-medium'
                    : 'border-black/10 bg-white text-[#1d2433] hover:border-[#184043]/40'
                }`}
              >
                {f.label}
                <span className="ml-1.5 opacity-60">({count})</span>
              </button>
            )
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search orders or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2 font-inter text-xs text-[#1d2433] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all placeholder:text-black/30"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 font-inter text-xs text-black/40 hover:text-black"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/8 bg-[#fbf6ef]/40">
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Service & Request</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Payment</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Fulfillment</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Created</th>
              <th className="px-4 py-3 text-right font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center font-inter text-sm text-black/40">
                  No order requests match your filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id} className="hover:bg-black/2 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-inter text-sm font-semibold text-[#1d2433]">{order.profiles?.full_name ?? '—'}</p>
                    <p className="font-inter text-xs text-black/40">{order.profiles?.email ?? '—'}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-inter text-sm font-medium text-[#1d2433]">{order.title}</p>
                    <span className="inline-block rounded px-1.5 py-0.5 font-inter text-[11px] font-medium bg-slate-100 text-slate-700 mt-0.5">
                      {SERVICE_CONFIG[order.service_type]?.label ?? order.service_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-inter text-xs font-medium text-[#1d2433]">
                        {order.amount && order.amount > 0 ? `₹${order.amount.toLocaleString('en-IN')}` : 'Quote Pending'}
                      </span>
                      <span
                        className={`inline-block w-max rounded-full px-2 py-0.5 font-inter text-[10px] font-semibold uppercase ${
                          order.payment_status === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.payment_status === 'refunded'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.payment_status || 'unpaid'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.assigned_admin || ''}
                      disabled={assigningId === order.id}
                      onChange={(e) => handleAssign(order.id, e.target.value)}
                      className="rounded-lg border border-black/15 bg-white px-2.5 py-1 font-inter text-xs text-[#1d2433] focus:border-[#2952E1] outline-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="">-- Unassigned --</option>
                      {teamMembers.map((tm) => (
                        <option key={tm.id} value={tm.id}>
                          {tm.full_name} ({tm.role})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 font-inter text-xs text-black/40 whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* View Details Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-black/15 bg-white px-3 py-1.5 font-inter text-xs font-medium text-[#1d2433] hover:bg-slate-50 hover:border-black/30 transition-all shadow-2xs cursor-pointer"
                        title="View filled form details"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span>Details</span>
                      </button>

                      {/* Manage Order Link */}
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 rounded-xl bg-[#184043] px-3 py-1.5 font-inter text-xs font-medium text-white hover:bg-[#102d30] transition-all shadow-xs"
                      >
                        Manage →
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Exact Filled Form Modal ── */}
      {selectedOrder && (() => {
        const isBranding = selectedOrder.service_type === 'branding_kit'
        const isPPT = selectedOrder.service_type === 'ppt_design'
        const isVideo = selectedOrder.service_type === 'video_editing'
        const isGraphic = !isBranding && !isPPT && !isVideo

        const pageTitle = isBranding
          ? selectedOrder.title.split(' - ')[0] || 'Branding Package'
          : SERVICE_CONFIG[selectedOrder.service_type]?.label
          ? `${SERVICE_CONFIG[selectedOrder.service_type].label} Request`
          : 'Design Request'

        const pageSubtitle = isBranding
          ? 'Brand guide, Logo, Color Palette, Typography & Social Assets'
          : 'Tell us about your project. Explain like you would to a friend!'

        const deadline = selectedOrder.deadline_pref || 'Standard'

        // Files
        const orderFiles = selectedOrder.order_files ?? []

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div
              className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#F8FAFC] rounded-3xl border border-[#EDEDED] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Top Header Bar */}
              <div className="flex items-center justify-between border-b border-[#EDEDED] bg-white px-6 py-4 sticky top-0 z-10 shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2952E1]/10 text-[#2952E1] px-3 py-1 font-inter text-xs font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2952E1]" />
                    {SERVICE_CONFIG[selectedOrder.service_type]?.label ?? selectedOrder.service_type}
                  </span>
                  <OrderStatusBadge status={selectedOrder.status} />
                  <span
                    onClick={() => handleCopy(selectedOrder.id, 'id')}
                    className="font-mono text-[11px] text-black/50 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    title="Click to copy Order ID"
                  >
                    #{selectedOrder.id.slice(0, 8)}... {copiedField === 'id' && '✓'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/orders/${selectedOrder.id}`}
                    className="hidden sm:inline-flex items-center gap-1 rounded-xl bg-[#184043] px-3.5 py-1.5 font-inter text-xs font-medium text-white hover:bg-[#102d30] transition-all shadow-xs"
                  >
                    Manage Full Page →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="rounded-full p-2 text-black/40 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
                {/* Form Title & Subtitle Banner */}
                <div className="border-b border-[#EDEDED] pb-5">
                  <h1 className="font-serif text-[26px] sm:text-[32px] text-[#111827] font-normal tracking-[-0.01em]">
                    {pageTitle}
                  </h1>
                  <p className="font-inter text-[14px] text-[#6f6f6f] mt-1">
                    {pageSubtitle}
                  </p>
                </div>

                {/* ── Card 1: Main Project Inputs ── */}
                <div className="rounded-[20px] border border-[#EDEDED] bg-white p-6 sm:p-8 shadow-xs space-y-5">
                  {isBranding ? (
                    <>
                      {/* Brand Name */}
                      <div>
                        <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                          Brand Name
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={selectedOrder.brand_name || ''}
                          placeholder="Not provided"
                          className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-3 font-inter text-[14px] font-medium text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                        />
                      </div>

                      {/* Industry */}
                      <div>
                        <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                          Industry
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={selectedOrder.industry || ''}
                          placeholder="Not provided"
                          className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-3 font-inter text-[14px] font-medium text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                        />
                      </div>

                      {/* Tagline */}
                      <div>
                        <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                          Tagline
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={selectedOrder.tagline || ''}
                          placeholder="Not provided"
                          className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-3 font-inter text-[14px] font-medium text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                        />
                      </div>

                      {/* Brief */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block font-inter text-[14px] font-semibold text-[#111827]">
                            Brief, Instructions about your Brand
                          </label>
                          {selectedOrder.brief && (
                            <button
                              type="button"
                              onClick={() => handleCopy(selectedOrder.brief, 'brief')}
                              className="text-[11px] font-inter text-[#2952E1] hover:underline"
                            >
                              {copiedField === 'brief' ? 'Copied!' : 'Copy Brief'}
                            </button>
                          )}
                        </div>
                        <div className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] p-4 font-inter text-[14px] text-[#111827] leading-relaxed whitespace-pre-wrap min-h-[80px]">
                          {selectedOrder.brief || <span className="text-[#9CA3AF]">Not provided</span>}
                        </div>
                      </div>
                    </>
                  ) : isPPT ? (
                    <>
                      {/* Number of Slides */}
                      <div>
                        <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-1">
                          Number of Slides
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={selectedOrder.num_slides || ''}
                          placeholder="Not provided"
                          className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-3 font-inter text-[14px] font-medium text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                        />
                      </div>

                      {/* Brief */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block font-inter text-[14px] font-semibold text-[#111827]">
                            Brief, Instructions or Content
                          </label>
                          {selectedOrder.brief && (
                            <button
                              type="button"
                              onClick={() => handleCopy(selectedOrder.brief, 'brief')}
                              className="text-[11px] font-inter text-[#2952E1] hover:underline"
                            >
                              {copiedField === 'brief' ? 'Copied!' : 'Copy Brief'}
                            </button>
                          )}
                        </div>
                        <div className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] p-4 font-inter text-[14px] text-[#111827] leading-relaxed whitespace-pre-wrap min-h-[80px]">
                          {selectedOrder.brief || <span className="text-[#9CA3AF]">Not provided</span>}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Creative Type */}
                      <div>
                        <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                          Creative Type
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={selectedOrder.creative_type || ''}
                          placeholder="Not provided"
                          className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-3 font-inter text-[14px] font-medium text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                        />
                      </div>

                      {/* Tell us what you want */}
                      <div>
                        <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                          Tell us what you want
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={selectedOrder.title}
                          className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-3 font-inter text-[14px] font-medium text-[#111827] outline-none"
                        />
                      </div>

                      {/* Quantity */}
                      <div>
                        <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                          Quantity
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={selectedOrder.quantity || ''}
                          placeholder="Not provided"
                          className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-3 font-inter text-[14px] font-medium text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                        />
                      </div>

                      {/* Brief */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block font-inter text-[14px] font-semibold text-[#111827]">
                            Brief, Instructions or Content
                          </label>
                          {selectedOrder.brief && (
                            <button
                              type="button"
                              onClick={() => handleCopy(selectedOrder.brief, 'brief')}
                              className="text-[11px] font-inter text-[#2952E1] hover:underline"
                            >
                              {copiedField === 'brief' ? 'Copied!' : 'Copy Brief'}
                            </button>
                          )}
                        </div>
                        <div className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] p-4 font-inter text-[14px] text-[#111827] leading-relaxed whitespace-pre-wrap min-h-[80px]">
                          {selectedOrder.brief || <span className="text-[#9CA3AF]">Not provided</span>}
                        </div>
                      </div>
                    </>
                  )}

                  {/* ── Need Help with Content + Copy ── */}
                  <div className="border-t border-[#F3F4F6] pt-5">
                    <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-3">
                      Need Help with Writing Content Copy?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['no', 'yes'].map((val) => {
                        const isSelected = (selectedOrder.need_content_help || 'no') === val
                        const label = val === 'no' ? 'No, I will Provide All the Copy Myself' : 'Yes, I Need Help with Content'
                        return (
                          <div
                            key={val}
                            className={`rounded-[10px] py-3.5 px-4 font-inter text-[14px] text-center transition-all ${
                              isSelected
                                ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                                : 'border border-[#EDEDED] bg-[#FAFBFD] text-[#6f6f6f] opacity-60'
                            }`}
                          >
                            {label}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Copy Content (shown when need_content_help is 'no') */}
                  {(selectedOrder.need_content_help || 'no') === 'no' && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block font-inter text-[14px] font-semibold text-[#111827]">
                          Copy Content for the creative
                        </label>
                        {selectedOrder.copy_content && (
                          <button
                            type="button"
                            onClick={() => handleCopy(selectedOrder.copy_content!, 'copy')}
                            className="text-[11px] font-inter text-[#2952E1] hover:underline"
                          >
                            {copiedField === 'copy' ? 'Copied!' : 'Copy Content'}
                          </button>
                        )}
                      </div>
                      <div className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] p-4 font-inter text-[14px] text-[#111827] leading-relaxed whitespace-pre-wrap min-h-[80px]">
                        {selectedOrder.copy_content || <span className="text-[#9CA3AF]">Not provided</span>}
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Card 2: Purpose / Brand Personality ── */}
                <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 shadow-xs">
                  <label className="block font-inter text-[15px] font-semibold text-[#111827] mb-4">
                    {isBranding ? 'Brand Personality' : 'Purpose of design'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(isBranding
                      ? ['Bold', 'Minimal', 'Premium', 'Playful', 'Not Specified']
                      : ['Social', 'Work', 'Business', 'Study']
                    ).map((item) => {
                      const currentVal = isBranding
                        ? selectedOrder.brand_personality || 'Bold'
                        : selectedOrder.purpose || 'Social'
                      const isSelected = currentVal === item
                      return (
                        <div
                          key={item}
                          className={`rounded-[10px] py-3 px-4 font-inter text-[14px] text-center transition-all ${
                            isSelected
                              ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                              : 'border border-[#EDEDED] bg-[#FAFBFD] text-[#6f6f6f] opacity-60'
                          }`}
                        >
                          {item}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* ── Card 3: Upload Design Assets ── */}
                <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 shadow-xs space-y-4">
                  <div>
                    <h3 className="font-inter text-[15px] font-semibold text-[#111827]">
                      Upload Design Assets
                    </h3>
                    <p className="font-inter text-[12px] text-[#6f6f6f] mt-0.5">
                      Brand files, logo, design elements, guidelines or any other assets
                    </p>
                  </div>

                  {orderFiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {orderFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between rounded-xl border border-[#EDEDED] bg-[#FAFBFD] p-3.5"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <span className="p-2 rounded-lg bg-[#EAEFFF] text-[#2952E1]">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                            </span>
                            <div className="overflow-hidden">
                              <p className="font-inter text-[13px] font-medium text-[#111827] truncate" title={file.file_name}>
                                {file.file_name}
                              </p>
                              <span className="font-inter text-[11px] text-[#6f6f6f]">
                                {formatBytes(file.file_size)} • {file.file_role}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-[#EDEDED] bg-[#FAFBFD] rounded-[12px] p-6 text-center">
                      <p className="font-inter text-[13px] text-[#9CA3AF]">No files uploaded by the user.</p>
                    </div>
                  )}

                  {/* Asset Link */}
                  <div>
                    <div className="relative flex items-center justify-center my-2">
                      <div className="w-full border-t border-[#EDEDED]" />
                      <span className="absolute bg-white px-3 font-inter text-[12px] text-[#9CA3AF]">
                        or link
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={selectedOrder.asset_link || ''}
                        placeholder="No asset link provided"
                        className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-3 font-inter text-[14px] text-[#2952E1] outline-none placeholder:text-[#9CA3AF]"
                      />
                      {selectedOrder.asset_link && (
                        <button
                          type="button"
                          onClick={() => handleCopy(selectedOrder.asset_link!, 'asset_link')}
                          className="shrink-0 rounded-lg border border-[#EDEDED] bg-white px-3 py-2.5 font-inter text-[11px] font-medium text-[#2952E1] hover:bg-blue-50 transition-colors"
                        >
                          {copiedField === 'asset_link' ? '✓ Copied' : 'Copy'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Card 4: Upload References ── */}
                <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 shadow-xs space-y-4">
                  <div>
                    <h3 className="font-inter text-[15px] font-semibold text-[#111827]">
                      Upload references (optional)
                    </h3>
                    <p className="font-inter text-[12px] text-[#6f6f6f] mt-0.5">
                      Images, links, or files that inspire the user
                    </p>
                  </div>

                  {/* Reference Link */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={selectedOrder.reference_link || ''}
                      placeholder="No reference link provided"
                      className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-3 font-inter text-[14px] text-[#2952E1] outline-none placeholder:text-[#9CA3AF]"
                    />
                    {selectedOrder.reference_link && (
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedOrder.reference_link!, 'ref_link')}
                        className="shrink-0 rounded-lg border border-[#EDEDED] bg-white px-3 py-2.5 font-inter text-[11px] font-medium text-[#2952E1] hover:bg-blue-50 transition-colors"
                      >
                        {copiedField === 'ref_link' ? '✓ Copied' : 'Copy'}
                      </button>
                    )}
                  </div>
                </div>

                {/* ── Card 5: Style preference (non-branding only) ── */}
                {!isBranding && (
                  <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 shadow-xs">
                    <label className="block font-inter text-[15px] font-semibold text-[#111827] mb-4">
                      Style preference
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['Modern', 'Minimal', 'Bold', 'Not sure'].map((item) => {
                        const isSelected = (selectedOrder.style_pref || 'Modern') === item
                        return (
                          <div
                            key={item}
                            className={`rounded-[10px] py-3 px-4 font-inter text-[14px] text-center transition-all ${
                              isSelected
                                ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                                : 'border border-[#EDEDED] bg-[#FAFBFD] text-[#6f6f6f] opacity-60'
                            }`}
                          >
                            {item}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* ── Card 6: Deadline Preference ── */}
                <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 shadow-xs">
                  <label className="block font-inter text-[15px] font-semibold text-[#111827] mb-4">
                    Deadline preference
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Flexible', 'Standard', 'Urgent'].map((item) => {
                      const isSelected = deadline.toLowerCase() === item.toLowerCase()
                      return (
                        <div
                          key={item}
                          className={`rounded-[10px] py-3 px-4 font-inter text-[14px] text-center transition-all ${
                            isSelected
                              ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                              : 'border border-[#EDEDED] bg-[#FAFBFD] text-[#6f6f6f] opacity-60'
                          }`}
                        >
                          {item}
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
                    <div>
                      <p className="font-inter text-[13px] font-semibold text-[#111827]">
                        Expected Delivery: <span className="font-bold text-[#2952E1]">{isBranding ? '6-7 Days' : '4-5 Days'}</span>
                      </p>
                      <p className="font-inter text-[12px] text-[#6f6f6f] mt-0.5">
                        Preference selected by client during submission.
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block font-inter text-xs text-[#6f6f6f]">Payment</span>
                      <span className="font-inter text-sm font-bold text-[#111827]">
                        {selectedOrder.amount && selectedOrder.amount > 0 ? `₹${selectedOrder.amount.toLocaleString('en-IN')}` : 'Quote Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Card 7: Contact Preference ── */}
                <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 shadow-xs">
                  <label className="block font-inter text-[15px] font-semibold text-[#111827] mb-4">
                    Contact preference
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Email', 'WhatsApp'].map((item) => {
                      const isSelected = (selectedOrder.contact_pref || 'Email') === item
                      return (
                        <div
                          key={item}
                          className={`rounded-[10px] py-3 px-4 font-inter text-[14px] text-center transition-all ${
                            isSelected
                              ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                              : 'border border-[#EDEDED] bg-[#FAFBFD] text-[#6f6f6f] opacity-60'
                          }`}
                        >
                          {item}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* ── Card 8: Customer & Contact Information ── */}
                <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 shadow-xs">
                  <label className="block font-inter text-[15px] font-semibold text-[#111827] mb-4">
                    Customer & Contact Information
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Full Name */}
                    <div>
                      <span className="block font-inter text-[12px] font-medium text-[#6f6f6f] mb-1">Full Name</span>
                      <input
                        type="text"
                        readOnly
                        value={selectedOrder.profiles?.full_name || '—'}
                        className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-2.5 font-inter text-[14px] text-[#111827] outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <span className="block font-inter text-[12px] font-medium text-[#6f6f6f] mb-1">Email</span>
                      <input
                        type="text"
                        readOnly
                        value={selectedOrder.profiles?.email || '—'}
                        className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-2.5 font-inter text-[14px] text-[#2952E1] outline-none"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <span className="block font-inter text-[12px] font-medium text-[#6f6f6f] mb-1">Phone</span>
                      <input
                        type="text"
                        readOnly
                        value={selectedOrder.profiles?.phone || 'Not provided'}
                        className="w-full rounded-[10px] border border-[#EDEDED] bg-[#FAFBFD] px-4 py-2.5 font-inter text-[14px] text-[#111827] outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
                    <span className="font-inter text-xs text-[#6f6f6f]">
                      Submitted: {new Date(selectedOrder.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-inter text-xs font-medium text-[#6f6f6f]">Assigned Creative:</span>
                      <select
                        value={selectedOrder.assigned_admin || ''}
                        disabled={assigningId === selectedOrder.id}
                        onChange={(e) => handleAssign(selectedOrder.id, e.target.value)}
                        className="rounded-lg border border-black/15 bg-white px-2.5 py-1 font-inter text-xs text-[#1d2433] focus:border-[#2952E1] outline-none cursor-pointer"
                      >
                        <option value="">-- Unassigned --</option>
                        {teamMembers.map((tm) => (
                          <option key={tm.id} value={tm.id}>
                            {tm.full_name} ({tm.role})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Modal Bottom Bar */}
              <div className="flex items-center justify-between border-t border-[#EDEDED] bg-white px-6 py-4 sticky bottom-0 z-10">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-full border border-[#EDEDED] bg-white px-6 py-2.5 font-inter text-xs font-medium text-[#111827] hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Close
                </button>

                <Link
                  href={`/admin/orders/${selectedOrder.id}`}
                  className="rounded-full bg-[#2952E1] text-white px-7 py-2.5 font-inter text-xs font-medium hover:bg-[#1e42c7] active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Open Full Order Management & Chat</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )
      })()}

    </div>
  )
}

