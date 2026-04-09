'use client'

import Image from 'next/image'
import { SERVICE_CONFIG } from '@/lib/types/order.types'
import type { ServiceType } from '@/lib/types/database.types'

interface ServiceSelectorProps {
  selected: ServiceType | null
  onSelect: (service: ServiceType) => void
}

export function ServiceSelector({ selected, onSelect }: ServiceSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {(Object.values(SERVICE_CONFIG) as typeof SERVICE_CONFIG[ServiceType][]).map((service) => (
        <button
          key={service.slug}
          type="button"
          onClick={() => onSelect(service.slug)}
          className={`flex flex-col overflow-hidden rounded-xl border-2 bg-white text-left transition-all hover:shadow-md ${
            selected === service.slug
              ? 'border-[#184043] shadow-md'
              : 'border-black/10'
          }`}
        >
          <div className="relative h-[140px] w-full overflow-hidden">
            <Image src={service.image} alt={service.label} fill className="object-cover" />
            {selected === service.slug && (
              <div className="absolute inset-0 bg-[#184043]/10 flex items-center justify-center">
                <div className="rounded-full bg-[#184043] p-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 p-3">
            <p className="font-serif text-base leading-snug text-[#1d2433]">{service.label}</p>
            <p className="font-sans text-sm text-black/60">{service.description}</p>
            <span className="mt-1 inline-flex w-fit items-center rounded border border-[#ffae45] bg-[#ffe6c5] px-2 py-0.5 text-xs text-black/70">
              {service.deliveryTag}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
