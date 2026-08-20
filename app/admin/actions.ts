'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { OrderStatus, PaymentStatus, UserRole } from '@/lib/types/database.types'

async function ensureAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') throw new Error('Unauthorized: Admin access required')
  return { supabase, user }
}

export async function assignOrderAction(
  orderId: string,
  assignedAdminId: string | null
): Promise<{ error?: string }> {
  try {
    const { supabase } = await ensureAdmin()
    const { error } = await supabase
      .from('orders')
      .update({ assigned_admin: assignedAdminId || null })
      .eq('id', orderId)

    if (error) return { error: error.message }

    revalidatePath('/admin')
    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath('/admin/team')
    return {}
  } catch (err: any) {
    return { error: err.message || 'Failed to assign order' }
  }
}

export async function updateOrderPaymentAction(
  orderId: string,
  amount: number,
  paymentStatus: PaymentStatus
): Promise<{ error?: string }> {
  try {
    const { supabase } = await ensureAdmin()
    const { error } = await supabase
      .from('orders')
      .update({
        amount: Math.max(0, amount),
        payment_status: paymentStatus,
      })
      .eq('id', orderId)

    if (error) return { error: error.message }

    revalidatePath('/admin')
    revalidatePath('/admin/payments')
    revalidatePath(`/admin/orders/${orderId}`)
    return {}
  } catch (err: any) {
    return { error: err.message || 'Failed to update payment' }
  }
}

export async function updateUserRoleAction(
  targetUserId: string,
  newRole: UserRole
): Promise<{ error?: string }> {
  try {
    const { supabase } = await ensureAdmin()
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', targetUserId)

    if (error) return { error: error.message }

    revalidatePath('/admin/users')
    revalidatePath('/admin/team')
    return {}
  } catch (err: any) {
    return { error: err.message || 'Failed to update user role' }
  }
}

export async function toggleCreativeShowcaseAction(
  orderId: string,
  showcase: boolean
): Promise<{ error?: string }> {
  try {
    const { supabase } = await ensureAdmin()
    const { error } = await supabase
      .from('orders')
      .update({ creative_showcase: showcase })
      .eq('id', orderId)

export async function updateOrderStatusAction(
  orderId: string,
  newStatus: string
): Promise<{ error?: string }> {
  try {
    const { supabase } = await ensureAdmin()
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus as any })
      .eq('id', orderId)

    if (error) return { error: error.message }

    revalidatePath('/admin')
    revalidatePath('/admin/orders')
    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath(`/dashboard/orders/${orderId}`)
    return {}
  } catch (err: any) {
    return { error: err.message || 'Failed to update order status' }
  }
}

