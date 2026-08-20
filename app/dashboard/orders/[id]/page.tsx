import { createClient } from '@/lib/supabase/server'
import { OrderDetailsView } from '@/components/dashboard/OrderDetailsView'
import { SERVICE_CONFIG } from '@/lib/types/order.types'
import type { OrderFile } from '@/lib/types/database.types'

export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ status?: string }>
}) {
  const { id } = await params
  const sParams = searchParams ? await searchParams : {}
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isDemo = id.startsWith('demo-')
  const forceStatus = sParams?.status?.toLowerCase()

  let resolvedStatus: 'payment_pending' | 'confirmed' | 'in_progress' | 'cancel_requested' | 'refund_initiated' | 'completed' | 'cancelled' = 'confirmed'
  if (forceStatus === 'completed' || forceStatus === 'delivered' || forceStatus === 'complete') {
    resolvedStatus = 'completed'
  } else if (forceStatus === 'cancelled' || forceStatus === 'canceled') {
    resolvedStatus = 'cancelled'
  } else if (forceStatus === 'refund_initiated' || forceStatus === 'refund') {
    resolvedStatus = 'refund_initiated'
  } else if (forceStatus === 'cancel_requested' || forceStatus === 'cancel_request' || forceStatus === 'cancel_request_sent') {
    resolvedStatus = 'cancel_requested'
  } else if (forceStatus === 'pending' || forceStatus === 'payment_pending' || (isDemo && id === 'demo-1')) {
    resolvedStatus = 'payment_pending'
  } else if (isDemo && id === 'demo-2') {
    resolvedStatus = 'confirmed'
  }

  let orderData = {
    id: '23456789',
    service_type: 'graphic_design',
    title: 'Graphic Design',
    brief: 'Promotional campaign poster and digital creatives for our store.',
    status: resolvedStatus,
    created_at: '2026-01-14T10:00:00Z',
    expected_delivery: '15 Jan 2026',
    ordered_date: '14 Jan 2026',
  }

  if (!isDemo && user) {
    const { data: dbOrder } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (dbOrder) {
      let dbMappedStatus: 'payment_pending' | 'confirmed' | 'in_progress' | 'cancel_requested' | 'refund_initiated' | 'completed' | 'cancelled' = 'confirmed'
      if (dbOrder.status === 'completed' || dbOrder.status === 'delivered') dbMappedStatus = 'completed'
      else if (dbOrder.status === 'cancelled') dbMappedStatus = 'cancelled'
      else if (dbOrder.status === 'pending') dbMappedStatus = 'payment_pending'
      else if ((dbOrder as any).status === 'refund_initiated') dbMappedStatus = 'refund_initiated'
      else if ((dbOrder as any).status === 'cancel_requested') dbMappedStatus = 'cancel_requested'

      orderData = {
        id: dbOrder.id.replace(/-/g, '').slice(0, 8).toUpperCase(),
        service_type: dbOrder.service_type,
        title: dbOrder.title || SERVICE_CONFIG[dbOrder.service_type as keyof typeof SERVICE_CONFIG]?.label || 'Graphic Design',
        brief: dbOrder.brief || '',
        status: forceStatus ? resolvedStatus : dbMappedStatus,
        created_at: dbOrder.created_at,
        ordered_date: new Date(dbOrder.created_at).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        expected_delivery: new Date(
          new Date(dbOrder.created_at).getTime() + (dbOrder.service_type === 'branding_kit' ? 6 : 1) * 86400000
        ).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      }
    }
  }

  return (
    <OrderDetailsView
      orderId={orderData.id}
      serviceTitle={orderData.title}
      orderedDate={orderData.ordered_date}
      expectedDelivery={orderData.expected_delivery}
      status={orderData.status as any}
      backHref="/cart"
    />
  )
}
