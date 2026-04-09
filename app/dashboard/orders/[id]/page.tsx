import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { OrderStatusBadge } from '@/components/dashboard/OrderStatusBadge'
import { OrderTimeline } from '@/components/dashboard/OrderTimeline'
import { MessageThread } from '@/components/dashboard/MessageThread'
import { MessageInput } from '@/components/dashboard/MessageInput'
import { FileList } from '@/components/dashboard/FileList'
import { SERVICE_CONFIG, STATUS_LABELS } from '@/lib/types/order.types'
import { sendMessageAction } from './actions'
import type { OrderFile, OrderMessage, Profile } from '@/lib/types/database.types'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch order (RLS ensures only owner can read)
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (!order) notFound()

  // Fetch files
  const { data: rawFiles } = await supabase
    .from('order_files')
    .select('*')
    .eq('order_id', id)

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

  // Fetch messages with sender names
  const { data: messages } = await supabase
    .from('order_messages')
    .select('*, profiles!order_messages_sender_id_fkey(full_name)')
    .eq('order_id', id)
    .order('created_at', { ascending: true })

  const service = SERVICE_CONFIG[order.service_type]

  async function sendMessage(body: string) {
    'use server'
    return sendMessageAction(id, body)
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      {/* Back */}
      <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1.5 font-inter text-sm text-black/50 hover:text-black/70 transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        All Orders
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left — main content */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Header card */}
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-inter text-xs text-black/40 mb-1">{service.label}</p>
                <h1 className="font-serif text-xl text-[#1d2433]">{order.title}</h1>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="mt-4">
              <p className="font-inter text-sm font-medium text-black/50 mb-1">Brief</p>
              <p className="font-inter text-sm text-[#1d2433] whitespace-pre-wrap">{order.brief}</p>
            </div>
            {order.deadline_pref && (
              <div className="mt-3 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#184043" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="font-inter text-sm text-[#184043]">Deadline: {order.deadline_pref}</p>
              </div>
            )}
          </div>

          {/* Files */}
          {files.length > 0 && (
            <div className="rounded-2xl border border-black/10 bg-white p-5 flex flex-col gap-4">
              <p className="font-inter text-sm font-semibold text-[#1d2433]">Files</p>
              <FileList files={files} role="reference" />
              <FileList files={files} role="deliverable" />
            </div>
          )}

          {/* Messages */}
          <div className="rounded-2xl border border-black/10 bg-white p-5 flex flex-col gap-4">
            <p className="font-inter text-sm font-semibold text-[#1d2433]">Messages</p>
            <MessageThread
              messages={(messages ?? []) as Parameters<typeof MessageThread>[0]['messages']}
              currentUserId={user.id}
            />
            {order.status !== 'completed' && order.status !== 'cancelled' && (
              <MessageInput onSend={sendMessage} />
            )}
          </div>
        </div>

        {/* Right — sidebar */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
          {/* Status timeline */}
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="font-inter text-sm font-semibold text-[#1d2433] mb-4">Progress</p>
            <OrderTimeline status={order.status} />
          </div>

          {/* Metadata */}
          <div className="rounded-2xl border border-black/10 bg-white p-5 flex flex-col gap-3">
            <MetaRow label="Order ID" value={`#${order.id.slice(0, 8).toUpperCase()}`} />
            <MetaRow label="Service" value={service.label} />
            <MetaRow label="Status" value={STATUS_LABELS[order.status]} />
            <MetaRow
              label="Created"
              value={new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            />
            {order.deadline_pref && <MetaRow label="Deadline" value={order.deadline_pref} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="font-inter text-xs text-black/40">{label}</p>
      <p className="font-inter text-sm text-[#1d2433]">{value}</p>
    </div>
  )
}
