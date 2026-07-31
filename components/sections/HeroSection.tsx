import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative flex-1 flex flex-col items-center justify-center bg-white px-4 py-2 sm:py-4 min-h-0 overflow-hidden">
      {/* Left flying illustration */}
      <div className="absolute left-[-20px] lg:left-[10px] xl:left-[40px] top-1/2 -translate-y-1/2 w-[160px] md:w-[220px] lg:w-[270px] xl:w-[320px] pointer-events-none z-10 hidden md:block select-none">
        <Image
          src="/images/hero-left-flying.png"
          alt="Illustration left"
          width={320}
          height={320}
          className="object-contain w-full h-auto"
          priority
        />
      </div>

      {/* Right flying illustration */}
      <div className="absolute right-[-20px] lg:right-[10px] xl:right-[40px] top-1/2 -translate-y-1/2 w-[160px] md:w-[220px] lg:w-[270px] xl:w-[320px] pointer-events-none z-10 hidden md:block select-none">
        <Image
          src="/images/hero-right-flying.png"
          alt="Illustration right"
          width={320}
          height={320}
          className="object-contain w-full h-auto"
          priority
        />
      </div>

      {/* Hero content container */}
      <div className="relative z-20 max-w-[780px] mx-auto text-center my-auto">
        {/* Main Headline */}
        <h1 className="font-serif text-[26px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[52px] leading-[1.22] text-[#262626] font-normal tracking-[-0.02em]">
          Your{" "}
          <span className="text-[#2952E1] font-normal inline-block">
            Creative Ideas
          </span>{" "}
          produced
          <br className="hidden sm:block" />
          <span className="relative inline-block text-[#E865AA] font-normal mx-1.5 sm:mx-2">
            on demand
            {/* Hand-drawn pink underline brush stroke */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[#E865AA] overflow-visible"
              viewBox="0 0 160 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M3 9C35 4 75 11 115 5C135 2 150 8 157 5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>{" "}
          by experienced artists.
        </h1>

        {/* Subtitle */}
        <p className="font-inter text-[12px] sm:text-[14px] text-[#6f6f6f] mt-3 sm:mt-4 max-w-[560px] mx-auto leading-relaxed">
          Tell us what you need: a poster, PPT, reel, logo, or any other design on demand.
        </p>

        {/* CTA Button */}
        <div className="mt-4 sm:mt-5 flex flex-col items-center gap-2">
          <Link
            href="/order"
            className="inline-flex items-center justify-center rounded-full bg-[#2952E1] px-8 py-2.5 sm:py-3 font-inter font-medium text-[14px] sm:text-[15px] text-white shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] transition-all hover:bg-[#1e42c7] hover:shadow-lg active:scale-95"
          >
            Get Started
          </Link>
          <p className="font-inter italic text-[11px] sm:text-[12px] text-[#79747e] mt-0.5">
            Takes 2 minutes &bull; No designer hunting
          </p>
        </div>
      </div>
    </section>
  );
}
