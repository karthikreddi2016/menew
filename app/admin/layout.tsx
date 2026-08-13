import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logoutAction } from '@/app/auth/actions'
import { AdminNav } from '@/components/admin/AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-black/10 bg-[#184043] text-white">
        <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-inter font-semibold uppercase tracking-wider bg-[#2952E1] text-white mb-1">
              MVP Admin
            </span>
            <p className="font-serif text-xl font-medium text-white tracking-tight">Menew Studio</p>
          </div>
        </div>

        <AdminNav />

        <div className="border-t border-white/10 px-5 py-4 bg-[#102d30]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2952E1] text-white font-inter text-xs font-bold flex items-center justify-center">
              {profile?.full_name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-inter text-sm font-medium text-white truncate">{profile?.full_name}</p>
              <p className="font-inter text-[11px] text-white/50 truncate">{profile?.email}</p>
            </div>
          </div>
          <form action={logoutAction} className="mt-3">
            <button
              type="submit"
              className="w-full text-left font-inter text-xs text-white/50 hover:text-red-300 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between border-b border-black/10 bg-[#184043] px-4 py-3 text-white">
        <div>
          <span className="font-serif text-base font-medium">Menew Admin</span>
          <span className="ml-2 text-[10px] bg-[#2952E1] px-1.5 py-0.5 rounded text-white font-inter">MVP</span>
        </div>
        <Link href="/dashboard" className="font-inter text-xs text-white/70 hover:text-white flex items-center gap-1">
          ← Exit
        </Link>
      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden overflow-x-auto bg-[#102d30] border-b border-white/10 px-2 py-2 flex items-center gap-2 text-xs">
        <Link href="/admin" className="px-3 py-1.5 rounded-lg bg-white/10 text-white whitespace-nowrap font-inter">
          Orders
        </Link>
        <Link href="/admin/creatives" className="px-3 py-1.5 rounded-lg bg-white/10 text-white whitespace-nowrap font-inter">
          Creatives
        </Link>
        <Link href="/admin/users" className="px-3 py-1.5 rounded-lg bg-white/10 text-white whitespace-nowrap font-inter">
          Users
        </Link>
        <Link href="/admin/payments" className="px-3 py-1.5 rounded-lg bg-white/10 text-white whitespace-nowrap font-inter">
          Payments
        </Link>
        <Link href="/admin/team" className="px-3 py-1.5 rounded-lg bg-white/10 text-white whitespace-nowrap font-inter">
          Team
        </Link>
      </div>

      <main className="flex-1 overflow-auto bg-[#f8f9fa]">
        {children}
      </main>
    </div>
  )
}
