'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { ServiceType } from '@/lib/types/database.types'

export async function createOrderAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const service_type = formData.get('service_type') as ServiceType
  const title = formData.get('title') as string
  const brief = formData.get('brief') as string
  const deadline_pref = formData.get('deadline_pref') as string

  if (!service_type || !title || !brief) {
    return { error: 'Please fill in all required fields.' }
  }

  // Insert order row
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: user.id,
      service_type,
      title,
      brief,
      deadline_pref: deadline_pref || null,
      status: 'pending',
    })
    .select()
    .single()

  if (orderError || !order) {
    return { error: orderError?.message || 'Failed to create order.' }
  }

  // Upload reference files
  const files = formData.getAll('files') as File[]
  for (const file of files) {
    if (file.size === 0) continue
    const path = `orders/${order.id}/references/${Date.now()}-${file.name}`
    const { error: storageError } = await supabase.storage
      .from('order-files')
      .upload(path, file)

    if (!storageError) {
      await supabase.from('order_files').insert({
        order_id: order.id,
        uploader_id: user.id,
        file_name: file.name,
        storage_path: path,
        file_size: file.size,
        mime_type: file.type,
        file_role: 'reference',
      })
    }
  }

  redirect(`/dashboard/orders/${order.id}`)
}
