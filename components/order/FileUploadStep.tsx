'use client'

import { useRef } from 'react'

const MAX_FILES = 5
const MAX_SIZE_MB = 50
const ALLOWED_TYPES = ['image/', 'application/pdf', 'application/zip', 'video/']

interface FileUploadStepProps {
  files: File[]
  onFilesChange: (files: File[]) => void
}

export function FileUploadStep({ files, onFilesChange }: FileUploadStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function addFiles(incoming: FileList | null) {
    if (!incoming) return
    const valid: File[] = []
    for (const file of Array.from(incoming)) {
      if (!ALLOWED_TYPES.some((t) => file.type.startsWith(t))) continue
      if (file.size > MAX_SIZE_MB * 1024 * 1024) continue
      valid.push(file)
    }
    const merged = [...files, ...valid].slice(0, MAX_FILES)
    onFilesChange(merged)
  }

  function removeFile(index: number) {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="font-inter text-sm text-black/60">
        Upload reference files, style guides, or examples. (Optional — max {MAX_FILES} files, {MAX_SIZE_MB}MB each)
      </p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files) }}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-black/20 bg-white/50 py-10 transition-colors hover:border-[#184043]/50 hover:bg-[#184043]/5"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#184043]/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#184043" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <div className="text-center">
          <p className="font-inter font-medium text-sm text-[#184043]">Click to upload or drag & drop</p>
          <p className="font-inter text-xs text-black/40 mt-0.5">Images, PDFs, ZIP, Video</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,application/zip,video/*"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file, i) => (
            <li key={i} className="flex items-center gap-3 rounded-lg border border-black/10 bg-white px-4 py-3">
              <FileIcon mime={file.type} />
              <div className="flex-1 min-w-0">
                <p className="truncate font-inter text-sm font-medium text-[#1d2433]">{file.name}</p>
                <p className="font-inter text-xs text-black/40">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {files.length >= MAX_FILES && (
        <p className="font-inter text-xs text-amber-600">Maximum {MAX_FILES} files reached.</p>
      )}
    </div>
  )
}

function FileIcon({ mime }: { mime: string }) {
  const color = mime.startsWith('image/') ? '#d96d43' : mime.startsWith('video/') ? '#2952e1' : '#184043'
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: color + '18' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    </div>
  )
}
