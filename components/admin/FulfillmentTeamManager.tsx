'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SERVICE_CONFIG } from '@/lib/types/order.types'
import type { Order, Profile, UserRole } from '@/lib/types/database.types'
import { assignOrderAction, updateUserRoleAction } from '@/app/admin/actions'

export type TeamMember = Profile & {
  active_orders: Order[]
  completed_count: number
}

export type UnassignedOrder = Order & {
  profiles: { full_name: string; email: string } | null
}

export function FulfillmentTeamManager({
  team,
  unassignedOrders,
}: {
  team: TeamMember[]
  unassignedOrders: UnassignedOrder[]
}) {
  const [assigningId, setAssigningId] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<Record<string, string>>({})

  async function handleAssign(orderId: string) {
    const memberId = selectedMember[orderId]
    if (!memberId) return
    setAssigningId(orderId)
    await assignOrderAction(orderId, memberId)
    setAssigningId(null)
  }

  function getCapacityBadge(activeCount: number) {
    if (activeCount === 0) {
      return <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-inter text-xs font-semibold">Available</span>
    }
    if (activeCount <= 3) {
      return <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-inter text-xs font-semibold">Moderate Load ({activeCount})</span>
    }
    return <span className="bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full font-inter text-xs font-semibold">High Capacity ({activeCount})</span>
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Unassigned Orders Alert Banner & Queue */}
      {unassignedOrders.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 flex flex-col gap-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-amber-200 text-amber-900 text-lg">⚠️</span>
              <div>
                <h3 className="font-serif text-lg text-amber-950 font-medium">Unassigned Orders Queue</h3>
                <p className="font-inter text-xs text-amber-800">
                  {unassignedOrders.length} order request(s) require a fulfillment team member assignment.
                </p>
              </div>
            </div>
            <span className="font-inter text-xs font-bold text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full">
              Action Required
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-1">
            {unassignedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl p-4 border border-amber-200 shadow-xs flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-inter text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {SERVICE_CONFIG[order.service_type]?.label ?? order.service_type}
                    </span>
                    <span className="font-inter text-[10px] text-black/40">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className="font-inter text-sm font-semibold text-[#1d2433]">{order.title}</p>
                  <p className="font-inter text-xs text-black/50 mt-0.5">
                    Client: {order.profiles?.full_name ?? '—'}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-black/5">
                  <select
                    value={selectedMember[order.id] || ''}
                    onChange={(e) => setSelectedMember({ ...selectedMember, [order.id]: e.target.value })}
                    className="flex-1 rounded-lg border border-black/15 bg-white px-2 py-1.5 font-inter text-xs text-[#1d2433] outline-none"
                  >
                    <option value="">-- Choose Editor --</option>
                    {team.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.full_name} ({m.active_orders.length} active)
                      </option>
                    ))}
                  </select>
                  <button
                    disabled={!selectedMember[order.id] || assigningId === order.id}
                    onClick={() => handleAssign(order.id)}
                    className="rounded-lg bg-[#2952E1] px-3 py-1.5 font-inter text-xs font-semibold text-white hover:bg-[#1e42c7] disabled:opacity-40 transition-colors"
                  >
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Roster Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#1d2433]">Fulfillment Team Workload</h2>
            <p className="font-inter text-xs text-black/50 mt-0.5">
              Current active workload distribution across editors and team members.
            </p>
          </div>
          <Link
            href="/admin/users"
            className="rounded-xl bg-[#184043] px-3.5 py-2 font-inter text-xs font-medium text-white hover:bg-[#102d30] transition-colors"
          >
            + Add / Manage Team Members
          </Link>
        </div>

        {team.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white p-12 text-center">
            <span className="text-4xl mb-3 block">⚡</span>
            <h3 className="font-serif text-lg text-[#1d2433]">No fulfillment team members assigned</h3>
            <p className="font-inter text-xs text-black/40 mt-1 max-w-sm mx-auto">
              Go to the Users tab to change user roles to &quot;Fulfillment Editor&quot; or &quot;Admin&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between gap-4 hover:shadow-md transition-all"
              >
                {/* Team Member Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#184043] text-white font-inter text-sm font-bold flex items-center justify-center">
                      {member.full_name?.charAt(0)?.toUpperCase() || 'E'}
                    </div>
                    <div>
                      <p className="font-inter text-sm font-semibold text-[#1d2433]">{member.full_name}</p>
                      <p className="font-inter text-xs text-black/40">{member.email}</p>
                      <span className="inline-block font-inter text-[10px] uppercase font-bold text-purple-700 mt-0.5">
                        Role: {member.role}
                      </span>
                    </div>
                  </div>
                  {getCapacityBadge(member.active_orders.length)}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-black/5 text-center">
                  <div>
                    <span className="font-inter text-[10px] text-black/40 uppercase font-semibold">Active Tasks</span>
                    <p className="font-serif text-xl font-bold text-[#1d2433]">{member.active_orders.length}</p>
                  </div>
                  <div>
                    <span className="font-inter text-[10px] text-black/40 uppercase font-semibold">Completed</span>
                    <p className="font-serif text-xl font-bold text-emerald-700">{member.completed_count}</p>
                  </div>
                </div>

                {/* Active Orders List */}
                <div className="flex flex-col gap-2">
                  <p className="font-inter text-xs font-semibold text-[#1d2433]">Current Active Assignments</p>
                  {member.active_orders.length === 0 ? (
                    <p className="font-inter text-xs text-black/40 italic">No active orders assigned.</p>
                  ) : (
                    <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                      {member.active_orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-black/3 hover:bg-black/5 transition-colors text-xs"
                        >
                          <div className="min-w-0 flex-1 pr-2">
                            <p className="font-inter font-medium text-[#1d2433] truncate">{ord.title}</p>
                            <p className="font-inter text-[10px] text-black/40 capitalize">
                              {ord.status.replace('_', ' ')}
                            </p>
                          </div>
                          <Link
                            href={`/admin/orders/${ord.id}`}
                            className="font-inter text-[11px] font-medium text-[#2952E1] hover:underline whitespace-nowrap"
                          >
                            View →
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
