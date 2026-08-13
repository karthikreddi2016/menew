import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FulfillmentTeamManager, type TeamMember } from '@/components/admin/FulfillmentTeamManager'
import type { Order } from '@/lib/types/database.types'

export default async function AdminTeamPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  // Fetch team members (editors and admins)
  const { data: teamProfiles } = await supabase
    .from('profiles')
    .select('*')
    .in('role', ['admin', 'editor'])
    .order('full_name')

  // Fetch all orders
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      profiles!orders_customer_id_fkey(full_name, email)
    `)
    .order('created_at', { ascending: false })

  const allOrders = (orders ?? []) as Order[]

  // Separate unassigned orders that need action
  const unassignedOrders = allOrders.filter(
    (o) => !o.assigned_admin && o.status !== 'completed' && o.status !== 'cancelled'
  ) as Parameters<typeof FulfillmentTeamManager>[0]['unassignedOrders']

  // Group active & completed orders by team member
  const team: TeamMember[] = (teamProfiles ?? []).map((member) => {
    const memberOrders = allOrders.filter((o) => o.assigned_admin === member.id)
    const activeOrders = memberOrders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled')
    const completedCount = memberOrders.filter((o) => o.status === 'completed').length

    return {
      ...member,
      active_orders: activeOrders,
      completed_count: completedCount,
    }
  })

  const totalActiveTasks = team.reduce((sum, m) => sum + m.active_orders.length, 0)
  const totalCompletedTasks = team.reduce((sum, m) => sum + m.completed_count, 0)

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="h-2 w-2 rounded-full bg-purple-500" />
          <p className="font-inter text-xs font-semibold uppercase tracking-wider text-black/40">Fulfillment Operations</p>
        </div>
        <h1 className="font-serif text-3xl font-medium text-[#1d2433]">Fulfillment Team & Workload</h1>
        <p className="font-inter text-sm text-black/50 mt-1">
          Monitor team capacity, distribute incoming creative orders, and track editor task completion.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Team Roster</span>
          <p className="font-serif text-3xl font-bold text-[#1d2433] mt-2">{team.length}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-amber-700 uppercase tracking-wider">Unassigned Queue</span>
          <p className="font-serif text-3xl font-bold text-amber-700 mt-2">{unassignedOrders.length}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-blue-700 uppercase tracking-wider">Active In-Flight</span>
          <p className="font-serif text-3xl font-bold text-blue-700 mt-2">{totalActiveTasks}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-emerald-700 uppercase tracking-wider">Total Delivered</span>
          <p className="font-serif text-3xl font-bold text-emerald-700 mt-2">{totalCompletedTasks}</p>
        </div>
      </div>

      {/* Main Fulfillment Team Manager */}
      <FulfillmentTeamManager team={team} unassignedOrders={unassignedOrders} />
    </div>
  )
}
