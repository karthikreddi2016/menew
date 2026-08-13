'use client'

import { useState } from 'react'
import type { PaymentStatus } from '@/lib/types/database.types'
import { assignOrderAction, updateOrderPaymentAction, toggleCreativeShowcaseAction } from '@/app/admin/actions'

export function OrderAdminActions({
  orderId,
  currentAmount,
  currentPaymentStatus,
  currentAssignedId,
  currentShowcase,
  teamMembers,
}: {
  orderId: string
  currentAmount: number
  currentPaymentStatus: PaymentStatus
  currentAssignedId: string | null
  currentShowcase: boolean
  teamMembers: { id: string; full_name: string; role: string }[]
}) {
  const [amount, setAmount] = useState<number>(currentAmount || 0)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(currentPaymentStatus || 'unpaid')
  const [assignedId, setAssignedId] = useState<string>(currentAssignedId || '')
  const [showcase, setShowcase] = useState<boolean>(!!currentShowcase)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSavePayment(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMsg(null)
    const res = await updateOrderPaymentAction(orderId, amount, paymentStatus)
    setLoading(false)
    if (res.error) {
      setMsg({ type: 'error', text: res.error })
    } else {
      setMsg({ type: 'success', text: 'Payment details updated!' })
    }
  }

  async function handleAssign(newAssignedId: string) {
    setAssignedId(newAssignedId)
    setLoading(true)
    setMsg(null)
    const res = await assignOrderAction(orderId, newAssignedId || null)
    setLoading(false)
    if (res.error) {
      setMsg({ type: 'error', text: res.error })
    } else {
      setMsg({ type: 'success', text: 'Assigned team member updated!' })
    }
  }

  async function handleShowcaseToggle(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.checked
    setShowcase(val)
    const res = await toggleCreativeShowcaseAction(orderId, val)
    if (res.error) {
      setMsg({ type: 'error', text: res.error })
    } else {
      setMsg({ type: 'success', text: val ? 'Added to Creatives showcase!' : 'Removed from showcase' })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {msg && (
        <div
          className={`p-3 rounded-xl font-inter text-xs ${
            msg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Team Member Assignment */}
      <div className="rounded-2xl border border-black/10 bg-white p-5 flex flex-col gap-3">
        <p className="font-inter text-sm font-semibold text-[#1d2433]">Fulfillment Assignment</p>
        <label className="font-inter text-xs text-black/50">Assigned Team Member</label>
        <select
          value={assignedId}
          disabled={loading}
          onChange={(e) => handleAssign(e.target.value)}
          className="rounded-xl border border-black/15 bg-white px-3 py-2 font-inter text-xs text-[#1d2433] focus:border-[#2952E1] outline-none"
        >
          <option value="">-- Unassigned --</option>
          {teamMembers.map((tm) => (
            <option key={tm.id} value={tm.id}>
              {tm.full_name} ({tm.role})
            </option>
          ))}
        </select>
      </div>

      {/* Payment & Quote Management */}
      <div className="rounded-2xl border border-black/10 bg-white p-5">
        <p className="font-inter text-sm font-semibold text-[#1d2433] mb-3">Payment & Quote</p>
        <form onSubmit={handleSavePayment} className="flex flex-col gap-3">
          <div>
            <label className="font-inter text-xs text-black/50 block mb-1">Amount (₹)</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 font-inter text-xs text-[#1d2433] focus:border-[#2952E1] outline-none"
            />
          </div>

          <div>
            <label className="font-inter text-xs text-black/50 block mb-1">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
              className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 font-inter text-xs text-[#1d2433] focus:border-[#2952E1] outline-none"
            >
              <option value="unpaid">Unpaid / Pending</option>
              <option value="paid">Paid</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-xl bg-[#2952E1] px-4 py-2 font-inter text-xs font-semibold text-white hover:bg-[#1e42c7] transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Payment Info'}
          </button>
        </form>
      </div>

      {/* Showcase Feature Toggle */}
      <div className="rounded-2xl border border-black/10 bg-white p-5 flex items-center justify-between">
        <div>
          <p className="font-inter text-sm font-semibold text-[#1d2433]">Highlight in Showcase</p>
          <p className="font-inter text-xs text-black/40">Show deliverable in Creatives manager</p>
        </div>
        <input
          type="checkbox"
          checked={showcase}
          onChange={handleShowcaseToggle}
          className="w-4 h-4 rounded text-[#2952E1] focus:ring-[#2952E1] cursor-pointer"
        />
      </div>
    </div>
  )
}
