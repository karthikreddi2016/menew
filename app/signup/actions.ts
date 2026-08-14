'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function signupAction(
  _prevState: { error?: string; success?: boolean; email?: string } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean; email?: string }> {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https')
  const origin = host ? `${protocol}://${host}` : 'https://www.menew.studio'

  const { error } = await supabase.auth.signUp({
    email,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: formData.get('name') as string,
        phone: formData.get('phone') as string,
      },
    },
  })

  if (error) return { error: error.message }

  return { success: true, email }
}
