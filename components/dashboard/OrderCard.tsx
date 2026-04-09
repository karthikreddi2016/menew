import Link from 'next/link'
import { OrderStatusBadge } from './OrderStatusBadge'
import { SERVICE_CONFIG } from '@/lib/types/order.types'
import type { Order } from '@/lib/types/database.types'

type OrderCardOrder = Pick<Order, 'id' | 'service_type' | 'title' | 'status' | 'created_at'>

export function OrderCard({ order }: { order: OrderCardOrder }) {
  const service = SERVICE_CONFIG[order.service_type]
  const created = new Date(order.created_at)
  const timeAgo = formatRelative(created)

  return (
    <Link
      href={`/dashboard/orders/${order.id}`}
      className="flex items-start gap-4 rounded-xl border border-black/10 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#184043]/8 overflow-hidden">
        <img src={service.image} alt={service.label} className="h-full w-full object-cover opacity-80" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-inter font-medium text-sm text-[#1d2433] truncate">{order.title}</p>
          <OrderStatusBadge status={order.status} />
        </div>
        <p className="mt-0.5 font-inter text-xs text-black/50">{service.label}</p>
        <p className="mt-1 font-inter text-xs text-black/40">{timeAgo}</p>
      </div>
    </Link>
  )
}

function formatRelative(date: Date) {
  const diffMs = Date.now() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 30) return `${diffDays}d ago`
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
