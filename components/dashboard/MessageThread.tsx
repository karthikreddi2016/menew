import type { OrderMessage, Profile } from '@/lib/types/database.types'

type MessageWithSender = OrderMessage & { profiles: Pick<Profile, 'full_name'> | null }

interface MessageThreadProps {
  messages: MessageWithSender[]
  currentUserId: string
}

export function MessageThread({ messages, currentUserId }: MessageThreadProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-black/5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#184043" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <p className="font-inter text-sm text-black/40">No messages yet. Start the conversation!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg) => {
        const isOwn = msg.sender_id === currentUserId
        return (
          <div key={msg.id} className={`flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}>
            <p className="font-inter text-xs text-black/40">
              {msg.profiles?.full_name ?? 'Unknown'} · {formatTime(msg.created_at)}
            </p>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 font-inter text-sm ${
                isOwn
                  ? 'rounded-br-sm bg-[#184043] text-white'
                  : 'rounded-bl-sm bg-black/5 text-[#1d2433]'
              }`}
            >
              {msg.body}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
