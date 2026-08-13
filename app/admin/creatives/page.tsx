import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreativesManager } from '@/components/admin/CreativesManager'
import type { OrderFile } from '@/lib/types/database.types'

export default async function AdminCreativesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  // Fetch order files with associated order & customer profiles
  const { data: files } = await supabase
    .from('order_files')
    .select(`
      *,
      orders!order_files_order_id_fkey(
        id,
        title,
        service_type,
        creative_showcase,
        profiles!orders_customer_id_fkey(full_name)
      )
    `)
    .order('created_at', { ascending: false })

  // Generate signed URLs for preview & download
  const items = await Promise.all(
    (files ?? []).map(async (file: any) => {
      const { data } = await supabase.storage
        .from('order-files')
        .createSignedUrl(file.storage_path, 3600)
      return {
        ...file,
        signedUrl: data?.signedUrl,
      }
    })
  )

  const deliverableCount = items.filter((i) => i.file_role === 'deliverable').length
  const featuredCount = items.filter((i) => i.orders?.creative_showcase).length

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="h-2 w-2 rounded-full bg-[#E865AA]" />
          <p className="font-inter text-xs font-semibold uppercase tracking-wider text-black/40">Asset Library</p>
        </div>
        <h1 className="font-serif text-3xl font-medium text-[#1d2433]">Creatives & Deliverables</h1>
        <p className="font-inter text-sm text-black/50 mt-1">
          Browse all order assets, review client references, and curate featured showcase items.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-black/50 uppercase tracking-wider">Total Assets</span>
          <p className="font-serif text-3xl font-bold text-[#1d2433] mt-2">{items.length}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-emerald-700 uppercase tracking-wider">Final Deliverables</span>
          <p className="font-serif text-3xl font-bold text-emerald-700 mt-2">{deliverableCount}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-amber-700 uppercase tracking-wider">Featured Showcase</span>
          <p className="font-serif text-3xl font-bold text-amber-700 mt-2">{featuredCount}</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="font-inter text-xs font-semibold text-blue-700 uppercase tracking-wider">Client References</span>
          <p className="font-serif text-3xl font-bold text-blue-700 mt-2">{items.length - deliverableCount}</p>
        </div>
      </div>

      {/* Main Creatives Manager */}
      <CreativesManager items={items} />
    </div>
  )
}
