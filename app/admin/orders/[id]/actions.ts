'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { OrderStatus } from '@/lib/types/database.types'

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['in_progress', 'cancelled'],
  in_progress: ['delivered', 'cancelled'],
  revision: ['in_progress', 'cancelled'],
  delivered: ['completed', 'revision', 'cancelled'],
  completed: [],
  cancelled: [],
}

export async function updateOrderStatusAction(
  orderId: string,
  newStatus: OrderStatus
): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Verify admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'admin') return { error: 'Unauthorized' }

  // Check current status
  const { data: order } = await supabase
    .from('orders')
    .select('status')
    .eq('id', orderId)
    .single()
  if (!order) return { error: 'Order not found' }

  const allowed = ALLOWED_TRANSITIONS[order.status as OrderStatus]
  if (!allowed.includes(newStatus)) {
    return { error: `Cannot transition from ${order.status} to ${newStatus}` }
  }

  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId)

  if (error) return { error: error.message }

  revalidatePath(`/admin/orders/${orderId}`)
  revalidatePath('/admin')
  return {}
}

export async function uploadDeliverableAction(
  orderId: string,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'admin') return { error: 'Unauthorized' }

  const files = formData.getAll('files') as File[]
  const errors: string[] = []

  for (const file of files) {
    if (file.size === 0) continue
    const path = `orders/${orderId}/deliverables/${Date.now()}-${file.name}`
    const { error: storageError } = await supabase.storage
      .from('order-files')
      .upload(path, file)

    if (storageError) {
      errors.push(file.name)
      continue
    }

    await supabase.from('order_files').insert({
      order_id: orderId,
      uploader_id: user.id,
      file_name: file.name,
      storage_path: path,
      file_size: file.size,
      mime_type: file.type,
      file_role: 'deliverable',
    })
  }

  // Auto-set to delivered if in_progress
  const { data: order } = await supabase
    .from('orders')
    .select('status')
    .eq('id', orderId)
    .single()

  if (order?.status === 'in_progress') {
    await supabase.from('orders').update({ status: 'delivered' }).eq('id', orderId)
  }

  revalidatePath(`/admin/orders/${orderId}`)
  revalidatePath(`/dashboard/orders/${orderId}`)

  if (errors.length > 0) return { error: `Failed to upload: ${errors.join(', ')}` }
  return {}
}

export async function sendAdminMessageAction(orderId: string, body: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }
  if (!body.trim()) return { error: 'Message cannot be empty' }

  const { error } = await supabase.from('order_messages').insert({
    order_id: orderId,
    sender_id: user.id,
    body: body.trim(),
  })

  if (error) return { error: error.message }

  revalidatePath(`/admin/orders/${orderId}`)
  return {}
}
