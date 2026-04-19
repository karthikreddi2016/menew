'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function resetPasswordAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const password = formData.get('password') as string
  const confirm = formData.get('confirm') as string

  if (password !== confirm) return { error: 'Passwords do not match.' }
  if (password.length < 6) return { error: 'Password must be at least 6 characters.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) return { error: error.message }

  redirect('/login')
}
