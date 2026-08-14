import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative flex-1 flex flex-col items-center justify-center bg-white px-4 pt-12 pb-6 md:py-6 min-h-0 overflow-hidden">
      {/* Left flying illustration */}
      <div className="absolute left-[-15px] sm:left-[10px] xl:left-[40px] top-2 sm:top-1/2 sm:-translate-y-1/2 w-[115px] sm:w-[180px] md:w-[220px] lg:w-[270px] xl:w-[320px] pointer-events-none z-10 select-none">
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
      <div className="absolute right-[-15px] sm:right-[10px] xl:right-[40px] top-2 sm:top-1/2 sm:-translate-y-1/2 w-[115px] sm:w-[180px] md:w-[220px] lg:w-[270px] xl:w-[320px] pointer-events-none z-10 select-none">
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
      <div className="relative z-20 max-w-[780px] mx-auto text-center mt-12 sm:my-auto">
        {/* Main Headline */}
        <h1 className="font-serif text-[27px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[52px] leading-[1.28] text-[#262626] font-normal tracking-[-0.02em]">
          Your{" "}
          <span className="text-[#2952E1] font-normal inline-block bg-[#F4F7FE] border border-[#D9E4FF] px-2 py-0.5 rounded-md">
            Creative Ideas
          </span>{" "}
          produced
          <br className="block sm:block" />
          <span className="relative inline-block text-[#E865AA] font-normal mx-1 sm:mx-2">
            on demand
            {/* Hand-drawn pink underline brush stroke */}
            <svg
              className="absolute -bottom-1.5 left-0 w-full h-3 text-[#E865AA] overflow-visible"
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
          by experienced artists
        </h1>

        {/* Subtitle */}
        <p className="font-inter text-[13px] sm:text-[14px] text-[#6f6f6f] mt-3 sm:mt-4 max-w-[560px] mx-auto leading-relaxed">
          Tell us what you need: a poster, PPT, reel, logo, or any other design on demand.
        </p>

        {/* CTA Button */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <Link
            href="/order"
            className="inline-flex items-center justify-center rounded-full bg-[#2952E1] px-9 py-3 sm:py-3 font-inter font-medium text-[15px] text-white shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] transition-all hover:bg-[#1e42c7] hover:shadow-lg active:scale-95"
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
