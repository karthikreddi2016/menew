import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { SERVICE_CONFIG, STATUS_LABELS } from '@/lib/types/order.types'
import type { ServiceType } from '@/lib/types/database.types'

type OrderItem = {
  id: string
  serviceType: string
  title: string
  orderedDate: string
  expectedDate?: string
  statusText: string
  statusStyle: string
}

// Default 2 demo orders matching the dashboard Recent Projects and Figma mockups
const defaultDemoOrders: OrderItem[] = [
  {
    id: 'demo-1',
    serviceType: 'Video Editing',
    title: 'Promotional campaign reel for the New Customers to post on our brand page on instagram',
    orderedDate: '2 Jan 2026',
    expectedDate: '12 Jan 2026',
    statusText: 'Payment Pending',
    statusStyle: 'bg-[#FFEFDB] text-[#D97706] border border-[#FDE68A]',
  },
  {
    id: 'demo-2',
    serviceType: 'Video Editing',
    title: 'Promotional campaign reel for the New Customers to post on our brand page on instagram',
    orderedDate: '6 Jan 2026',
    expectedDate: '12 Jan 2026',
    statusText: 'Order Confirmed',
    statusStyle: 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]',
  },
]

export default async function CartPage({
  searchParams,
}: {
  searchParams?: Promise<{ empty?: string }>
}) {
  const params = searchParams ? await searchParams : {}
  const isForceEmpty = params?.empty === 'true'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let dbOrders: OrderItem[] = []
  let avatarInitials = 'U'

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()

    const { data: rawOrders } = await supabase
      .from('orders')
      .select('id, service_type, title, status, created_at')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false })

    const name = profile?.full_name?.trim() || user.email || 'User'
    avatarInitials = name.charAt(0).toUpperCase()

    if (rawOrders && rawOrders.length > 0) {
      dbOrders = rawOrders.map((o) => {
        const service = SERVICE_CONFIG[o.service_type as ServiceType]
        const isCompleted = o.status === 'completed'
        return {
          id: o.id,
          serviceType: service?.label || o.service_type.replace('_', ' ').toUpperCase(),
          title: o.title || 'Creative request',
          orderedDate: new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          expectedDate: new Date(new Date(o.created_at).getTime() + 10 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          statusText: STATUS_LABELS[o.status] || o.status,
          statusStyle: isCompleted ? 'bg-[#059669] text-white' : 'bg-[#FFEFDB] text-[#D97706] border border-[#FDE68A]',
        }
      })
    }
  }

  // Use database orders if present, otherwise default to the 2 demo orders
  const finalOrders: OrderItem[] = isForceEmpty
    ? []
    : dbOrders.length > 0
    ? dbOrders
    : defaultDemoOrders

  const isEmpty = isForceEmpty || finalOrders.length === 0
  const ordersBadgeCount = finalOrders.length

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Logged in Header with desktop My Orders & mobile Cart button */}
      <DashboardHeader
        ordersCount={ordersBadgeCount}
        avatarInitials={avatarInitials}
        isLoggedIn={!!user}
      />

      {isEmpty ? (
        /* ── Empty Cart View ── */
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20 max-w-[800px] mx-auto text-center">
          <div className="relative w-[220px] sm:w-[260px] h-[160px] sm:h-[180px] mx-auto mb-4 select-none">
            <Image
              src="/images/empty-cart-space.png"
              alt="Empty Cart Space Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="font-serif text-[28px] sm:text-[38px] md:text-[42px] text-[#111827] font-normal tracking-[-0.01em]">
            Your Menew Cart is empty
          </h1>

          <p className="font-inter text-[15px] sm:text-[16px] text-[#595959] mt-2">
            Start your first design request now!
          </p>

          <div className="mt-6 flex flex-col items-center gap-2">
            <Link
              href="/order"
              className="inline-flex items-center justify-center rounded-full bg-[#2952E1] px-9 py-3.5 font-inter font-medium text-[15px] text-white shadow-[0_4px_14px_0_rgba(41,82,225,0.39)] transition-all hover:bg-[#1e42c7] hover:shadow-lg active:scale-95"
            >
              Raise Request
            </Link>
            <p className="font-inter italic text-[13px] text-[#79747e] mt-1">
              Takes 2 minutes &bull; No designer hunting
            </p>
          </div>
        </main>
      ) : (
        /* ── Manage and Track Design Requests View (Synchronized with Dashboard Recent Projects) ── */
        <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-8 py-8">
          {/* Pink Notice Box */}
          <div className="rounded-[12px] bg-[#FFF1F5] border border-[#FBCFE8] p-4 flex items-center gap-3 text-[#BE185D] mb-8">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-[#DB2777]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <p className="font-inter text-[13px] sm:text-[14px] leading-snug">
              <strong className="font-semibold">Note:</strong> Files will be exchanged via WhatsApp only. Check your inbox for updates and drafts from our design team!
            </p>
          </div>

          {/* Headline & Add New Request Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h1 className="font-serif text-[24px] sm:text-[32px] text-[#111827] font-normal tracking-[-0.01em]">
              Manage and track your design Request from here
            </h1>
            <Link
              href="/order"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#2952E1] bg-white px-5 py-2.5 font-inter font-medium text-[14px] text-[#2952E1] hover:bg-[#2952E1]/5 transition-colors self-start sm:self-auto shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Add New Request</span>
            </Link>
          </div>

          {/* Grid of Design Request Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {finalOrders.map((order) => {
              const href = `/dashboard/orders/${order.id}${order.statusText.includes('Pending') ? '?status=pending' : '?status=confirmed'}`
              return (
                <Link
                  key={order.id}
                  href={href}
                  className="rounded-[16px] border border-[#EDEDED] bg-white p-6 flex flex-col justify-between gap-4 shadow-xs transition-all hover:border-[#2952E1]/50 hover:shadow-md block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-[20px] font-semibold text-[#111827]">
                        {order.serviceType}
                      </h3>
                      <p className="font-inter text-[13px] text-[#6f6f6f] mt-2 leading-relaxed">
                        {order.title}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#EDEDED] shrink-0 text-[#111827]">
                      {order.serviceType.toLowerCase().includes('video') || order.serviceType.toLowerCase().includes('reel') ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                          <line x1="7" y1="2" x2="7" y2="22" />
                          <line x1="17" y1="2" x2="17" y2="22" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                        </svg>
                      ) : order.serviceType.toLowerCase().includes('brochure') ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F3F4F6]">
                    <div className="flex flex-col text-[12px] sm:text-[13px] text-[#6f6f6f] gap-0.5">
                      <span>Ordered: {order.orderedDate}</span>
                      {order.expectedDate && <span>Expected: {order.expectedDate}</span>}
                    </div>
                    <span className={`font-inter text-[12px] font-medium px-3 py-1 rounded-[4px] ${order.statusStyle}`}>
                      {order.statusText}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Proceed to Checkout Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-[16px] bg-[#F8FAFC] border border-[#EDEDED] mb-12">
            <div>
              <h3 className="font-serif text-[18px] text-[#191919] font-medium">Ready to complete your order?</h3>
              <p className="font-inter text-[13px] text-[#6f6f6f] mt-0.5">Review items, apply coupons, and checkout securely.</p>
            </div>
            <Link
              href="/order/summary"
              className="inline-flex items-center justify-center rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white px-8 py-3 font-inter font-medium text-[14px] shadow-sm transition-all active:scale-95 shrink-0"
            >
              Proceed to Checkout →
            </Link>
          </div>
        </main>
      )}

      {/* ── Logged In Footer ── */}
      <footer className="bg-white border-t border-[#EDEDED] pt-14 pb-8 px-4 sm:px-8">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="shrink-0 inline-block mb-4">
              <div className="h-[39px] w-[150px] overflow-hidden relative" aria-label="Menew">
                <div
                  style={{
                    position: "absolute",
                    width: "167.91px",
                    height: "165.83px",
                    left: "-8.955px",
                    top: "-63.414px",
                    backgroundImage: "url('/images/logo.png')",
                    backgroundSize: "100% 100%",
                  }}
                />
              </div>
            </Link>
          </div>

          <div>
            <h4 className="font-inter text-[12px] font-semibold text-[#6f6f6f] uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5 font-inter text-[14px] text-[#111827]">
              <li><Link href="/order?service=graphic_design" className="hover:text-[#2952E1]">Graphic Design</Link></li>
              <li><Link href="/order?service=video_editing" className="hover:text-[#2952E1]">Video Editing</Link></li>
              <li><Link href="/order?service=3d_motion" className="hover:text-[#2952E1]">3d/Motion Design</Link></li>
              <li><Link href="/order?service=ppt_design" className="hover:text-[#2952E1]">PPT Design</Link></li>
              <li><Link href="/order?service=branding_kit" className="hover:text-[#2952E1]">Branding Kit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-inter text-[12px] font-semibold text-[#6f6f6f] uppercase tracking-wider mb-4">Get Started</h4>
            <ul className="space-y-2.5 font-inter text-[14px] text-[#111827]">
              <li><Link href="#" className="hover:text-[#2952E1]">How to Use</Link></li>
              <li><Link href="#" className="hover:text-[#2952E1]">For Enterprise</Link></li>
              <li><Link href="#" className="hover:text-[#2952E1]">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-inter text-[12px] font-semibold text-[#6f6f6f] uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 font-inter text-[14px] text-[#111827]">
              <li><Link href="/contact" className="hover:text-[#2952E1]">Contact</Link></li>
              <li><Link href="#" className="hover:text-[#2952E1]">Pricing</Link></li>
              <li><Link href="#" className="hover:text-[#2952E1]">About</Link></li>
              <li><Link href="#" className="hover:text-[#2952E1]">Privacy policies</Link></li>
              <li><Link href="#" className="hover:text-[#2952E1]">Term of use</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1360px] mx-auto pt-8 border-t border-[#EDEDED] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[13px] text-[#6f6f6f]">
            Copyright &copy; 2026-2027 Menew Company All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 text-[#111827]">
              <a href="#" aria-label="Instagram" className="hover:text-[#2952E1]"><InstagramIcon /></a>
              <a href="#" aria-label="Facebook" className="hover:text-[#2952E1]"><FacebookIcon /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-[#2952E1]"><LinkedInIcon /></a>
              <a href="#" aria-label="X" className="hover:text-[#2952E1]"><XIcon /></a>
              <a href="#" aria-label="YouTube" className="hover:text-[#2952E1]"><YouTubeIcon /></a>
            </div>

            <div className="border border-[#EDEDED] rounded-lg px-3 py-1.5 font-inter text-xs text-[#111827] flex items-center gap-2 cursor-pointer">
              <span>English</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}
