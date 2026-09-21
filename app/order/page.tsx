'use client'

import { useState, useActionState, Suspense, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createOrderAction } from './actions'
import type { ServiceType } from '@/lib/types/database.types'

const SERVICE_TITLES: Record<string, string> = {
  graphic_design: 'Graphic Design Request',
  ppt_design: 'PPT Design Request',
  video_editing: 'Video Editing Request',
  branding_kit: 'Branding Request',
  social_media: 'Social Media Request',
  banners_flex: 'Banners & Flex Request',
  business_card: 'Business Card Request',
  poster: 'Poster Request',
  brochure: 'Brochure Request',
}

const BRANDING_SUBTITLES: Record<string, string> = {
  'Starter Kit': 'Logo, Color Palette, Typography',
  'Business Kit': 'Logo, Brand colors, Social templates, Business card',
  'Premium Branding Kit': 'Logo, Brand guide, Social templates, Packaging, Business card',
}

function OrderFormContent() {
  const searchParams = useSearchParams()
  const rawService = searchParams.get('service') as ServiceType | null
  const selectedType = searchParams.get('type') || ''
  const customItemsParam = searchParams.get('items') || ''
  const currentService = rawService || 'graphic_design'

  const isBranding = currentService === 'branding_kit'

  // Dynamic Header Title & Subtitle for Branding vs Other Services
  const pageTitle = isBranding
    ? selectedType || 'Custom Kit'
    : SERVICE_TITLES[currentService] || 'Graphic Design Request'

  const pageSubtitle = isBranding
    ? customItemsParam || BRANDING_SUBTITLES[selectedType] || 'Logo, Brand guide, Social templates, Packaging, Business card'
    : 'Tell us about your project. Explain like you would to a friend!'

  // Form State
  const isVideo = currentService === 'video_editing'
  const defaultWhatYouWant = isVideo ? 'Explainer Video (<60sec)' : 'Brochure'
  const [creativeType, setCreativeType] = useState('Digital')
  const [whatYouWant, setWhatYouWant] = useState(selectedType || defaultWhatYouWant)
  const [numberOfSlides, setNumberOfSlides] = useState('')
  const [quantity, setQuantity] = useState('1')

  // Branding-Specific Fields
  const [brandName, setBrandName] = useState('')
  const [industry, setIndustry] = useState('')
  const [tagline, setTagline] = useState('')
  const [brandPersonality, setBrandPersonality] = useState('Bold')

  const [brief, setBrief] = useState('')
  
  // Content Help Toggle: 'no' = "No, I will Provide All the Copy Myself", 'yes' = "Yes, I Need Help with Content"
  const [needContentHelp, setNeedContentHelp] = useState<'no' | 'yes'>('no')
  const [copyContent, setCopyContent] = useState('')

  const [purpose, setPurpose] = useState('Social')
  const [assetLink, setAssetLink] = useState('')
  const [referenceLink, setReferenceLink] = useState('')
  const [stylePref, setStylePref] = useState('Modern')
  const [deadlinePref, setDeadlinePref] = useState('Standard')
  const [contactPref, setContactPref] = useState('Email')
  const [fullName, setFullName] = useState('')

  const [assetFiles, setAssetFiles] = useState<File[]>([])
  const [refFiles, setRefFiles] = useState<File[]>([])
  const [clientError, setClientError] = useState<string | null>(null)
  const [isDraggingRef, setIsDraggingRef] = useState(false)

  const assetInputRef = useRef<HTMLInputElement | null>(null)
  const refInputRef = useRef<HTMLInputElement | null>(null)

  const [state, formAction, isPending] = useActionState(createOrderAction, null)

  function syncRefFiles(newFiles: File[]) {
    setRefFiles(newFiles)
    if (clientError) setClientError(null)
    if (refInputRef.current) {
      try {
        const dt = new DataTransfer()
        newFiles.forEach((f) => dt.items.add(f))
        refInputRef.current.files = dt.files
      } catch {
        // Fallback if DataTransfer is not supported
      }
    }
  }

  function handleRemoveRefFile(indexToRemove: number) {
    const updated = refFiles.filter((_, idx) => idx !== indexToRemove)
    syncRefFiles(updated)
  }

  function handleRefDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDraggingRef(true)
  }

  function handleRefDragLeave(e: React.DragEvent) {
    e.preventDefault()
    setIsDraggingRef(false)
  }

  function handleRefDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDraggingRef(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      syncRefFiles([...refFiles, ...droppedFiles])
    }
  }

  function formatFileSize(bytes: number) {
    if (!bytes || bytes === 0) return '0 B'
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (isVideo) {
      const hasRefFile = refFiles.some((f) => f && f.size > 0)
      const hasRefLink = referenceLink.trim().length > 0
      if (!hasRefFile && !hasRefLink) {
        e.preventDefault()
        const msg = 'Please upload a reference video or provide a reference video link to proceed.'
        setClientError(msg)
        const section = document.getElementById('reference-video-section')
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        return
      }
    }
    setClientError(null)
  }

  const router = useRouter()
  function handleBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/dashboard')
    }
  }

  const constructedTitle = isBranding
    ? `Branding (${selectedType || 'Custom'}) - ${brandName || 'New Brand'}`
    : currentService === 'ppt_design'
    ? `PPT (${selectedType || 'Presentation'}) - ${numberOfSlides ? numberOfSlides + ' slides' : 'Custom'}`
    : `${whatYouWant || 'Design'} for ${purpose} (${creativeType})`

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* ── Top Back Navigation Bar ── */}
      <header className="bg-white border-b border-[#EDEDED] py-3.5 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto flex items-center justify-start">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 font-inter text-[14px] font-medium text-[#49454f] hover:text-[#2952E1] transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back</span>
          </button>
        </div>
      </header>

      {/* ── Form Container ── */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 pt-8">
        {/* Header Title & Subtitle */}
        <div className="mb-8">
          <h1 className="font-serif text-[30px] sm:text-[36px] text-[#111827] font-normal tracking-[-0.01em]">
            {pageTitle}
          </h1>
          <p className="font-inter text-[14px] sm:text-[15px] text-[#6f6f6f] mt-1">
            {pageSubtitle}
          </p>
        </div>

        {/* Error message */}
        {(clientError || state?.error) && (
          <div className="mb-6 rounded-[12px] bg-red-50 border border-red-200 p-4 font-inter text-sm text-red-700 flex items-center gap-2.5 shadow-xs">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-red-600">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{clientError || state?.error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} action={formAction} className="space-y-6">
          <input type="hidden" name="service_type" value={currentService} />
          <input type="hidden" name="title" value={constructedTitle} />
          <input type="hidden" name="brief" value={brief || 'Design request'} />
          <input type="hidden" name="deadline_pref" value={deadlinePref} />
          <input type="hidden" name="copy_content" value={copyContent} />
          <input type="hidden" name="need_content_help" value={needContentHelp} />
          <input type="hidden" name="asset_link" value={assetLink} />
          <input type="hidden" name="reference_link" value={referenceLink} />
          <input type="hidden" name="style_pref" value={stylePref} />
          <input type="hidden" name="contact_pref" value={contactPref} />
          <input type="hidden" name="quantity" value={quantity} />
          <input type="hidden" name="creative_type" value={creativeType} />
          <input type="hidden" name="purpose" value={purpose} />
          <input type="hidden" name="brand_name" value={brandName} />
          <input type="hidden" name="industry" value={industry} />
          <input type="hidden" name="tagline" value={tagline} />
          <input type="hidden" name="brand_personality" value={brandPersonality} />
          <input type="hidden" name="num_slides" value={numberOfSlides} />

          {/* ── Card 1: Main Project Inputs ── */}
          <div className="rounded-[20px] border border-[#EDEDED] bg-white p-6 sm:p-8 shadow-xs space-y-6">
            {isBranding ? (
              /* Branding Specific Fields */
              <>
                {/* Brand Name */}
                <div>
                  <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter your brand name"
                    className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 font-inter text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Ex: Edtech"
                    className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 font-inter text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Write your brand tagline, if have any"
                    className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 font-inter text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
                  />
                </div>

                {/* Brief, Instructions about your Brand */}
                <div>
                  <label className="block font-inter text-[14px] font-semibold text-[#111827]">
                    Brief, Instructions about your Brand
                  </label>
                  <p className="font-inter text-[12px] text-[#6f6f6f] mb-2">
                    Describe your idea in simple words. What should it say? Who is it for? Any key message?
                  </p>
                  <textarea
                    rows={4}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="This is for a Diwali offer campaign for our clothing store..."
                    className="w-full rounded-[10px] border border-[#EDEDED] bg-white p-4 font-inter text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all resize-y"
                  />
                </div>
              </>
            ) : currentService === 'ppt_design' ? (
              /* PPT Specific Fields */
              <div>
                <label className="block font-inter text-[14px] font-semibold text-[#111827]">
                  Number of Slides
                </label>
                <p className="font-inter text-[12px] text-[#6f6f6f] mb-2">
                  You can share any rough estimate if not sure about exact slide.
                </p>
                <input
                  type="text"
                  value={numberOfSlides}
                  onChange={(e) => setNumberOfSlides(e.target.value)}
                  placeholder="No of slides, ex: 20"
                  className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 font-inter text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
                />
              </div>
            ) : (
              /* Graphic Design / Default Fields */
              <>
                {/* Creative Type */}
                <div>
                  <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                    Creative Type
                  </label>
                  <select
                    value={creativeType}
                    onChange={(e) => setCreativeType(e.target.value)}
                    className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 font-inter text-[14px] text-[#111827] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
                  >
                    <option value="Digital">Digital</option>
                    <option value="Print">Print</option>
                    <option value="Both">Both (Digital & Print)</option>
                  </select>
                </div>

                {/* Tell us what you want */}
                <div>
                  <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                    Tell us what you want
                  </label>
                  <select
                    value={whatYouWant}
                    onChange={(e) => setWhatYouWant(e.target.value)}
                    className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 font-inter text-[14px] text-[#111827] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
                  >
                    {isVideo ? (
                      <>
                        <option value="Explainer Video (<60sec)">Explainer Video (&lt;60sec)</option>
                        <option value="YouTube Video (<10min)">YouTube Video (&lt;10min)</option>
                        <option value="YouTube Video (>10 min)">YouTube Video (&gt;10 min)</option>
                        <option value="Podcast Video">Podcast Video</option>
                        <option value="AI Real Estate Video">AI Real Estate Video</option>
                        <option value="AI Avatar Video">AI Avatar Video</option>
                        <option value="Animation Video">Animation Video</option>
                        <option value="Product Video">Product Video</option>
                        <option value="Other">Other</option>
                      </>
                    ) : (
                      <>
                        <option value="Brochure">Brochure</option>
                        <option value="Social Media Post">Social Media Post</option>
                        <option value="Banner / Flex">Banner / Flex</option>
                        <option value="Poster">Poster</option>
                        <option value="Business Card">Business Card</option>
                        <option value="Logo / Identity">Logo / Identity</option>
                        <option value="Thumbnail">Thumbnail</option>
                        <option value="Other">Other</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block font-inter text-[14px] font-semibold text-[#111827]">
                    Quantity
                  </label>
                  <p className="font-inter text-[12px] text-[#6f6f6f] mb-2">
                    Pages, Sides are considered as unique quantity.
                  </p>
                  <select
                    value={quantity || '1'}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 font-inter text-[14px] text-[#111827] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all cursor-pointer"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num.toString()}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {!isBranding && (
              /* Brief for non-branding */
              <div>
                <label className="block font-inter text-[14px] font-semibold text-[#111827]">
                  Brief, Instructions or Content
                </label>
                <p className="font-inter text-[12px] text-[#6f6f6f] mb-2">
                  Describe your idea in simple words. What should it say? Who is it for? Any key message?
                </p>
                <textarea
                  rows={4}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="This is for a Diwali offer campaign for our clothing store..."
                  className="w-full rounded-[10px] border border-[#EDEDED] bg-white p-4 font-inter text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all resize-y"
                />
              </div>
            )}

            {/* Need Help with Writing Content Copy? */}
            <div>
              <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-3">
                Need Help with Writing Content Copy?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNeedContentHelp('no')}
                  className={`rounded-[10px] py-3.5 px-4 font-inter text-[14px] font-medium text-center transition-all ${
                    needContentHelp === 'no'
                      ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                      : 'border border-[#EDEDED] bg-white text-[#111827] hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  No, I will Provide All the Copy Myself
                </button>

                <button
                  type="button"
                  onClick={() => setNeedContentHelp('yes')}
                  className={`rounded-[10px] py-3.5 px-4 font-inter text-[14px] font-medium text-center transition-all ${
                    needContentHelp === 'yes'
                      ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                      : 'border border-[#EDEDED] bg-white text-[#111827] hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Yes, I Need Help with Content
                </button>
              </div>
            </div>

            {/* Copy Content for the creative (Shown ONLY when user selects NO, I will Provide Copy Myself) */}
            {needContentHelp === 'no' && (
              <div className="pt-2 animate-fadeIn">
                <label className="block font-inter text-[14px] font-semibold text-[#111827] mb-2">
                  Copy Content for the creative
                </label>
                <textarea
                  rows={4}
                  value={copyContent}
                  onChange={(e) => setCopyContent(e.target.value)}
                  placeholder="This is for a Diwali offer campaign for our clothing store..."
                  className="w-full rounded-[10px] border border-[#EDEDED] bg-white p-4 font-inter text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all resize-y"
                />
              </div>
            )}
          </div>

          {/* ── Card 2: Brand Personality (for Branding) OR Purpose of design (for others) ── */}
          {isBranding ? (
            <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 sm:p-8 shadow-xs">
              <label className="block font-inter text-[15px] font-semibold text-[#111827] mb-4">
                Brand Personality
              </label>
              <div className="flex flex-wrap gap-3">
                {['Bold', 'Minimal', 'Premium', 'Playful', 'Not Specified'].map((item) => {
                  const isSelected = brandPersonality === item
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setBrandPersonality(item)}
                      className={`rounded-[10px] py-3 px-5 font-inter text-[14px] font-medium text-center transition-all ${
                        isSelected
                          ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                          : 'border border-[#EDEDED] bg-white text-[#111827] hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 sm:p-8 shadow-xs">
              <label className="block font-inter text-[15px] font-semibold text-[#111827] mb-4">
                Purpose of design
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Social', 'Work', 'Business', 'Study'].map((item) => {
                  const isSelected = purpose === item
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setPurpose(item)}
                      className={`rounded-[10px] py-3 px-4 font-inter text-[14px] font-medium text-center transition-all ${
                        isSelected
                          ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                          : 'border border-[#EDEDED] bg-white text-[#111827] hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Card 3: Upload Design Assets ── */}
          <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 sm:p-8 shadow-xs">
            <h3 className="font-inter text-[15px] font-semibold text-[#111827]">
              Upload Design Assets
            </h3>
            <p className="font-inter text-[12px] text-[#6f6f6f] mt-0.5 mb-4">
              Brand files, logo, design elements, guidelines or any other assets that you want to be in the design
            </p>

            {/* Drag and Drop Zone */}
            <div
              onClick={() => assetInputRef.current?.click()}
              className="border-2 border-dashed border-[#D1D5DB] hover:border-[#2952E1] bg-[#FAFBFD] rounded-[12px] p-8 text-center cursor-pointer transition-colors"
            >
              <input
                ref={assetInputRef}
                name="asset_files"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    setAssetFiles(Array.from(e.target.files))
                  }
                }}
              />
              <div className="mx-auto w-10 h-10 rounded-full bg-[#EAEFFF] text-[#2952E1] flex items-center justify-center mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className="font-inter text-[14px] font-medium text-[#111827]">
                Click to upload or drag and drop
              </p>
              <p className="font-inter text-[12px] text-[#6f6f6f] mt-1">
                PNG, JPG, PDF up to 10MB
              </p>

              {assetFiles.length > 0 && (
                <div className="mt-3 text-xs text-[#2952E1] font-medium">
                  {assetFiles.length} file(s) selected: {assetFiles.map(f => f.name).join(', ')}
                </div>
              )}
            </div>

            <div className="relative flex items-center justify-center my-4">
              <div className="w-full border-t border-[#EDEDED]" />
              <span className="absolute bg-white px-3 font-inter text-[12px] text-[#9CA3AF]">
                or
              </span>
            </div>

            <input
              type="text"
              value={assetLink}
              onChange={(e) => setAssetLink(e.target.value)}
              placeholder="Paste a Link of Brand Guideline, Logo, or any other file"
              className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 font-inter text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
            />
          </div>

          {/* ── Card 4: Upload references (mandatory for video editing) ── */}
          <div
            id="reference-video-section"
            className={`rounded-[16px] border bg-white p-6 sm:p-8 shadow-xs transition-all ${
              isVideo && clientError && refFiles.length === 0 && !referenceLink.trim()
                ? 'border-[#DC2626] ring-2 ring-[#DC2626]/20'
                : 'border-[#EDEDED]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3 className="font-inter text-[15px] font-semibold text-[#111827] flex items-center gap-1.5">
                {isVideo ? (
                  <>
                    Upload reference video
                    <span className="text-[#DC2626] text-base font-bold" title="Required">*</span>
                  </>
                ) : (
                  'Upload references (optional)'
                )}
              </h3>
              {isVideo && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF2F2] border border-[#FCA5A5] px-2.5 py-0.5 font-inter text-[11px] font-semibold text-[#DC2626] uppercase tracking-wider">
                  Required
                </span>
              )}
            </div>

            <p className="font-inter text-[12px] text-[#6f6f6f] mt-0.5 mb-4">
              {isVideo
                ? 'Upload a reference video or sample footage that illustrates your desired editing style, pacing, tone, or format.'
                : 'Images, links, or files that inspire you'}
            </p>

            {isVideo && clientError && refFiles.length === 0 && !referenceLink.trim() && (
              <div className="mb-4 rounded-[10px] bg-[#FEF2F2] border border-[#FCA5A5] p-3 font-inter text-[13px] text-[#B91C1C] flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#DC2626]">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>Reference video is required. Please upload a reference video file or provide a video link below.</span>
              </div>
            )}

            <div
              onClick={() => refInputRef.current?.click()}
              onDragOver={handleRefDragOver}
              onDragLeave={handleRefDragLeave}
              onDrop={handleRefDrop}
              className={`border-2 border-dashed rounded-[12px] p-8 text-center cursor-pointer transition-all ${
                isDraggingRef
                  ? 'border-[#2952E1] bg-[#EEF2FF]'
                  : 'border-[#D1D5DB] hover:border-[#2952E1] bg-[#FAFBFD]'
              }`}
            >
              <input
                ref={refInputRef}
                name="ref_files"
                type="file"
                multiple
                accept={isVideo ? 'video/*, .mp4, .mov, .avi, .mkv, .webm, .wmv, .flv, .m4v, .3gp, .ts' : undefined}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const selected = Array.from(e.target.files)
                    syncRefFiles([...refFiles, ...selected])
                  }
                }}
              />
              <div className="mx-auto w-12 h-12 rounded-full bg-[#EAEFFF] text-[#2952E1] flex items-center justify-center mb-2">
                {isVideo ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                )}
              </div>
              <p className="font-inter text-[14px] font-medium text-[#111827]">
                {isVideo
                  ? 'Click to upload or drag and drop reference video'
                  : 'Click to upload or drag and drop'}
              </p>
              <p className="font-inter text-[12px] text-[#6f6f6f] mt-1">
                {isVideo
                  ? 'Any video format is acceptable (MP4, MOV, AVI, WebM, MKV, etc.)'
                  : 'PNG, JPG, PDF up to 10MB'}
              </p>
            </div>

            {/* Selected files list */}
            {refFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="font-inter text-[12px] font-semibold text-[#374151]">
                  Selected {isVideo ? 'video' : 'reference'} file{refFiles.length > 1 ? 's' : ''} ({refFiles.length}):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {refFiles.map((file, idx) => (
                    <div
                      key={`${file.name}-${idx}`}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] text-left"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="shrink-0 w-8 h-8 rounded-md bg-[#EEF2FF] text-[#2952E1] flex items-center justify-center">
                          {isVideo ? (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="23 7 16 12 23 17 23 7" />
                              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                          ) : (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-inter text-[13px] font-medium text-[#111827] truncate">
                            {file.name}
                          </p>
                          <p className="font-inter text-[11px] text-[#6B7280]">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveRefFile(idx)
                        }}
                        className="shrink-0 w-6 h-6 rounded-full hover:bg-red-50 text-[#9CA3AF] hover:text-[#DC2626] flex items-center justify-center transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="relative flex items-center justify-center my-4">
              <div className="w-full border-t border-[#EDEDED]" />
              <span className="absolute bg-white px-3 font-inter text-[12px] text-[#9CA3AF]">
                or
              </span>
            </div>

            <input
              type="text"
              value={referenceLink}
              onChange={(e) => {
                setReferenceLink(e.target.value)
                if (clientError) setClientError(null)
              }}
              placeholder={
                isVideo
                  ? 'Or paste link to reference video (Google Drive, YouTube, Vimeo, Loom, Dropbox, etc.)'
                  : 'Describe in text or Share links from Canva, Pinterest, Instagram, YouTube etc.'
              }
              className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 font-inter text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#2952E1] focus:ring-1 focus:ring-[#2952E1] transition-all"
            />
          </div>

          {/* ── Card 5: Style preference (non-branding) ── */}
          {!isBranding && (
            <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 sm:p-8 shadow-xs">
              <label className="block font-inter text-[15px] font-semibold text-[#111827] mb-4">
                Style preference
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Modern', 'Minimal', 'Bold', 'Not sure'].map((item) => {
                  const isSelected = stylePref === item
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setStylePref(item)}
                      className={`rounded-[10px] py-3 px-4 font-inter text-[14px] font-medium text-center transition-all ${
                        isSelected
                          ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                          : 'border border-[#EDEDED] bg-white text-[#111827] hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Card 6: Deadline preference ── */}
          <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 sm:p-8 shadow-xs">
            <label className="block font-inter text-[15px] font-semibold text-[#111827] mb-4">
              Deadline preference
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Flexible', 'Standard', 'Urgent'].map((item) => {
                const isSelected = deadlinePref === item
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setDeadlinePref(item)}
                    className={`rounded-[10px] py-3 px-4 font-inter text-[14px] font-medium text-center transition-all ${
                      isSelected
                        ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold shadow-xs'
                        : 'border border-[#EDEDED] bg-white text-[#111827] hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-[#F3F4F6]">
              <p className="font-inter text-[13px] font-semibold text-[#111827]">
                Expected: <span className="font-bold">{isBranding ? '6-7 Days' : '4-5 Days'}</span>
              </p>
              <p className="font-inter text-[12px] text-[#6f6f6f] mt-0.5">
                We will notify you of any changes, and will try to push deadline based on your preference.
              </p>
            </div>
          </div>

          {/* ── Card 7: Contact preference ── */}
          <div className="rounded-[16px] border border-[#EDEDED] bg-white p-6 sm:p-8 shadow-xs">
            <label className="block font-inter text-[15px] font-semibold text-[#111827] mb-4">
              Contact preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setContactPref('Email')}
                className={`rounded-[10px] py-3 px-4 font-inter text-[14px] font-medium text-center transition-all ${
                  contactPref === 'Email'
                    ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold'
                    : 'border border-[#EDEDED] bg-white text-[#111827] hover:bg-gray-50'
                }`}
              >
                Email
              </button>

              <button
                type="button"
                onClick={() => setContactPref('WhatsApp')}
                className={`rounded-[10px] py-3 px-4 font-inter text-[14px] font-medium text-center transition-all ${
                  contactPref === 'WhatsApp'
                    ? 'border-2 border-[#2952E1] bg-[#2952E1]/5 text-[#2952E1] font-semibold'
                    : 'border border-[#EDEDED] bg-white text-[#111827] hover:bg-gray-50'
                }`}
              >
                WhatsApp
              </button>

              <div className="relative">
                <input
                  type={contactPref === 'Email' ? 'email' : 'tel'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={contactPref === 'Email' ? 'Email address' : 'WhatsApp number'}
                  className="w-full rounded-[10px] border border-[#EDEDED] bg-white pl-4 pr-10 py-3 font-inter text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#2952E1]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                  {contactPref === 'Email' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center justify-center rounded-full border border-[#2952E1] bg-white px-10 sm:px-14 py-3 font-inter font-medium text-[15px] text-[#2952E1] hover:bg-[#2952E1]/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-full bg-[#2952E1] px-12 sm:px-16 py-3 font-inter font-medium text-[15px] text-white shadow-md hover:bg-[#1e42c7] transition-all disabled:opacity-60"
            >
              {isPending ? 'Submitting…' : 'Next'}
            </button>
          </div>

          {/* ── Pink Payment Note ── */}
          <div className="rounded-[12px] bg-[#FFF1F5] border border-[#FBCFE8] p-4 flex items-center gap-3 text-[#BE185D] mt-6">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-[#DB2777]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <p className="font-inter text-[13px] sm:text-[14px] leading-snug">
              <strong className="font-semibold">Payment:</strong> After submitting, you&apos;ll receive a payment link via email. Once paid, your designer will start working on your project!
            </p>
          </div>

          {/* ── Satisfaction & Refund Guarantee Note ── */}
          <div className="rounded-[12px] bg-[#F0F5FF] border border-[#BFDBFE] p-4 flex items-start gap-3 text-[#1E40AF] mt-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB] mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-inter text-[13px] sm:text-[13.5px] font-semibold text-[#1E3A8A]">
                Not happy with the final output?
              </p>
              <p className="font-inter text-[12px] sm:text-[12.5px] text-[#1E40AF] leading-relaxed">
                We’ll give you the applicable revision rounds to get it right. If you&apos;re still not satisfied after all revisions, Menew will refund 50% of your order amount.
              </p>
              <p className="font-inter text-[11px] sm:text-[11.5px] text-[#3B82F6] mt-0.5">
                The refund applies when the request is within the original brief and scope and is made before the order is approved or closed.{" "}
                <Link href="/refund-policy" target="_blank" className="underline font-medium hover:text-[#1D4ED8]">
                  Read full policy
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-inter text-black/40">Loading…</div>}>
      <OrderFormContent />
    </Suspense>
  )
}
