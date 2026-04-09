'use client'

import { useState, useTransition } from 'react'

interface MessageInputProps {
  onSend: (body: string) => Promise<{ error?: string }>
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [body, setBody] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleSend() {
    const trimmed = body.trim()
    if (!trimmed) return
    startTransition(async () => {
      const result = await onSend(trimmed)
      if (result?.error) {
        setError(result.error)
      } else {
        setBody('')
        setError(null)
      }
    })
  }

  return (
    <div className="flex flex-col gap-2">
      {error && <p className="font-inter text-xs text-red-500">{error}</p>}
      <div className="flex gap-2 items-end">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          placeholder="Type a message… (Enter to send)"
          rows={2}
          className="flex-1 resize-none rounded-xl border border-black/20 px-4 py-3 font-inter text-sm text-[#1d2433] outline-none placeholder:text-black/40 focus:border-[#184043] transition-colors"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isPending || !body.trim()}
          className="flex h-[52px] w-12 shrink-0 items-center justify-center rounded-xl bg-[#184043] text-white transition-colors hover:bg-[#184043]/90 disabled:opacity-40"
        >
          {isPending ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-spin">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
