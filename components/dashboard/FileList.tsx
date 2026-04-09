import type { OrderFile } from '@/lib/types/database.types'

interface FileListProps {
  files: (OrderFile & { signedUrl?: string })[]
  role: 'reference' | 'deliverable'
}

export function FileList({ files, role }: FileListProps) {
  const label = role === 'reference' ? 'Reference Files' : 'Deliverables'
  const filtered = files.filter((f) => f.file_role === role)

  if (filtered.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <p className="font-inter text-sm font-semibold text-[#1d2433]">{label}</p>
      <ul className="flex flex-col gap-2">
        {filtered.map((file) => (
          <li key={file.id} className="flex items-center gap-3 rounded-lg border border-black/10 bg-white px-4 py-3">
            <FileIcon mime={file.mime_type ?? ''} />
            <div className="flex-1 min-w-0">
              <p className="truncate font-inter text-sm font-medium text-[#1d2433]">{file.file_name}</p>
              {file.file_size && (
                <p className="font-inter text-xs text-black/40">{(file.file_size / 1024 / 1024).toFixed(2)} MB</p>
              )}
            </div>
            {role === 'deliverable' && file.signedUrl && (
              <a
                href={file.signedUrl}
                download={file.file_name}
                className="flex items-center gap-1.5 rounded-full bg-[#184043] px-3 py-1.5 font-inter text-xs font-medium text-white hover:bg-[#184043]/90 transition-colors shrink-0"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </a>
            )}
          </li>
        ))}
      </ul>
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
