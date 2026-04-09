'use client'

const DEADLINE_OPTIONS = [
  { label: 'ASAP', value: 'asap' },
  { label: 'Within 24h', value: '24h' },
  { label: 'Within 48h', value: '48h' },
  { label: 'Within 72h', value: '72h' },
  { label: 'Custom date', value: 'custom' },
]

interface BriefStepProps {
  title: string
  brief: string
  deadlinePref: string
  customDeadline: string
  onTitleChange: (v: string) => void
  onBriefChange: (v: string) => void
  onDeadlinePrefChange: (v: string) => void
  onCustomDeadlineChange: (v: string) => void
}

export function BriefStep({
  title,
  brief,
  deadlinePref,
  customDeadline,
  onTitleChange,
  onBriefChange,
  onDeadlinePrefChange,
  onCustomDeadlineChange,
}: BriefStepProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="font-inter font-medium text-sm text-[#1d2433]">
          Order title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="e.g. Instagram post for product launch"
          maxLength={120}
          className="w-full rounded-lg border border-black/20 px-4 py-3 font-inter text-[15px] text-[#1d2433] outline-none placeholder:text-black/40 focus:border-[#184043] transition-colors"
        />
      </div>

      {/* Brief */}
      <div className="flex flex-col gap-2">
        <label className="font-inter font-medium text-sm text-[#1d2433]">
          Brief <span className="text-red-500">*</span>
        </label>
        <textarea
          value={brief}
          onChange={(e) => onBriefChange(e.target.value)}
          placeholder="Describe what you need — include style preferences, colors, dimensions, any reference links, and what the design is for."
          maxLength={500}
          rows={5}
          className="w-full resize-none rounded-lg border border-black/20 px-4 py-3 font-inter text-[15px] text-[#1d2433] outline-none placeholder:text-black/40 focus:border-[#184043] transition-colors"
        />
        <p className="text-right font-inter text-xs text-black/40">{brief.length}/500</p>
      </div>

      {/* Deadline */}
      <div className="flex flex-col gap-2">
        <label className="font-inter font-medium text-sm text-[#1d2433]">
          Deadline preference
        </label>
        <div className="flex flex-wrap gap-2">
          {DEADLINE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onDeadlinePrefChange(opt.value)}
              className={`rounded-full border px-4 py-2 font-inter text-sm transition-colors ${
                deadlinePref === opt.value
                  ? 'border-[#184043] bg-[#184043] text-white'
                  : 'border-black/20 bg-white text-[#1d2433] hover:border-[#184043]/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {deadlinePref === 'custom' && (
          <input
            type="date"
            value={customDeadline}
            onChange={(e) => onCustomDeadlineChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="mt-2 w-full rounded-lg border border-black/20 px-4 py-3 font-inter text-[15px] text-[#1d2433] outline-none focus:border-[#184043] transition-colors"
          />
        )}
      </div>
    </div>
  )
}
