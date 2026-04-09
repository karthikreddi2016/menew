'use client'

import { useRef, useState, useTransition } from 'react'

interface DeliverableUploadProps {
  orderId: string
  onUpload: (orderId: string, formData: FormData) => Promise<{ error?: string }>
}

export function DeliverableUpload({ orderId, onUpload }: DeliverableUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleFiles(incoming: FileList | null) {
    if (!incoming) return
    setFiles((prev) => [...prev, ...Array.from(incoming)].slice(0, 10))
  }

  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i))
  }

  function handleUpload() {
    if (files.length === 0) return
    startTransition(async () => {
      const fd = new FormData()
      files.forEach((f) => fd.append('files', f))
      const result = await onUpload(orderId, fd)
      if (result?.error) {
        setError(result.error)
        setSuccess(false)
      } else {
        setFiles([])
        setError(null)
        setSuccess(true)
      }
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 font-inter text-sm text-green-700">
          Files uploaded successfully! Order status updated to Delivered.
        </div>
      )}
      {error && <p className="font-inter text-xs text-red-500">{error}</p>}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-black/15 bg-white py-6 transition-colors hover:border-[#184043]/40 hover:bg-[#184043]/3"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#184043" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="font-inter text-sm font-medium text-[#184043]">Upload deliverables</p>
        <p className="font-inter text-xs text-black/40">Click or drag files here</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2">
              <p className="flex-1 truncate font-inter text-xs text-[#1d2433]">{f.name}</p>
              <button type="button" onClick={() => removeFile(i)} className="text-black/30 hover:text-red-400 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={isPending}
          className="rounded-full bg-[#d96d43] px-5 py-2.5 font-inter text-sm font-medium text-white transition-colors hover:bg-[#d96d43]/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? 'Uploading…' : `Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
        </button>
      )}
    </div>
  )
}
