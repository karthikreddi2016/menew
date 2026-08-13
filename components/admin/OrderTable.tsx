'use client'

import { useState } from 'react'
import Link from 'next/link'
import { OrderStatusBadge } from '@/components/dashboard/OrderStatusBadge'
import { SERVICE_CONFIG } from '@/lib/types/order.types'
import type { Order, OrderStatus, Profile } from '@/lib/types/database.types'
import { assignOrderAction } from '@/app/admin/actions'

type AdminOrder = Order & {
  profiles: { full_name: string; email: string } | null
  assigned_profile?: { full_name: string; email: string } | null
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
              <th className="px-4 py-3" />
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
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-1 rounded-xl bg-[#184043] px-3 py-1.5 font-inter text-xs font-medium text-white hover:bg-[#102d30] transition-all shadow-xs"
                    >
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
