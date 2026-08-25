import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logoutAction } from '@/app/auth/actions'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { CreateTodaySection } from '@/components/sections/CreateTodaySection'
import { PaymentSuccessModal } from '@/components/dashboard/PaymentSuccessModal'
import { SERVICE_CONFIG, STATUS_LABELS } from '@/lib/types/order.types'
import type { ServiceType } from '@/lib/types/database.types'

const showcaseCards: Array<{
  title: string
  description: string
  deliveryTag: string
  image: string
  slug: ServiceType
}> = [
  {
    title: 'Graphic Design',
    description: 'Social posts, banners, brand assets',
    deliveryTag: 'Same Day Delivery',
    image: '/images/graphic-design.jpg',
    slug: 'graphic_design',
  },
  {
    title: 'Video Editing',
    description: 'Reels, ads, YouTube, short-form',
    deliveryTag: '12–24 hours',
    image: '/images/video-editing.jpg',
    slug: 'video_editing',
  },
  {
    title: '3D / Motion Design',
    description: 'Product visuals, animations, explainers',
    deliveryTag: '48–72 hours',
    image: '/images/3d-motion.jpg',
    slug: '3d_motion',
  },
  {
    title: 'Branding Kit',
    description: 'Logos, Brand guidelines',
    deliveryTag: '48 hours',
    image: '/images/branding-kit.jpg',
    slug: 'branding_kit',
  },
  {
    title: 'Thumbnail',
    description: 'YouTube & social media',
    deliveryTag: '12 hours',
    image: '/images/thumbnail.jpg',
    slug: 'thumbnail',
  },
  {
    title: 'PPT Design',
    description: 'Investor ready Pitch Decks, Presentations Slides',
    deliveryTag: '24 hours',
    image: '/images/ppt-design.jpg',
    slug: 'ppt_design',
  },
]

