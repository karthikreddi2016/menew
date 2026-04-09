import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logoutAction } from '@/app/auth/actions'

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
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-black/10 bg-[#184043]">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="font-serif text-lg text-white">Admin Panel</p>
          <p className="font-inter text-xs text-white/50 mt-0.5">Menew Studio</p>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          <AdminLink href="/admin" label="All Orders" />
          <AdminLink href="/dashboard" label="← Customer View" />
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <p className="font-inter text-sm font-medium text-white/80 truncate">{profile?.full_name}</p>
          <p className="font-inter text-xs text-white/40 truncate">{profile?.email}</p>
          <form action={logoutAction} className="mt-3">
            <button type="submit" className="font-inter text-xs text-white/40 hover:text-red-300 transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="flex md:hidden items-center justify-between border-b border-black/10 bg-[#184043] px-4 py-3">
          <p className="font-inter text-sm font-medium text-white">Admin Panel</p>
          <Link href="/dashboard" className="font-inter text-xs text-white/60 hover:text-white">← Back</Link>
        </div>
        {children}
      </main>
    </div>
  )
}

function AdminLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      {label}
    </Link>
  )
}
