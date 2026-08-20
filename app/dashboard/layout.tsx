import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If no user session exists, let children (like demo pages) render gracefully or handle auth individually
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      {children}
    </div>
  )
}
