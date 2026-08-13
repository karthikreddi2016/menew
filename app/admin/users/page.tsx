import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UsersManager } from '@/components/admin/UsersManager'

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  // Fetch all profiles
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch orders count per customer
  const { data: orders } = await supabase.from('orders').select('customer_id')

  const orderCounts: Record<string, number> = {}
  orders?.forEach((o) => {
    orderCounts[o.customer_id] = (orderCounts[o.customer_id] || 0) + 1
  })

  const userItems = (profiles ?? []).map((p) => ({
    ...p,
    order_count: orderCounts[p.id] || 0,
  }))

  const customerCount = userItems.filter((u) => u.role === 'customer').length
  const editorCount = userItems.filter((u) => u.role === 'editor').length
  const adminCount = userItems.filter((u) => u.role === 'admin').length

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="h-2 w-2 rounded-full bg-[#2952E1]" />
          <p className="font-inter text-xs font-semibold uppercase tracking-wider text-black/40">User Access Management</p>
        </div>
        <h1 className="font-serif text-3xl font-medium text-[#1d2433]">Users & Accounts</h1>
        <p className="font-inter text-sm text-black/50 mt-1">
          Manage client accounts, assign fulfillment team roles (editors), and maintain admin privileges.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Total Accounts</span>
          <p className="font-serif text-3xl font-bold text-[#1d2433] mt-2">{userItems.length}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-blue-700 uppercase tracking-wider">Customers</span>
          <p className="font-serif text-3xl font-bold text-blue-700 mt-2">{customerCount}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-purple-700 uppercase tracking-wider">Fulfillment Editors</span>
          <p className="font-serif text-3xl font-bold text-purple-700 mt-2">{editorCount}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-amber-700 uppercase tracking-wider">Admins</span>
          <p className="font-serif text-3xl font-bold text-amber-700 mt-2">{adminCount}</p>
        </div>
      </div>

      {/* Main Users Manager */}
      <UsersManager users={userItems} currentUserId={user.id} />
    </div>
  )
}
