import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative flex-1 flex flex-col items-center justify-center bg-white px-4 pt-2 sm:pt-4 pb-6 md:py-6 min-h-0 overflow-hidden">
      {/* Top Flying Illustrations Container */}
      <div className="relative w-full max-w-[1200px] h-[130px] sm:h-[180px] md:h-[240px] lg:h-[280px] pointer-events-none select-none mb-1">
        {/* Left character (man in blue top) */}
        <div className="absolute left-[-15px] sm:left-0 top-0 h-full w-[160px] sm:w-[220px] md:w-[280px] lg:w-[320px]">
          <Image
            src="/images/hero-left-flying.png"
            alt="Illustration left"
            fill
            className="object-contain object-left-top"
            priority
          />
        </div>

        {/* Right character (woman in orange top) */}
        <div className="absolute right-[-15px] sm:right-0 top-0 h-full w-[160px] sm:w-[220px] md:w-[280px] lg:w-[320px]">
          <Image
            src="/images/hero-right-flying.png"
            alt="Illustration right"
            fill
            className="object-contain object-right-top"
            priority
          />
        </div>
      </div>

      {/* Hero content container */}
      <div className="relative z-20 max-w-[780px] mx-auto text-center">
        {/* Main Headline */}
        <h1 className="font-serif text-[28px] sm:text-[38px] md:text-[44px] lg:text-[50px] leading-[1.3] text-[#262626] font-normal tracking-[-0.01em]">
          Your{" "}
          <span className="text-[#2952E1] font-normal inline-block bg-[#EAEFFF] px-2 py-0.5 rounded-[4px] mx-0.5">
            Creative Ideas
          </span>{" "}
          produced
          <br />
          <span className="relative inline-block text-[#FF65B5] font-normal mx-1">
            on demand
            {/* Hand-drawn pink underline brush stroke */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[#FF65B5] overflow-visible"
              viewBox="0 0 160 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M3 9C35 4 75 11 115 5C135 2 150 8 157 5"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>{" "}
          by experienced
          <br className="block sm:hidden" />
          {" "}artists
        </h1>

        {/* Subtitle */}
        <p className="font-inter text-[13px] sm:text-[14px] text-[#6f6f6f] mt-4 max-w-[540px] mx-auto leading-relaxed">
          Tell us what you need: a poster, PPT, reel, logo, or any other design on demand.
        </p>

        {/* CTA Button */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <Link
            href="/order"
            className="inline-flex items-center justify-center rounded-full bg-[#2952E1] px-9 py-3 font-inter font-medium text-[15px] text-white shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] transition-all hover:bg-[#1e42c7] hover:shadow-lg active:scale-95"
          >
            Get Started
          </Link>
          <p className="font-inter italic text-[12px] text-[#79747e] mt-1">
            Takes 2 minutes &bull; No designer hunting
          </p>
        </div>
      </div>
    </section>
  );
}
