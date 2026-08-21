import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui";

export function CTASection({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <section className="bg-white py-16 sm:py-20 border-t border-[#F0F0F0] relative overflow-hidden">
      <Container>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 rounded-[24px] bg-[#FBFBFB] border border-[#E5E7EB] p-8 sm:p-12 lg:p-14 overflow-hidden">
          {/* Left Column: Heading, Subheading & Action */}
          <div className="max-w-[560px] flex flex-col items-start">
            <h2 className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] font-normal text-[#191919] leading-[1.15] tracking-[-0.25px]">
              Stop searching. Start creating.
            </h2>
            <p className="font-serif text-[18px] sm:text-[22px] lg:text-[24px] text-black/70 font-normal mt-3 leading-[32px] sm:leading-[36px] tracking-[-0.25px]">
              Your flexible designers are just 2 mins away from you
            </p>
            <div className="mt-7 sm:mt-8">
              <Link
                href={isLoggedIn ? "/dashboard" : "/order"}
                className="inline-flex items-center gap-2 rounded-[31px] bg-[#2952E1] px-8 h-[54px] sm:h-[56px] font-inter font-medium text-[16px] text-white shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] transition-all hover:bg-[#1e42c7] hover:shadow-lg active:scale-95 tracking-[-0.25px]"
              >
                Request a Design
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Exact 3D Art & Popup Frame from Figma node 249:15604 */}
          <div className="relative w-full max-w-[480px] aspect-[460/280] rounded-[20px] overflow-hidden">
            <Image
              src="/images/figma_249_15604.png"
              alt="Design request popup and 3D preview"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
