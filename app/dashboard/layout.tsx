import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logoutAction } from '@/app/auth/actions'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-black/10 bg-white">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-black/8">
          <Link href="/" className="shrink-0">
            <div className="h-[30px] w-[115px] overflow-hidden relative" aria-label="Menew">
              <div style={{ position: 'absolute', width: '130px', height: '128px', left: '-7px', top: '-49px', backgroundImage: "url('/images/logo.png')", backgroundSize: '100% 100%' }} />
            </div>
          </Link>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          <SidebarLink href="/dashboard" label="My Orders" icon={<OrdersIcon />} />
          <SidebarLink href="/order" label="New Order" icon={<PlusIcon />} />
          <SidebarLink href="/contact" label="Support" icon={<SupportIcon />} />
          {profile?.role === 'admin' && (
            <SidebarLink href="/admin" label="Admin Panel" icon={<AdminIcon />} />
          )}
        </nav>

        <div className="border-t border-black/8 px-4 py-4">
          <p className="font-inter text-sm font-medium text-[#1d2433] truncate">{profile?.full_name ?? 'User'}</p>
          <p className="font-inter text-xs text-black/40 truncate">{profile?.email}</p>
          <form action={logoutAction} className="mt-3">
            <button type="submit" className="font-inter text-xs text-black/40 hover:text-red-500 transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile top bar */}
        <div className="flex md:hidden items-center justify-between border-b border-black/10 bg-white px-4 py-3">
          <Link href="/" className="font-inter text-sm font-medium text-[#184043]">Menew</Link>
          <div className="flex items-center gap-3">
            <Link href="/order" className="rounded-full bg-[#184043] px-4 py-1.5 font-inter text-xs font-medium text-white">
              New Order
            </Link>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}

function SidebarLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-sm text-[#1d2433] transition-colors hover:bg-[#184043]/8 hover:text-[#184043]"
    >
      <span className="text-black/40">{icon}</span>
      {label}
    </Link>
  )
}

function OrdersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function AdminIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
