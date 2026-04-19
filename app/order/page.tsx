'use client'

import { useState, useActionState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ServiceSelector } from '@/components/order/ServiceSelector'
import { BriefStep } from '@/components/order/BriefStep'
import { FileUploadStep } from '@/components/order/FileUploadStep'
import { OrderConfirmStep } from '@/components/order/OrderConfirmStep'
import { createOrderAction } from './actions'
import type { ServiceType } from '@/lib/types/database.types'

const STEPS = ['Choose Service', 'Describe Your Need', 'Upload References', 'Confirm & Submit']

function OrderForm() {
  const searchParams = useSearchParams()
  const preselected = searchParams.get('service') as ServiceType | null

  const [step, setStep] = useState(preselected ? 1 : 0)
  const [serviceType, setServiceType] = useState<ServiceType | null>(preselected)
  const [title, setTitle] = useState('')
  const [brief, setBrief] = useState('')
  const [deadlinePref, setDeadlinePref] = useState('48h')
  const [customDeadline, setCustomDeadline] = useState('')
  const [files, setFiles] = useState<File[]>([])

  const [state, formAction, isPending] = useActionState(createOrderAction, null)

  function canAdvance() {
    if (step === 0) return !!serviceType
    if (step === 1) return title.trim().length > 0 && brief.trim().length > 0
    return true
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (step < STEPS.length - 1) {
      e.preventDefault()
      setStep((s) => s + 1)
    }
    // on final step, form submits normally via action
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <div className="bg-white border-b border-black/10 px-4 py-4 md:px-[70px]">
        <div className="mx-auto max-w-[900px] flex items-center justify-between">
          <Link href="/" className="font-inter text-sm text-black/50 hover:text-black/70 transition-colors">
            ← Back to home
          </Link>
          <p className="font-serif text-lg text-[#184043]">Place an Order</p>
          <div className="w-24" />
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-8 md:px-8">
        {/* Step indicators */}
        <div className="mb-8 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-inter text-xs font-medium transition-colors ${
                    i < step
                      ? 'bg-[#184043] text-white'
                      : i === step
                      ? 'bg-[#184043] text-white ring-4 ring-[#184043]/20'
                      : 'bg-black/10 text-black/40'
                  }`}
                >
                  {i < step ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`hidden sm:block font-inter text-xs ${i === step ? 'font-medium text-[#184043]' : 'text-black/40'}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px transition-colors ${i < step ? 'bg-[#184043]' : 'bg-black/15'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Error */}
        {state?.error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 font-inter text-sm text-red-700">
            {state.error}
          </div>
        )}

        {/* Step content */}
        <div className="rounded-2xl bg-white border border-black/8 p-6 md:p-8 shadow-sm">
          <h2 className="mb-6 font-serif text-xl text-[#1d2433]">{STEPS[step]}</h2>

          <form onSubmit={handleSubmit} action={formAction}>
            {/* Hidden fields for server action */}
            <input type="hidden" name="service_type" value={serviceType ?? ''} />
            <input type="hidden" name="title" value={title} />
            <input type="hidden" name="brief" value={brief} />
            <input type="hidden" name="deadline_pref" value={deadlinePref === 'custom' ? customDeadline : deadlinePref} />
            {files.map((f, i) => (
              // files are appended to FormData in a hidden file input trick — handled client-side via FileUploadStep state
              // actual upload happens through FormData in server action via a hidden input population
              <span key={i} style={{ display: 'none' }} />
            ))}

            {step === 0 && (
              <ServiceSelector selected={serviceType} onSelect={(s) => { setServiceType(s); }} />
            )}
            {step === 1 && (
              <BriefStep
                title={title}
                brief={brief}
                deadlinePref={deadlinePref}
                customDeadline={customDeadline}
                onTitleChange={setTitle}
                onBriefChange={setBrief}
                onDeadlinePrefChange={setDeadlinePref}
                onCustomDeadlineChange={setCustomDeadline}
              />
            )}
            {step === 2 && (
              <FileUploadStep files={files} onFilesChange={setFiles} />
            )}
            {step === 3 && serviceType && (
              <OrderConfirmStep
                serviceType={serviceType}
                title={title}
                brief={brief}
                deadlinePref={deadlinePref}
                customDeadline={customDeadline}
                files={files}
              />
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-full border border-black/20 px-6 py-3 font-inter text-sm text-[#1d2433] transition-colors hover:bg-black/5"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < STEPS.length - 1 ? (
                <button
                  type="submit"
                  disabled={!canAdvance()}
                  className="rounded-full bg-[#184043] px-8 py-3 font-inter font-medium text-sm text-white transition-colors hover:bg-[#184043]/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              ) : (
                <SubmitButton isPending={isPending} files={files} />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function SubmitButton({ isPending, files }: { isPending: boolean; files: File[] }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="rounded-full bg-[#d96d43] px-8 py-3 font-inter font-medium text-sm text-white transition-colors hover:bg-[#d96d43]/90 disabled:opacity-60 disabled:cursor-not-allowed"
      onClick={(e) => {
        // Attach files to the form before submit
        const form = (e.target as HTMLButtonElement).closest('form')!
        // Remove old file inputs
        form.querySelectorAll('input[data-file-upload]').forEach((el) => el.remove())
        // Add new file inputs for each file (workaround: files are in state, we inject a DataTransfer)
        if (files.length > 0) {
          const dt = new DataTransfer()
          files.forEach((f) => dt.items.add(f))
          const input = document.createElement('input')
          input.type = 'file'
          input.name = 'files'
          input.multiple = true
          input.setAttribute('data-file-upload', 'true')
          input.style.display = 'none'
          input.files = dt.files
          form.appendChild(input)
        }
      }}
    >
      {isPending ? 'Submitting…' : 'Submit Order'}
    </button>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-inter text-black/40">Loading…</div>}>
      <OrderForm />
    </Suspense>
  )
}