function getServiceLink(slug: ServiceType) {
  if (slug === 'video_editing') return '/services/video-editing';
  if (slug === 'ppt_design') return '/services/ppt';
  if (slug === 'branding_kit') return '/services/branding';
  return `/order?service=${slug}`;
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single()

  const { data: orders } = await supabase
    .from('orders')
    .select('id, service_type, title, status, created_at')
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false })

  const rawName = profile?.full_name?.trim() || user.email?.split('@')[0] || 'User'
  const firstName = rawName.split(' ')[0]
  const avatarInitials = firstName.charAt(0).toUpperCase()
  
  // Demo 2 orders matching the user's Figma screenshot
  const demoProjects = [
    {
      id: 'demo-1',
      serviceType: 'Video Editing',
      title: 'Promotional campaign reel for the New Customers to post on our brand page on instagram',
      orderedDate: 'Ordered: 2 Jan 2026',
      expectedDate: 'Expected: 12 Jan 2026',
      statusText: 'Payment Pending',
      statusStyle: 'bg-[#FFEFDB] text-[#D97706] border border-[#FDE68A]',
      href: '/cart?sample=true',
    },
    {
      id: 'demo-2',
      serviceType: 'Video Editing',
      title: 'Promotional campaign reel for the New Customers to post on our brand page on instagram',
      orderedDate: 'Ordered: 6 Jan 2026',
      expectedDate: 'Expected: 12 Jan 2026',
      statusText: 'Order Confirmed',
      statusStyle: 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]',
      href: '/cart?sample=true',
    },
  ]

  const displayProjects = orders && orders.length > 0
    ? orders.slice(0, 4).map((o) => {
        const service = SERVICE_CONFIG[o.service_type as ServiceType]
        const isCompleted = o.status === 'completed'
        return {
          id: o.id,
          serviceType: service?.label || 'Design Service',
          title: o.title || 'Creative request',
          orderedDate: `Ordered: ${new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`,
          expectedDate: `Expected: ${new Date(new Date(o.created_at).getTime() + 10 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`,
          statusText: STATUS_LABELS[o.status] || o.status,
          statusStyle: isCompleted ? 'bg-[#059669] text-white' : 'bg-[#FFEFDB] text-[#D97706] border border-[#FDE68A]',
          href: `/cart`,
        }
      })
    : demoProjects

  const ordersBadgeCount = orders && orders.length > 0 ? orders.length : displayProjects.length

  const isAdminUser = profile?.role === 'admin'

  return (
    <div className="bg-white min-h-screen">
      {/* ── Payment Success Modal (shown when payment_success=true query param is present) ── */}
      <PaymentSuccessModal />

      {/* ── Logged In Top Navbar ── */}
      <DashboardHeader
        ordersCount={ordersBadgeCount}
        avatarInitials={avatarInitials}
        isLoggedIn={true}
        isAdmin={isAdminUser}
      />

      {/* ── Admin Mode Banner ── */}
      {isAdminUser && (
        <div className="bg-[#184043] text-white px-4 py-3 border-b border-white/10">
          <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="bg-[#2952E1] text-white text-[11px] font-bold px-2 py-0.5 rounded font-inter uppercase">
                Admin Mode
              </span>
              <p className="font-inter text-xs sm:text-sm font-medium text-white/90">
                Logged in as Admin ({profile?.full_name || profile?.email}). Manage orders, creatives, users, payments, & team.
              </p>
            </div>
            <Link
              href="/admin"
              className="shrink-0 bg-[#2952E1] hover:bg-[#1e42c7] text-white font-inter text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs"
            >
              Go to Admin Panel →
            </Link>
          </div>
        </div>
      )}

      {/* ── Section 1: Greeting & Quick Services ── */}
      <section className="pt-10 pb-8 px-4 sm:px-8 max-w-[1360px] mx-auto text-center">
        <p className="font-inter text-[15px] sm:text-[16px] text-[#595959] font-medium mb-2">
          Welcome {firstName}!
        </p>
        <h1 className="font-serif text-[30px] sm:text-[40px] md:text-[46px] text-[#111827] font-normal tracking-[-0.01em] mb-8">
          Tell us what creative service you&apos;re after!
        </h1>

        {/* 9 Service Tiles */}
        <CreateTodaySection />

        <div className="mt-6 text-center">
          <p className="font-inter text-[12px] sm:text-[13px] text-[#79747e] font-medium">
            Raise a Request In Just 2 mins &nbsp;&bull;&nbsp; &#9733; 4.8 Service Rating &nbsp;&bull;&nbsp; &#9733; 12K+ Customers base
          </p>
        </div>
      </section>

      {/* ── Section 2: You Order, We Deliver! ── */}
      <section className="py-10 px-4 sm:px-8 max-w-[1360px] mx-auto border-t border-[#EDEDED]">
        <h2 className="font-serif text-[24px] sm:text-[28px] text-[#111827] font-normal mb-6">
          You Order, We Deliver!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseCards.map((card) => (
            <Link
              key={card.title}
              href={getServiceLink(card.slug)}
              className="group rounded-[16px] border border-[#EDEDED] bg-white overflow-hidden shadow-xs transition-all hover:shadow-md hover:border-[#2952E1]/40 hover:-translate-y-1"
            >
              <div className="relative h-[200px] w-full overflow-hidden bg-gray-100">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-[19px] font-semibold text-[#111827] group-hover:text-[#2952E1] transition-colors">
                    {card.title}
                  </h3>
                  <p className="font-inter text-[13px] text-[#6f6f6f] mt-1">
                    {card.description}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-block rounded-[4px] bg-[#FFEFDB] px-3 py-1 font-inter text-[12px] font-medium text-[#D97706]">
                    {card.deliveryTag}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Section 3: Recent Projects ── */}
      <section id="recent-projects" className="py-10 px-4 sm:px-8 max-w-[1360px] mx-auto border-t border-[#EDEDED]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-[24px] sm:text-[28px] text-[#111827] font-normal">
            Recent Projects
          </h2>
          <Link href="/cart" className="font-inter font-medium text-[14px] text-[#2952E1] hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayProjects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="rounded-[16px] border border-[#EDEDED] bg-white p-6 flex flex-col justify-between gap-4 shadow-xs transition-all hover:border-[#2952E1]/30 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-[#111827]">
                    {project.serviceType}
                  </h3>
                  <p className="font-inter text-[13px] text-[#6f6f6f] mt-2 leading-relaxed">
                    {project.title}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#EDEDED] shrink-0 text-[#111827]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                    <line x1="7" y1="2" x2="7" y2="22" />
                    <line x1="17" y1="2" x2="17" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[#F3F4F6]">
                <div className="flex flex-col text-[12px] sm:text-[13px] text-[#6f6f6f] font-medium">
                  <span>{project.orderedDate}</span>
                  {project.expectedDate && <span>{project.expectedDate}</span>}
                </div>
                <span className={`font-inter text-[12px] font-medium px-3 py-1 rounded-[4px] ${project.statusStyle}`}>
                  {project.statusText}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Section 4: New Quick Templates Designed for you ── */}
      <section className="py-10 px-4 sm:px-8 max-w-[1360px] mx-auto border-t border-[#EDEDED]">
        <h2 className="font-serif text-[24px] sm:text-[28px] text-[#111827] font-normal mb-6">
          New Quick Templates Designed for you
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 - Blue Gradient */}
          <Link href="/services/branding" className="rounded-[18px] bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] p-6 text-white h-[230px] flex flex-col justify-between relative overflow-hidden shadow-sm group transition-transform hover:-translate-y-1">
            <p className="font-inter text-[15px] font-medium leading-snug z-10 max-w-[200px]">
              Branding design that crafts a compelling brand narrative.
            </p>
            <div className="relative h-[105px] w-full mt-2 rounded-[12px] overflow-hidden opacity-90 transition-transform group-hover:scale-105">
              <Image src="/images/branding-kit.jpg" alt="Branding" fill className="object-cover" />
            </div>
          </Link>

          {/* Card 2 - Pink Gradient */}
          <Link href="/order?service=graphic_design" className="rounded-[18px] bg-gradient-to-br from-[#EC4899] to-[#DB2777] p-6 text-white h-[230px] flex flex-col justify-between relative overflow-hidden shadow-sm group transition-transform hover:-translate-y-1">
            <p className="font-inter text-[15px] font-medium leading-snug z-10 max-w-[200px]">
              Create eye-catching creatives for Holi
            </p>
            <div className="relative h-[105px] w-full mt-2 rounded-[12px] overflow-hidden opacity-90 transition-transform group-hover:scale-105">
              <Image src="/images/graphic-design.jpg" alt="Holi creatives" fill className="object-cover" />
            </div>
          </Link>

          {/* Card 3 - Emerald Gradient */}
          <Link href="/services/video-editing" className="rounded-[18px] bg-gradient-to-br from-[#10B981] to-[#059669] p-6 text-white h-[230px] flex flex-col justify-between relative overflow-hidden shadow-sm group transition-transform hover:-translate-y-1">
            <p className="font-inter text-[15px] font-medium leading-snug z-10 max-w-[200px]">
              Short promotional reel for product launches or offers.
            </p>
            <div className="relative h-[105px] w-full mt-2 rounded-[12px] overflow-hidden opacity-90 transition-transform group-hover:scale-105">
              <Image src="/images/video-editing.jpg" alt="Reel promo" fill className="object-cover" />
            </div>
          </Link>

          {/* Card 4 - Red Gradient */}
          <Link href="/services/ppt" className="rounded-[18px] bg-gradient-to-br from-[#EF4444] to-[#DC2626] p-6 text-white h-[230px] flex flex-col justify-between relative overflow-hidden shadow-sm group transition-transform hover:-translate-y-1">
            <p className="font-inter text-[15px] font-medium leading-snug z-10 max-w-[200px]">
              Investor pitch, sales deck, or internal presentation design.
            </p>
            <div className="relative h-[105px] w-full mt-2 rounded-[12px] overflow-hidden opacity-90 transition-transform group-hover:scale-105">
              <Image src="/images/ppt-design.jpg" alt="PPT pitch deck" fill className="object-cover" />
            </div>
          </Link>
        </div>
      </section>

      {/* ── Section 5: Logged In Footer ── */}
      <footer className="bg-white border-t border-[#EDEDED] pt-14 pb-8 px-4 sm:px-8 mt-6">
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
            {/* Social Icons */}
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

/* ── Social Icons ── */
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
