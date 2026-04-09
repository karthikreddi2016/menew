import { STATUS_LABELS } from '@/lib/types/order.types'
import type { OrderStatus } from '@/lib/types/database.types'

const FLOW: OrderStatus[] = ['pending', 'in_progress', 'delivered', 'completed']

export function OrderTimeline({ status }: { status: OrderStatus }) {
  const isCancelled = status === 'cancelled'
  const isRevision = status === 'revision'

  const currentIndex = isCancelled
    ? -1
    : isRevision
    ? FLOW.indexOf('in_progress') // show as in-progress branch
    : FLOW.indexOf(status)

  return (
    <div className="flex flex-col gap-0">
      {isCancelled ? (
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-gray-400 shrink-0" />
          <p className="font-inter text-sm text-gray-500">Order Cancelled</p>
        </div>
      ) : (
        FLOW.map((s, i) => {
          const isPast = i < currentIndex
          const isCurrent = i === currentIndex || (isRevision && s === 'in_progress')
          const label = s === 'in_progress' && isRevision ? STATUS_LABELS['revision'] : STATUS_LABELS[s]

          return (
            <div key={s} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isPast || isCurrent
                      ? 'border-[#184043] bg-[#184043]'
                      : 'border-black/20 bg-white'
                  }`}
                >
                  {(isPast || isCurrent) && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
                {i < FLOW.length - 1 && (
                  <div className={`w-0.5 h-6 transition-colors ${isPast ? 'bg-[#184043]' : 'bg-black/10'}`} />
                )}
              </div>
              <div className="pb-2 pt-1">
                <p className={`font-inter text-sm ${isCurrent ? 'font-semibold text-[#184043]' : isPast ? 'text-[#1d2433]' : 'text-black/40'}`}>
                  {label}
                </p>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
