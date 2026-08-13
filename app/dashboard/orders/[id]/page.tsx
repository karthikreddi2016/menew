import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { OrderTimeline } from '@/components/dashboard/OrderTimeline'
import { MessageThread } from '@/components/dashboard/MessageThread'
import { MessageInput } from '@/components/dashboard/MessageInput'
import { FileList } from '@/components/dashboard/FileList'
import { SERVICE_CONFIG } from '@/lib/types/order.types'
import { sendMessageAction } from './actions'
import type { OrderFile } from '@/lib/types/database.types'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Demo fallback order matching the Figma mockups
  const isDemo = id.startsWith('demo-')

  let orderData = {
    id: '23456789',
    service_type: 'graphic_design',
    title: 'Graphic Design',
    brief: 'Promotional campaign poster and digital creatives for our store.',
    status: isDemo && id === 'demo-2' ? 'completed' : 'in_progress',
    created_at: '2026-01-14T10:00:00Z',
    expected_delivery: '15 Jan 2026',
  }

  let rawFiles: OrderFile[] = []
  let messages: { id: string; body: string; created_at: string; sender_id: string; profiles?: { full_name: string | null } }[] = []

  if (!isDemo && user) {
    const { data: dbOrder } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (dbOrder) {
      orderData = {
        id: dbOrder.id.replace(/-/g, '').slice(0, 8).toUpperCase(),
        service_type: dbOrder.service_type,
        title: dbOrder.title || SERVICE_CONFIG[dbOrder.service_type as keyof typeof SERVICE_CONFIG]?.label || 'Graphic Design',
        brief: dbOrder.brief || '',
        status: dbOrder.status,
        created_at: dbOrder.created_at,
        expected_delivery: new Date(new Date(dbOrder.created_at).getTime() + (dbOrder.service_type === 'branding_kit' ? 6 : 1) * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      }

      const { data: filesData } = await supabase
        .from('order_files')
        .select('*')
        .eq('order_id', id)
      rawFiles = filesData || []

      const { data: msgsData } = await supabase
        .from('order_messages')
        .select('*, profiles!order_messages_sender_id_fkey(full_name)')
        .eq('order_id', id)
        .order('created_at', { ascending: true })
      messages = msgsData || []
    }
  }

  // Generate signed URLs for deliverables
  const files = await Promise.all(
    (rawFiles ?? []).map(async (file: OrderFile) => {
      if (file.file_role === 'deliverable') {
        const { data } = await supabase.storage
          .from('order-files')
          .createSignedUrl(file.storage_path, 3600)
        return { ...file, signedUrl: data?.signedUrl }
      }
      return { ...file, signedUrl: undefined }
    })
  )

  const service = SERVICE_CONFIG[orderData.service_type as keyof typeof SERVICE_CONFIG] || { label: 'Graphic Design' }

  async function sendMessage(body: string) {
    'use server'
    return sendMessageAction(id, body)
  }

  const formattedOrderDate = isDemo
    ? '14 Jan 2026'
    : new Date(orderData.created_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* ── Top Back Navigation Bar ── */}
      <header className="bg-white border-b border-[#EDEDED] py-3.5 px-4 sm:px-8 mb-8">
        <div className="max-w-[860px] mx-auto flex items-center justify-start">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 font-inter text-[14px] font-medium text-[#49454f] hover:text-[#2952E1] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back</span>
          </Link>
        </div>
      </header>

      {/* ── Main Order Tracking Container ── */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 space-y-6">
        {/* ── Card 1: Order Details Header Card ── */}
        <div className="bg-white rounded-[20px] border border-[#EDEDED] p-6 sm:p-8 shadow-xs">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-[28px] sm:text-[34px] font-normal text-[#111827]">
                {service.label}
              </h1>
            </div>

            {/* Three Dots Menu Button */}
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              aria-label="Options"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </button>
          </div>

          <div className="mt-4 space-y-1.5 font-inter text-[14px]">
            <p className="text-[#111827]">
              Order ID: <span className="font-semibold">{orderData.id}</span>
            </p>
            <p className="text-[#111827]">
              Ordered: <span className="font-normal text-[#111827]">{formattedOrderDate}</span>
            </p>
            <p className="text-[#111827]">
              Expected Delivery: <span className="font-normal text-[#111827]">{orderData.expected_delivery}</span>
            </p>
          </div>

          {/* Status Badge */}
          <div className="mt-5">
            {orderData.status === 'completed' ? (
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#059669] text-white font-inter text-[13px] font-semibold">
                Completed
              </span>
            ) : (
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-lg border border-[#10B981] text-[#10B981] bg-[#10B981]/5 font-inter text-[13px] font-semibold">
                Order Confirmed
              </span>
            )}
          </div>
        </div>

        {/* ── Card 2: Order Progress Stepper Card ── */}
        <OrderTimeline status={orderData.status as any} createdDate={orderData.created_at} />

        {/* ── Files & Messages Card (if files or messages exist) ── */}
        {(files.length > 0 || (messages && messages.length > 0)) && (
          <div className="bg-white rounded-[20px] border border-[#EDEDED] p-6 sm:p-8 shadow-xs space-y-6">
            {files.length > 0 && (
              <div>
                <h3 className="font-inter text-[16px] font-semibold text-[#111827] mb-3">Project Files</h3>
                <FileList files={files} role="reference" />
                <FileList files={files} role="deliverable" />
              </div>
            )}

            {user && (
              <div>
                <h3 className="font-inter text-[16px] font-semibold text-[#111827] mb-3">Messages</h3>
                <MessageThread
                  messages={(messages ?? []) as Parameters<typeof MessageThread>[0]['messages']}
                  currentUserId={user.id}
                />
                {orderData.status !== 'completed' && orderData.status !== 'cancelled' && (
                  <div className="mt-4">
                    <MessageInput onSend={sendMessage} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Pink Payment Notice Box ── */}
        <div className="rounded-[16px] bg-[#FFF1F5] border border-[#FBCFE8] p-5 flex items-center gap-3 text-[#BE185D]">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-[#DB2777]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <p className="font-inter text-[13px] sm:text-[14px] leading-snug">
            <strong className="font-semibold">Payment:</strong> After submitting, you&apos;ll receive a payment link via email. Once paid, your designer will start working on your project!
          </p>
        </div>
      </div>
    </div>
  )
}
