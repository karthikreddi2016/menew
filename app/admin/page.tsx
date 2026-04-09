import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { OrderTable } from '@/components/admin/OrderTable'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      profiles!orders_customer_id_fkey(full_name, email)
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-[#1d2433]">All Orders</h1>
        <p className="mt-1 font-inter text-sm text-black/50">
          {orders?.length ?? 0} total orders
        </p>
      </div>

      <OrderTable orders={(orders ?? []) as Parameters<typeof OrderTable>[0]['orders']} />
    </div>
  )
}
