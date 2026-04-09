import { STATUS_COLORS, STATUS_LABELS } from '@/lib/types/order.types'
import type { OrderStatus } from '@/lib/types/database.types'

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 font-inter text-xs font-medium ${STATUS_COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}
