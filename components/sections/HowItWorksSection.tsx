import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui";

export function HowItWorksSection() {
  return (
    <section id="process" className="bg-white py-16 sm:py-24 border-t border-[#F0F0F0]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Sticky Steps & CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-8">
            {/* Step 01 */}
            <div className="flex flex-col gap-2">
              <span className="font-inter text-[15px] sm:text-[16px] font-medium text-[#2952E1] leading-[24px] tracking-wide">
                Step 01
              </span>
              <h3 className="font-serif text-[28px] sm:text-[32px] font-normal text-[#000000] leading-[38px] sm:leading-[48px] tracking-[-0.25px]">
                Tell the idea
              </h3>
              <p className="font-inter text-[15px] sm:text-[16px] leading-[24px] text-black/70 mt-1 max-w-[420px] tracking-[-0.2px]">
                Describe your task, upload references, a real designer gets to work, we improve with your inputs, and deliver designs you can confidently use.
              </p>
            </div>

            {/* Step 02 */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#F0F0F0]/80">
              <span className="font-inter text-[15px] sm:text-[16px] font-medium text-[#2952E1] leading-[24px] tracking-wide">
                Step 02
              </span>
              <h3 className="font-serif text-[28px] sm:text-[32px] font-normal text-[#000000]/40 leading-[38px] sm:leading-[48px] tracking-[-0.25px]">
                Team gets to work
              </h3>
            </div>

            {/* Step 03 */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#F0F0F0]/80">
              <span className="font-inter text-[15px] sm:text-[16px] font-medium text-[#2952E1] leading-[24px] tracking-wide">
                Step 03
              </span>
              <h3 className="font-serif text-[28px] sm:text-[32px] font-normal text-[#000000]/40 leading-[38px] sm:leading-[48px] tracking-[-0.25px]">
                Receive &amp; use
              </h3>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/order"
                className="inline-flex items-center gap-2 rounded-full bg-[#2952E1] px-7 py-3.5 font-inter font-medium text-[15px] text-white shadow-[0_4px_14px_0_rgba(41,82,225,0.3)] transition-all hover:bg-[#1e42c7] hover:shadow-lg active:scale-95"
              >
                Request a Design
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Stack of 3 Visual Mockups matching Figma node 249:15582 */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Card 1: Brief your requirement (Orange gradient) */}
            <div className="relative w-full aspect-[654/410] rounded-[20px] overflow-hidden shadow-xs border border-[#E5E7EB]/60">
              <Image
                src="/images/figma_250_9580.png"
                alt="Brief your requirement"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Card 2: Timeline with Designer (Purple gradient) */}
            <div className="relative w-full aspect-[654/410] rounded-[20px] overflow-hidden shadow-xs border border-[#E5E7EB]/60">
              <Image
                src="/images/figma_250_9592.png"
                alt="Designer assigned timeline"
                fill
                className="object-contain"
              />
            </div>

            {/* Card 3: Design Request Completed (Green gradient) */}
            <div className="relative w-full aspect-[654/410] rounded-[20px] overflow-hidden shadow-xs border border-[#E5E7EB]/60">
              <Image
                src="/images/figma_250_9606.png"
                alt="Design request completed modal"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
