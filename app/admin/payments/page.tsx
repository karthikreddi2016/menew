import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PaymentsManager } from '@/components/admin/PaymentsManager'

export default async function AdminPaymentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  // Fetch orders with customer details
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      profiles!orders_customer_id_fkey(full_name, email)
    `)
    .order('created_at', { ascending: false })

  const allOrders = orders ?? []

  // Financial calculations
  const totalRevenue = allOrders.reduce((sum, o) => sum + (o.amount || 0), 0)
  const paidRevenue = allOrders
    .filter((o) => o.payment_status === 'paid')
    .reduce((sum, o) => sum + (o.amount || 0), 0)
  const pendingRevenue = allOrders
    .filter((o) => !o.payment_status || o.payment_status === 'unpaid')
    .reduce((sum, o) => sum + (o.amount || 0), 0)
  const unpaidCount = allOrders.filter((o) => !o.payment_status || o.payment_status === 'unpaid').length

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="font-inter text-xs font-semibold uppercase tracking-wider text-black/40">Financial Ledger</p>
        </div>
        <h1 className="font-serif text-3xl font-medium text-[#1d2433]">Payments & Revenue</h1>
        <p className="font-inter text-sm text-black/50 mt-1">
          Track order payment statuses, issue pricing quotes, and monitor revenue breakdown.
        </p>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Total Quoted Value</span>
          <p className="font-serif text-3xl font-bold text-[#1d2433] mt-2">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-emerald-700 uppercase tracking-wider">Paid Collected</span>
          <p className="font-serif text-3xl font-bold text-emerald-700 mt-2">
            ₹{paidRevenue.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-amber-700 uppercase tracking-wider">Pending Collection</span>
          <p className="font-serif text-3xl font-bold text-amber-700 mt-2">
            ₹{pendingRevenue.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-rose-700 uppercase tracking-wider">Unpaid Orders</span>
          <p className="font-serif text-3xl font-bold text-rose-700 mt-2">{unpaidCount}</p>
        </div>
      </div>

      {/* Main Payments Manager */}
      <PaymentsManager orders={allOrders as Parameters<typeof PaymentsManager>[0]['orders']} />
    </div>
  )
}
