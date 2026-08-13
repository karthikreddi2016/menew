'use client'

import { useState } from 'react'
import type { Profile, UserRole } from '@/lib/types/database.types'
import { updateUserRoleAction } from '@/app/admin/actions'

export type UserItem = Profile & {
  order_count?: number
}

const ROLE_OPTIONS: { label: string; value: UserRole; badgeClass: string }[] = [
  { label: 'Customer', value: 'customer', badgeClass: 'bg-slate-100 text-slate-800' },
  { label: 'Fulfillment Editor', value: 'editor', badgeClass: 'bg-purple-100 text-purple-800 font-semibold' },
  { label: 'Admin', value: 'admin', badgeClass: 'bg-amber-100 text-amber-900 font-bold' },
]

export function UsersManager({ users, currentUserId }: { users: UserItem[]; currentUserId: string }) {
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all')
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const filtered = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter
    const matchesSearch =
      !search.trim() ||
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.phone && u.phone.includes(search))
    return matchesRole && matchesSearch
  })

  async function handleRoleChange(targetUserId: string, newRole: UserRole) {
    if (targetUserId === currentUserId) {
      if (!confirm('Are you sure you want to change your own Admin role?')) return
    }
    setUpdatingId(targetUserId)
    setMsg(null)
    const res = await updateUserRoleAction(targetUserId, newRole)
    setUpdatingId(null)
    if (res.error) {
      setMsg({ type: 'error', text: res.error })
    } else {
      setMsg({ type: 'success', text: `Updated user role to ${newRole}!` })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {msg && (
        <div
          className={`p-4 rounded-xl font-inter text-xs ${
            msg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white p-4 rounded-2xl border border-black/10 shadow-xs">
        {/* Role Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl font-inter text-xs font-medium transition-all ${
              roleFilter === 'all'
                ? 'bg-[#184043] text-white shadow-xs'
                : 'bg-black/5 text-[#1d2433] hover:bg-black/10'
            }`}
          >
            All Users ({users.length})
          </button>
          <button
            onClick={() => setRoleFilter('customer')}
            className={`px-3.5 py-1.5 rounded-xl font-inter text-xs font-medium transition-all ${
              roleFilter === 'customer'
                ? 'bg-[#2952E1] text-white shadow-xs'
                : 'bg-black/5 text-[#1d2433] hover:bg-black/10'
            }`}
          >
            Customers ({users.filter((u) => u.role === 'customer').length})
          </button>
          <button
            onClick={() => setRoleFilter('editor')}
            className={`px-3.5 py-1.5 rounded-xl font-inter text-xs font-medium transition-all ${
              roleFilter === 'editor'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-black/5 text-[#1d2433] hover:bg-black/10'
            }`}
          >
            Fulfillment Editors ({users.filter((u) => u.role === 'editor').length})
          </button>
          <button
            onClick={() => setRoleFilter('admin')}
            className={`px-3.5 py-1.5 rounded-xl font-inter text-xs font-medium transition-all ${
              roleFilter === 'admin'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-black/5 text-[#1d2433] hover:bg-black/10'
            }`}
          >
            Admins ({users.filter((u) => u.role === 'admin').length})
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 rounded-xl border border-black/15 bg-white px-3.5 py-2 font-inter text-xs text-[#1d2433] outline-none focus:border-[#2952E1]"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/8 bg-[#fbf6ef]/40">
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">User Profile</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Orders</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">System Role</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Change Role</th>
              <th className="px-4 py-3 font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center font-inter text-sm text-black/40">
                  No user accounts found matching query.
                </td>
              </tr>
            ) : (
              filtered.map((user) => {
                const roleObj = ROLE_OPTIONS.find((r) => r.value === user.role)
                return (
                  <tr key={user.id} className="hover:bg-black/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#184043] text-white font-inter text-xs font-bold flex items-center justify-center">
                          {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-inter text-sm font-semibold text-[#1d2433]">
                            {user.full_name || 'Unnamed User'}
                            {user.id === currentUserId && (
                              <span className="ml-2 text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-inter font-normal">
                                You
                              </span>
                            )}
                          </p>
                          <p className="font-inter text-xs text-black/40">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 font-inter text-xs text-black/60">
                      {user.phone ? user.phone : '—'}
                    </td>

                    <td className="px-4 py-3">
                      <span className="font-inter text-xs font-semibold text-[#1d2433] bg-slate-100 px-2.5 py-1 rounded-full">
                        {user.order_count ?? 0} Orders
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full font-inter text-xs ${roleObj?.badgeClass}`}>
                        {roleObj?.label || user.role}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <select
                        value={user.role}
                        disabled={updatingId === user.id}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                        className="rounded-xl border border-black/15 bg-white px-3 py-1.5 font-inter text-xs text-[#1d2433] focus:border-[#2952E1] outline-none cursor-pointer disabled:opacity-50"
                      >
                        {ROLE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3 font-inter text-xs text-black/40 whitespace-nowrap">
                      {new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
