'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SERVICE_CONFIG } from '@/lib/types/order.types'
import type { OrderFile, ServiceType } from '@/lib/types/database.types'
import { toggleCreativeShowcaseAction } from '@/app/admin/actions'

export type CreativeItem = OrderFile & {
  signedUrl?: string
  orders: {
    id: string
    title: string
    service_type: ServiceType
    creative_showcase: boolean | null
    profiles: { full_name: string } | null
  } | null
}

export function CreativesManager({ items }: { items: CreativeItem[] }) {
  const [roleFilter, setRoleFilter] = useState<'all' | 'deliverable' | 'reference'>('deliverable')
  const [serviceFilter, setServiceFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const filtered = items.filter((item) => {
    const matchesRole = roleFilter === 'all' || item.file_role === roleFilter
    const matchesService = serviceFilter === 'all' || item.orders?.service_type === serviceFilter
    const matchesSearch =
      !search.trim() ||
      item.file_name.toLowerCase().includes(search.toLowerCase()) ||
      item.orders?.title.toLowerCase().includes(search.toLowerCase()) ||
      item.orders?.profiles?.full_name.toLowerCase().includes(search.toLowerCase())
    return matchesRole && matchesService && matchesSearch
  })

  async function handleToggleShowcase(orderId: string, currentVal: boolean) {
    setTogglingId(orderId)
    await toggleCreativeShowcaseAction(orderId, !currentVal)
    setTogglingId(null)
  }

  function formatBytes(bytes: number | null) {
    if (!bytes) return '—'
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  function isImage(mime: string | null, path: string) {
    if (mime?.startsWith('image/')) return true
    const ext = path.split('.').pop()?.toLowerCase()
    return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext || '')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white p-4 rounded-2xl border border-black/10 shadow-xs">
        {/* Role Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRoleFilter('deliverable')}
            className={`px-3.5 py-1.5 rounded-xl font-inter text-xs font-medium transition-all ${
              roleFilter === 'deliverable'
                ? 'bg-[#2952E1] text-white shadow-xs'
                : 'bg-black/5 text-[#1d2433] hover:bg-black/10'
            }`}
          >
            Deliverables ({items.filter((i) => i.file_role === 'deliverable').length})
          </button>
          <button
            onClick={() => setRoleFilter('reference')}
            className={`px-3.5 py-1.5 rounded-xl font-inter text-xs font-medium transition-all ${
              roleFilter === 'reference'
                ? 'bg-[#2952E1] text-white shadow-xs'
                : 'bg-black/5 text-[#1d2433] hover:bg-black/10'
            }`}
          >
            Client References ({items.filter((i) => i.file_role === 'reference').length})
          </button>
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl font-inter text-xs font-medium transition-all ${
              roleFilter === 'all'
                ? 'bg-[#184043] text-white shadow-xs'
                : 'bg-black/5 text-[#1d2433] hover:bg-black/10'
            }`}
          >
            All Files ({items.length})
          </button>
        </div>

        {/* Service Select & Search */}
        <div className="flex items-center gap-3">
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="rounded-xl border border-black/15 bg-white px-3 py-2 font-inter text-xs text-[#1d2433] outline-none focus:border-[#2952E1]"
          >
            <option value="all">All Services</option>
            {Object.entries(SERVICE_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search assets or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-56 rounded-xl border border-black/15 bg-white px-3 py-2 font-inter text-xs text-[#1d2433] outline-none focus:border-[#2952E1]"
          />
        </div>
      </div>

      {/* Assets Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-black/10 bg-white p-12 text-center">
          <span className="text-4xl mb-3 block">🎨</span>
          <h3 className="font-serif text-lg text-[#1d2433]">No creative assets found</h3>
          <p className="font-inter text-xs text-black/40 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or filters. Deliverables uploaded to completed orders will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((item) => {
            const hasShowcase = !!item.orders?.creative_showcase
            const isImg = isImage(item.mime_type, item.file_name)
            const serviceObj = item.orders?.service_type ? SERVICE_CONFIG[item.orders.service_type] : null

            return (
              <div
                key={item.id}
                className="group relative rounded-2xl border border-black/10 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Media Preview Box */}
                <div className="relative h-44 w-full bg-slate-100 flex items-center justify-center overflow-hidden border-b border-black/5">
                  {isImg && item.signedUrl ? (
                    <img
                      src={item.signedUrl}
                      alt={item.file_name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 p-4 text-center">
                      <span className="text-3xl">📄</span>
                      <span className="font-inter text-[11px] text-black/50 truncate max-w-[180px]">
                        {item.file_name}
                      </span>
                    </div>
                  )}

                  {/* Role Badge */}
                  <span
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full font-inter text-[10px] font-semibold tracking-wider uppercase shadow-xs ${
                      item.file_role === 'deliverable'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {item.file_role}
                  </span>

                  {/* Showcase Star Badge */}
                  {hasShowcase && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-inter text-[10px] font-bold shadow-xs flex items-center gap-1">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* Info Container */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <p className="font-inter text-xs font-semibold text-[#1d2433] truncate" title={item.file_name}>
                      {item.file_name}
                    </p>
                    <p className="font-inter text-[11px] text-black/50 mt-0.5 truncate">
                      {item.orders?.title || 'Order Asset'}
                    </p>
                    <p className="font-inter text-[10px] text-black/40 mt-1">
                      Client: {item.orders?.profiles?.full_name || 'Client'} &bull; {formatBytes(item.file_size)}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black/5 flex items-center justify-between gap-2">
                    {serviceObj && (
                      <span className="font-inter text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {serviceObj.label}
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 ml-auto">
                      {item.orders?.id && (
                        <button
                          disabled={togglingId === item.orders.id}
                          onClick={() => handleToggleShowcase(item.orders!.id, hasShowcase)}
                          title={hasShowcase ? 'Remove from Showcase' : 'Feature in Showcase'}
                          className={`p-1.5 rounded-lg font-inter text-xs transition-colors ${
                            hasShowcase
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          ⭐
                        </button>
                      )}

                      {item.signedUrl && (
                        <a
                          href={item.signedUrl}
                          download={item.file_name}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-[#2952E1] text-white font-inter text-[11px] font-medium hover:bg-[#1e42c7] transition-colors"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
