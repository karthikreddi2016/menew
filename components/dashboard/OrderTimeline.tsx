'use client'

import type { OrderStatus } from '@/lib/types/database.types'

interface StepItem {
  id: OrderStatus | 'draft_sent' | 'final_draft'
  title: string
  subtitle: string
  defaultDateOffset: number // days from order date
}

const TRACKING_STEPS: StepItem[] = [
  {
    id: 'pending',
    title: 'Order Placed',
    subtitle: 'Payment successfully initiated by you',
    defaultDateOffset: 0,
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    subtitle: 'Designer assigned to your project',
    defaultDateOffset: 0,
  },
  {
    id: 'draft_sent',
    title: 'Draft Sent to Mail',
    subtitle: 'Initial draft shared via email',
    defaultDateOffset: 1,
  },
  {
    id: 'revision',
    title: 'Revision Requested',
    subtitle: 'Changes are in progress.',
    defaultDateOffset: 1,
  },
  {
    id: 'final_draft',
    title: 'Final Draft Sent',
    subtitle: 'Final design delivered on mail',
    defaultDateOffset: 2,
  },
  {
    id: 'completed',
    title: 'Completed',
    subtitle: 'Project successfully completed',
    defaultDateOffset: 3,
  },
]

export function OrderTimeline({
  status,
  createdDate = new Date().toISOString(),
}: {
  status: OrderStatus
  createdDate?: string
}) {
  const isCancelled = status === 'cancelled'
  const isRevision = status === 'revision'

  // Map status to current completed step index
  let activeStepIndex = 0
  if (status === 'pending') activeStepIndex = 0
  else if (status === 'in_progress') activeStepIndex = 1
  else if (status === 'delivered') activeStepIndex = 4
  else if (status === 'revision') activeStepIndex = 3
  else if (status === 'completed') activeStepIndex = 5

  // Filter steps: hide Revision step if not in revision flow
  const visibleSteps = TRACKING_STEPS.filter(
    (step) => step.id !== 'revision' || isRevision
  )

  const orderDateObj = new Date(createdDate)

  return (
    <div className="bg-white rounded-[20px] border border-[#EDEDED] p-6 sm:p-8 shadow-xs">
      <h2 className="font-inter text-[18px] font-bold text-[#111827] mb-6">
        Order Progress
      </h2>

      {isCancelled ? (
        <div className="flex items-center gap-3 rounded-[12px] bg-red-50 p-4 border border-red-200">
          <div className="h-3.5 w-3.5 rounded-full bg-red-500 shrink-0" />
          <p className="font-inter text-sm font-medium text-red-700">Order Cancelled</p>
        </div>
      ) : (
        <div className="space-y-6 relative">
          {visibleSteps.map((step, idx) => {
            const isPassed = idx <= activeStepIndex
            const stepDate = new Date(orderDateObj)
            stepDate.setDate(stepDate.getDate() + step.defaultDateOffset)

            const formattedDate = stepDate.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })

            const isLast = idx === visibleSteps.length - 1

            return (
              <div key={step.id} className="relative flex items-start gap-4">
                {/* Vertical connecting line */}
                {!isLast && (
                  <div
                    className={`absolute left-[13px] top-[26px] bottom-[-26px] w-[2px] transition-colors ${
                      idx < activeStepIndex ? 'bg-[#10B981]' : 'bg-[#E5E7EB]'
                    }`}
                  />
                )}

                {/* Circle Icon */}
                <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                  {isPassed ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-white shadow-2xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-[#D1D5DB] bg-white" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className={`font-inter text-[15px] font-semibold ${isPassed ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>
                      {step.title}
                    </h3>
                    <p className={`font-inter text-[13px] mt-0.5 ${isPassed ? 'text-[#6F6F6F]' : 'text-[#D1D5DB]'}`}>
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Right-aligned Date */}
                  <span className={`font-inter text-[12px] shrink-0 ${isPassed ? 'text-[#6F6F6F]' : 'text-[#D1D5DB]'}`}>
                    {formattedDate}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
