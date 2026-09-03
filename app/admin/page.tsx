import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { OrderTable } from '@/components/admin/OrderTable'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  // Fetch orders with customer info
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      profiles!orders_customer_id_fkey(full_name, email, phone)
    `)
    .order('created_at', { ascending: false })

  // Fetch reference & deliverable files
  const { data: allFiles } = await supabase
    .from('order_files')
    .select('*')

  // Fetch team members (editors & admins)
  const { data: teamMembers } = await supabase
    .from('profiles')
    .select('id, full_name, role')
    .in('role', ['admin', 'editor'])
    .order('full_name')

  const allOrders = (orders ?? []).map((o) => ({
    ...o,
    order_files: (allFiles ?? []).filter((f) => f.order_id === o.id),
  }))
  const pendingCount = allOrders.filter((o) => o.status === 'pending').length
  const inProgressCount = allOrders.filter((o) => o.status === 'in_progress').length
  const completedCount = allOrders.filter((o) => o.status === 'completed').length
  const unassignedCount = allOrders.filter((o) => !o.assigned_admin && o.status !== 'completed' && o.status !== 'cancelled').length

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 flex flex-col gap-6">
      {/* Header Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="h-2 w-2 rounded-full bg-[#2952E1]" />
          <p className="font-inter text-xs font-semibold uppercase tracking-wider text-black/40">Overview</p>
        </div>
        <h1 className="font-serif text-3xl font-medium text-[#1d2433]">Order Requests</h1>
        <p className="font-inter text-sm text-black/50 mt-1">
          Review, assign, and fulfill client order requests across all creative services.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Total Requests</span>
            <span className="p-2 rounded-xl bg-blue-50 text-[#2952E1]">📦</span>
          </div>
          <p className="font-serif text-3xl font-bold text-[#1d2433] mt-3">{allOrders.length}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-inter text-xs font-semibold text-amber-700 uppercase tracking-wider">Pending Review</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">⏳</span>
          </div>
          <p className="font-serif text-3xl font-bold text-amber-700 mt-3">{pendingCount}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-inter text-xs font-semibold text-blue-700 uppercase tracking-wider">In Production</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">⚡</span>
          </div>
          <p className="font-serif text-3xl font-bold text-blue-700 mt-3">{inProgressCount}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-inter text-xs font-semibold text-rose-700 uppercase tracking-wider">Needs Assignment</span>
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600">👤</span>
          </div>
          <p className="font-serif text-3xl font-bold text-rose-700 mt-3">{unassignedCount}</p>
        </div>
      </div>

      {/* Main Order Table */}
      <OrderTable
        orders={allOrders as Parameters<typeof OrderTable>[0]['orders']}
        teamMembers={teamMembers ?? []}
      />
    </div>
  )
}
