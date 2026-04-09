'use client'

import { useState, useTransition } from 'react'
import { STATUS_LABELS } from '@/lib/types/order.types'
import { OrderStatusBadge } from '@/components/dashboard/OrderStatusBadge'
import type { OrderStatus } from '@/lib/types/database.types'

const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['in_progress', 'cancelled'],
  in_progress: ['delivered', 'cancelled'],
  revision: ['in_progress', 'cancelled'],
  delivered: ['completed', 'revision', 'cancelled'],
  completed: [],
  cancelled: [],
}

interface StatusDropdownProps {
  orderId: string
  currentStatus: OrderStatus
  onUpdate: (orderId: string, newStatus: OrderStatus) => Promise<{ error?: string }>
}

export function StatusDropdown({ orderId, currentStatus, onUpdate }: StatusDropdownProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const available = TRANSITIONS[currentStatus]

  function handleChange(newStatus: OrderStatus) {
    setOpen(false)
    startTransition(async () => {
      const result = await onUpdate(orderId, newStatus)
      if (result?.error) setError(result.error)
      else setError(null)
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <OrderStatusBadge status={currentStatus} />
        {available.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              disabled={isPending}
              className="rounded-lg border border-black/15 bg-white px-3 py-1.5 font-inter text-xs font-medium text-[#184043] transition-colors hover:bg-[#184043]/5 disabled:opacity-50"
            >
              {isPending ? 'Updating…' : 'Change status ▾'}
            </button>
            {open && (
              <div className="absolute top-full left-0 mt-1 z-20 min-w-[160px] rounded-xl border border-black/10 bg-white shadow-lg overflow-hidden">
                {available.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleChange(s)}
                    className="w-full px-4 py-2.5 text-left font-inter text-sm text-[#1d2433] hover:bg-[#184043]/5 transition-colors"
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {error && <p className="font-inter text-xs text-red-500">{error}</p>}
    </div>
  )
}
