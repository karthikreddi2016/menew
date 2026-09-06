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

  // New form fields
  const copy_content = formData.get('copy_content') as string
  const need_content_help = formData.get('need_content_help') as string
  const asset_link = formData.get('asset_link') as string
  const reference_link = formData.get('reference_link') as string
  const style_pref = formData.get('style_pref') as string
  const contact_pref = formData.get('contact_pref') as string
  const quantity = formData.get('quantity') as string
  const creative_type = formData.get('creative_type') as string
  const purpose = formData.get('purpose') as string
  const brand_name = formData.get('brand_name') as string
  const industry = formData.get('industry') as string
  const tagline = formData.get('tagline') as string
  const brand_personality = formData.get('brand_personality') as string
  const num_slides = formData.get('num_slides') as string

  if (!service_type || !title || !brief) {
    return { error: 'Please fill in all required fields.' }
  }

  // Insert order row with all fields, with fallback if migration not yet applied
  let order: any = null
  let orderError: any = null

  const fullInsertPayload = {
    customer_id: user.id,
    service_type,
    title,
    brief,
    deadline_pref: deadline_pref || null,
    status: 'pending' as const,
    copy_content: copy_content || null,
    need_content_help: need_content_help || null,
    asset_link: asset_link || null,
    reference_link: reference_link || null,
    style_pref: style_pref || null,
    contact_pref: contact_pref || null,
    quantity: quantity || null,
    creative_type: creative_type || null,
    purpose: purpose || null,
    brand_name: brand_name || null,
    industry: industry || null,
    tagline: tagline || null,
    brand_personality: brand_personality || null,
    num_slides: num_slides || null,
  }

  const res = await supabase
    .from('orders')
    .insert(fullInsertPayload)
    .select()
    .single()

  order = res.data
  orderError = res.error

  // Fallback to core fields if extra columns do not exist yet in DB schema
  if (orderError && (orderError.message?.includes('column') || orderError.code === 'PGRST204')) {
    console.warn('Falling back to core orders insert schema:', orderError.message)
    const fallbackRes = await supabase
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
    order = fallbackRes.data
    orderError = fallbackRes.error
  }

  if (orderError || !order) {
    return { error: orderError?.message || 'Failed to create order.' }
  }

  // Upload asset files
  const assetFiles = formData.getAll('asset_files') as File[]
  const uploadedAssetNames: string[] = []
  for (const file of assetFiles) {
    if (file.size === 0) continue
    uploadedAssetNames.push(file.name)
    const path = `orders/${order.id}/assets/${Date.now()}-${file.name}`
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

  // Upload reference files
  const refFiles = formData.getAll('ref_files') as File[]
  const uploadedRefNames: string[] = []
  for (const file of refFiles) {
    if (file.size === 0) continue
    uploadedRefNames.push(file.name)
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

  // Fetch customer profile for complete client details
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, phone')
    .eq('id', user.id)
    .maybeSingle()

  // Automatically sync new order to Google Sheet for designer/editor workflow
  const { appendOrderToGoogleSheet } = await import('@/lib/services/google-sheets')
  await appendOrderToGoogleSheet({
    orderId: order.id,
    createdAt: new Date(),
    serviceType: service_type,
    title,
    creativeType: creative_type || null,
    brief,
    copyContent: copy_content || null,
    needContentHelp: need_content_help || null,
    assetFiles: uploadedAssetNames,
    assetLink: asset_link || null,
    referenceFiles: uploadedRefNames,
    referenceLink: reference_link || null,
    stylePref: style_pref || null,
    brandName: brand_name || null,
    industry: industry || null,
    tagline: tagline || null,
    brandPersonality: brand_personality || null,
    quantity: quantity || null,
    numSlides: num_slides || null,
    deadline: deadline_pref || null,
    customerName: profile?.full_name || (user.user_metadata?.full_name as string) || null,
    customerEmail: user.email || null,
    contactPref: contact_pref || profile?.phone || null,
    status: 'Available / Unassigned',
  })

  redirect('/order/summary')
}
