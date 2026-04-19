'use server'

import { createClient } from '@/lib/supabase/server'

export async function signupAction(
  _prevState: { error?: string; success?: boolean; email?: string } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean; email?: string }> {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.auth.signUp({
    email,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('name') as string,
        phone: formData.get('phone') as string,
      },
    },
  })

  if (error) return { error: error.message }

  return { success: true, email }
}
