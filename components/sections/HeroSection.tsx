import Link from "next/link";
import Image from "next/image";

export function HeroSection({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <section className="relative flex-1 flex flex-col items-center justify-center bg-white px-4 pt-6 pb-10 sm:pb-12 w-full overflow-hidden min-h-0">
      {/* ── Mobile Layout (< 1024px): Characters in top row ── */}
      <div className="relative lg:hidden w-full h-[120px] sm:h-[140px] pointer-events-none select-none mb-2">
        {/* Left character illustration (blue artist) */}
        <div className="absolute left-[-10px] sm:left-0 top-0 h-full w-[120px] sm:w-[150px]">
          <Image
            src="/images/figma_hero_right.png"
            alt="Artist illustration left"
            fill
            className="object-contain object-left-top"
            priority
          />
        </div>
        {/* Right character illustration (orange artist) */}
        <div className="absolute right-[-10px] sm:right-0 top-0 h-full w-[130px] sm:w-[160px]">
          <Image
            src="/images/figma_hero_left.png"
            alt="Artist illustration right"
            fill
            className="object-contain object-right-top"
            priority
          />
        </div>
      </div>

      {/* ── Desktop Canvas Frame (Exact 1440px proportions from Figma node 249:15309) ── */}
      <div className="relative w-full max-w-[1340px] mx-auto px-4 sm:px-8 xl:px-10 flex flex-col items-center justify-center">
        {/* Left Illustration: Blue Artist (positioned with clear breathing room so it never overlaps the headline) */}
        <div
          className="hidden lg:block absolute left-[-60px] xl:left-[-30px] 2xl:left-0 top-1/2 -translate-y-[52%] w-[220px] lg:w-[245px] xl:w-[275px] h-[165px] lg:h-[184px] xl:h-[206px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <Image
            src="/images/figma_hero_right.png"
            alt="Artist illustration left"
            fill
            className="object-contain object-left"
            priority
          />
        </div>

        {/* Right Illustration: Orange Artist (Enlarged while maintaining right anchor position) */}
        <div
          className="hidden lg:block absolute right-[-60px] xl:right-[-30px] 2xl:right-0 top-1/2 -translate-y-[48%] w-[265px] lg:w-[295px] xl:w-[335px] h-[202px] lg:h-[225px] xl:h-[255px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <Image
            src="/images/figma_hero_left.png"
            alt="Artist illustration right"
            fill
            className="object-contain object-right"
            priority
          />
        </div>

        {/* ── Center Content: Perfectly aligned & scaled ── */}
        <div className="relative z-10 w-full max-w-[860px] mx-auto text-center px-4 flex flex-col items-center">
          {/* Main Headline (Increased to match width with subtitle line below) */}
          <h1 className="relative w-full max-w-[780px] sm:max-w-[810px] md:max-w-[835px] lg:max-w-[850px] mx-auto flex items-center justify-center">
            <span className="sr-only">
              Your Creative Ideas produced on demand by experienced artists.
            </span>
            <div className="relative w-full aspect-[889/111]">
              <Image
                src="/images/figma_249_15525.svg"
                alt="Your Creative Ideas produced on demand by experienced artists"
                fill
                priority
                className="object-contain select-none pointer-events-none"
              />
            </div>
          </h1>

          {/* Subtitle (Figma Node 249:15538: width 734px) */}
          <p className="font-inter text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] text-black/70 mt-[24px] sm:mt-[28px] max-w-[734px] mx-auto tracking-[-0.2px]">
            Tell us what you need: a poster, PPT, reel, logo, or any other design on demand.
          </p>

          {/* CTA Button & Subtext Container */}
          <div className="mt-[28px] sm:mt-[32px] flex flex-col items-center">
            {/* Get Started Button */}
            <Link
              href={isLoggedIn ? "/dashboard" : "/order"}
              className="inline-flex items-center justify-center rounded-[31px] bg-[#2952E1] w-[148px] sm:w-[151px] h-[52px] sm:h-[56px] font-inter font-medium text-[15px] sm:text-[16px] text-white shadow-[0_4px_14px_0_rgba(41,82,225,0.35)] transition-all hover:bg-[#1e42c7] hover:shadow-lg active:scale-95 tracking-[-0.25px]"
            >
              Get Started
            </Link>

            {/* Subtext */}
            <div className="mt-[16px] flex items-center justify-center gap-2 font-inter italic text-[14px] sm:text-[15px] text-black/60 tracking-[-0.25px]">
              <span>Takes 2 minutes</span>
              <span className="w-[4px] h-[4px] rounded-full bg-black/60 inline-block shrink-0" />
              <span>No designer hunting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
