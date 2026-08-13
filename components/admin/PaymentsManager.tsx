'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SERVICE_CONFIG } from '@/lib/types/order.types'
import type { Order, PaymentStatus } from '@/lib/types/database.types'
import { updateOrderPaymentAction } from '@/app/admin/actions'

export type PaymentOrderItem = Order & {
  profiles: { full_name: string; email: string } | null
}

export function PaymentsManager({ orders }: { orders: PaymentOrderItem[] }) {
  const [filter, setFilter] = useState<'all' | PaymentStatus>('all')
  const [search, setSearch] = useState('')
  const [editingOrder, setEditingOrder] = useState<PaymentOrderItem | null>(null)
  const [editAmount, setEditAmount] = useState<number>(0)
  const [editStatus, setEditStatus] = useState<PaymentStatus>('unpaid')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const filtered = orders.filter((o) => {
    const status = o.payment_status || 'unpaid'
    const matchesFilter = filter === 'all' || status === filter
    const matchesSearch =
      !search.trim() ||
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.profiles?.full_name.toLowerCase().includes(search.toLowerCase()) ||
      o.profiles?.email.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  function startEdit(o: PaymentOrderItem) {
    setEditingOrder(o)
    setEditAmount(o.amount || 0)
    setEditStatus(o.payment_status || 'unpaid')
  }

  async function handleSavePayment(e: React.FormEvent) {
    e.preventDefault()
    if (!editingOrder) return
    setSaving(true)
    setMsg(null)
    const res = await updateOrderPaymentAction(editingOrder.id, editAmount, editStatus)
    setSaving(false)
    if (res.error) {
      setMsg({ type: 'error', text: res.error })
    } else {
      setMsg({ type: 'success', text: `Payment details updated for order #${editingOrder.id.slice(0, 8)}!` })
      setEditingOrder(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {msg && (
        <div
          className={`p-4 rounded-xl font-inter text-xs ${
            msg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white p-4 rounded-2xl border border-black/10 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl font-inter text-xs font-medium transition-all ${
              filter === 'all'
                ? 'bg-[#184043] text-white shadow-xs'
                : 'bg-black/5 text-[#1d2433] hover:bg-black/10'
            }`}
          >
            All Payment Records ({orders.length})
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-3.5 py-1.5 rounded-xl font-inter text-xs font-medium transition-all ${
              filter === 'paid'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-black/5 text-[#1d2433] hover:bg-black/10'
            }`}
          >
            Paid ({orders.filter((o) => o.payment_status === 'paid').length})
          </button>
          <button
            onClick={() => setFilter('unpaid')}
            className={`px-3.5 py-1.5 rounded-xl font-inter text-xs font-medium transition-all ${
              filter === 'unpaid'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-black/5 text-[#1d2433] hover:bg-black/10'
            }`}
          >
            Pending / Unpaid ({orders.filter((o) => !o.payment_status || o.payment_status === 'unpaid').length})
          </button>
          <button
            onClick={() => setFilter('refunded')}
            className={`px-3.5 py-1.5 rounded-xl font-inter text-xs font-medium transition-all ${
              filter === 'refunded'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-black/5 text-[#1d2433] hover:bg-black/10'
            }`}
          >
            Refunded ({orders.filter((o) => o.payment_status === 'refunded').length})
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by client or order title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 rounded-xl border border-black/15 bg-white px-3.5 py-2 font-inter text-xs text-[#1d2433] outline-none focus:border-[#2952E1]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/8 bg-[#fbf6ef]/40">
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Order & Customer</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Service</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Order Status</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center font-inter text-sm text-black/40">
                  No payment records found matching filter.
                </td>
              </tr>
            ) : (
              filtered.map((order) => {
                const status = order.payment_status || 'unpaid'
                return (
                  <tr key={order.id} className="hover:bg-black/2 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-inter text-sm font-semibold text-[#1d2433]">{order.title}</p>
                      <p className="font-inter text-xs text-black/50">
                        {order.profiles?.full_name ?? '—'} ({order.profiles?.email ?? '—'})
                      </p>
                    </td>

                    <td className="px-4 py-3 font-inter text-xs text-black/70">
                      {SERVICE_CONFIG[order.service_type]?.label ?? order.service_type}
                    </td>

                    <td className="px-4 py-3 font-inter text-sm font-bold text-[#1d2433]">
                      {order.amount && order.amount > 0 ? `₹${order.amount.toLocaleString('en-IN')}` : '₹0 (Pending Quote)'}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 font-inter text-xs font-semibold uppercase tracking-wide ${
                          status === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : status === 'refunded'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-4 py-3 font-inter text-xs text-black/60 capitalize">
                      {order.status.replace('_', ' ')}
                    </td>

                    <td className="px-4 py-3 font-inter text-xs text-black/40 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => startEdit(order)}
                        className="rounded-xl border border-black/15 bg-white px-3 py-1.5 font-inter text-xs font-medium text-[#184043] hover:bg-[#184043] hover:text-white transition-colors"
                      >
                        Edit Quote / Status
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Payment Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-black/10 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <div>
                <h3 className="font-serif text-lg text-[#1d2433]">Edit Payment & Quote</h3>
                <p className="font-inter text-xs text-black/40">Order #{editingOrder.id.slice(0, 8)}</p>
              </div>
              <button
                onClick={() => setEditingOrder(null)}
                className="text-black/40 hover:text-black font-inter text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePayment} className="flex flex-col gap-4">
              <div>
                <label className="font-inter text-xs font-medium text-black/60 block mb-1">
                  Order Request Title
                </label>
                <p className="font-inter text-sm text-[#1d2433] bg-slate-50 p-2.5 rounded-xl border border-black/5">
                  {editingOrder.title}
                </p>
              </div>

              <div>
                <label className="font-inter text-xs font-medium text-black/60 block mb-1">
                  Quote Amount (₹ INR)
                </label>
                <input
                  type="number"
                  min="0"
                  value={editAmount}
                  onChange={(e) => setEditAmount(Number(e.target.value))}
                  className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 font-inter text-sm text-[#1d2433] focus:border-[#2952E1] outline-none"
                  placeholder="e.g. 2500"
                />
              </div>

              <div>
                <label className="font-inter text-xs font-medium text-black/60 block mb-1">
                  Payment Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as PaymentStatus)}
                  className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 font-inter text-sm text-[#1d2433] focus:border-[#2952E1] outline-none"
                >
                  <option value="unpaid">Unpaid / Pending Quote</option>
                  <option value="paid">Paid</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="rounded-xl px-4 py-2 font-inter text-xs font-medium text-black/60 hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#2952E1] px-5 py-2 font-inter text-xs font-semibold text-white hover:bg-[#1e42c7] transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Update Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
