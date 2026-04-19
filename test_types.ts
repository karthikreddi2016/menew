import { createServerClient } from '@supabase/ssr'

type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; role: string; full_name: string; email: string }
        Insert: { id: string; role: string; full_name: string; email: string }
        Update: { role?: string; full_name?: string; email?: string }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

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

  const role: string | undefined = profile?.role
}
