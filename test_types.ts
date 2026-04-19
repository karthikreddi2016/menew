import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/database.types'

async function test() {
  const client = createServerClient<Database>('http://localhost', 'key', {
    cookies: {
      getAll: () => [],
      setAll: () => {},
    },
  })

  const { data: profile } = await client
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', 'test')
    .single()

  // This should compile - role should not be 'never'
  const role: string | undefined = profile?.role
}
