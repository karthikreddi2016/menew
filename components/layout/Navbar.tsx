import { createClient } from '@/lib/supabase/server'
import { NavbarClient } from './NavbarClient'

export async function Navbar({ isLoggedIn, isAdmin }: { isLoggedIn?: boolean; isAdmin?: boolean } = {}) {
  // If props are provided, skip the supabase call to avoid duplicate auth checks
  // which cause hydration mismatches during SSR streaming
  if (typeof isLoggedIn === 'boolean') {
    return <NavbarClient isLoggedIn={isLoggedIn} isAdmin={isAdmin ?? false} />
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  let computedIsAdmin = false
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    computedIsAdmin = profile?.role === 'admin'
  }
  return <NavbarClient isLoggedIn={!!user} isAdmin={computedIsAdmin} />
}
