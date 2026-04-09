import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { OrderCard } from '@/components/dashboard/OrderCard'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: orders } = await supabase
    .from('orders')
    .select('id, service_type, title, status, created_at')
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-[#1d2433]">My Orders</h1>
        <Link
          href="/order"
          className="rounded-full bg-[#184043] px-5 py-2.5 font-inter text-sm font-medium text-white hover:bg-[#184043]/90 transition-colors"
        >
          + New Order
        </Link>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 bg-white py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#184043]/8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#184043" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <p className="font-serif text-lg text-[#1d2433]">No orders yet</p>
          <p className="mt-1 font-inter text-sm text-black/50">Place your first order and our team will get to work.</p>
          <Link
            href="/order"
            className="mt-6 rounded-full bg-[#184043] px-8 py-3 font-inter font-medium text-sm text-white hover:bg-[#184043]/90 transition-colors"
          >
            Place an Order
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order as Parameters<typeof OrderCard>[0]['order']} />
          ))}
        </div>
      )}
    </div>
  )
}
