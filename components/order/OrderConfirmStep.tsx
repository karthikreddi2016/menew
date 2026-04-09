'use client'

import { SERVICE_CONFIG } from '@/lib/types/order.types'
import type { ServiceType } from '@/lib/types/database.types'

interface OrderConfirmStepProps {
  serviceType: ServiceType
  title: string
  brief: string
  deadlinePref: string
  customDeadline: string
  files: File[]
}

export function OrderConfirmStep({
  serviceType,
  title,
  brief,
  deadlinePref,
  customDeadline,
  files,
}: OrderConfirmStepProps) {
  const service = SERVICE_CONFIG[serviceType]

  const deadlineLabel =
    deadlinePref === 'custom' && customDeadline
      ? new Date(customDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      : deadlinePref === 'asap'
      ? 'ASAP'
      : deadlinePref === '24h'
      ? 'Within 24 hours'
      : deadlinePref === '48h'
      ? 'Within 48 hours'
      : deadlinePref === '72h'
      ? 'Within 72 hours'
      : 'Not specified'

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-black/10 bg-white overflow-hidden">
        <div className="bg-[#184043]/5 px-5 py-4 border-b border-black/10">
          <p className="font-serif text-lg text-[#184043]">Order Summary</p>
        </div>

        <div className="flex flex-col divide-y divide-black/8">
          <Row label="Service" value={service.label} />
          <Row label="Delivery" value={service.deliveryTag} />
          <Row label="Order Title" value={title} />
          <Row label="Deadline" value={deadlineLabel} />
          <div className="flex gap-4 px-5 py-4">
            <p className="w-32 shrink-0 font-inter text-sm font-medium text-black/50">Brief</p>
            <p className="font-inter text-sm text-[#1d2433] whitespace-pre-wrap">{brief}</p>
          </div>
          {files.length > 0 && (
            <div className="flex gap-4 px-5 py-4">
              <p className="w-32 shrink-0 font-inter text-sm font-medium text-black/50">Files</p>
              <ul className="flex flex-col gap-1">
                {files.map((f, i) => (
                  <li key={i} className="font-inter text-sm text-[#1d2433]">{f.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <p className="font-inter text-sm text-black/50 text-center">
        After submitting, our team will review your order and get started within the specified timeframe.
      </p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 px-5 py-4">
      <p className="w-32 shrink-0 font-inter text-sm font-medium text-black/50">{label}</p>
      <p className="font-inter text-sm text-[#1d2433]">{value}</p>
    </div>
  )
}
