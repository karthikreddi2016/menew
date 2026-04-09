'use client'

import { useState } from 'react'
import Link from 'next/link'
import { OrderStatusBadge } from '@/components/dashboard/OrderStatusBadge'
import { SERVICE_CONFIG } from '@/lib/types/order.types'
import type { Order, OrderStatus } from '@/lib/types/database.types'

type AdminOrder = Order & {
  profiles: { full_name: string; email: string } | null
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

export function OrderTable({ orders }: { orders: AdminOrder[] }) {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  return (
    <div className="flex flex-col gap-4">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full border px-3 py-1.5 font-inter text-xs transition-colors ${
              filter === f.value
                ? 'border-[#184043] bg-[#184043] text-white'
                : 'border-black/20 bg-white text-[#1d2433] hover:border-[#184043]/50'
            }`}
          >
            {f.label}
            {f.value !== 'all' && (
              <span className="ml-1.5 text-current/60">
                ({orders.filter((o) => o.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/8 bg-black/2">
              <th className="px-4 py-3 text-left font-inter text-xs font-semibold text-black/40">Customer</th>
              <th className="px-4 py-3 text-left font-inter text-xs font-semibold text-black/40">Service</th>
              <th className="px-4 py-3 text-left font-inter text-xs font-semibold text-black/40">Order Title</th>
              <th className="px-4 py-3 text-left font-inter text-xs font-semibold text-black/40">Status</th>
              <th className="px-4 py-3 text-left font-inter text-xs font-semibold text-black/40">Deadline</th>
              <th className="px-4 py-3 text-left font-inter text-xs font-semibold text-black/40">Created</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center font-inter text-sm text-black/40">
                  No orders found.
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id} className="hover:bg-black/2 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-inter text-sm font-medium text-[#1d2433]">{order.profiles?.full_name ?? '—'}</p>
                    <p className="font-inter text-xs text-black/40">{order.profiles?.email ?? '—'}</p>
                  </td>
                  <td className="px-4 py-3 font-inter text-sm text-[#1d2433]">
                    {SERVICE_CONFIG[order.service_type]?.label ?? order.service_type}
                  </td>
                  <td className="px-4 py-3 font-inter text-sm text-[#1d2433] max-w-[200px] truncate">
                    {order.title}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 font-inter text-sm text-black/50">
                    {order.deadline_pref ?? '—'}
                  </td>
                  <td className="px-4 py-3 font-inter text-xs text-black/40">
                    {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="rounded-lg bg-[#184043]/8 px-3 py-1.5 font-inter text-xs font-medium text-[#184043] hover:bg-[#184043]/15 transition-colors whitespace-nowrap"
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
