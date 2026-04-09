'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendMessageAction(orderId: string, body: string): Promise<{ error?: string }> {
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

  revalidatePath(`/dashboard/orders/${orderId}`)
  return {}
}
