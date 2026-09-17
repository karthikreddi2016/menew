"use client";

import Link from "next/link";

const PROMO_ITEMS = [
  {
    id: "trial",
    text: "15-Day Free Trial",
    highlight: "15-Day Free Trial",
  },
  {
    id: "orders",
    text: "Up to 5 Creative Orders",
    highlight: "Up to 5 Creative Orders",
  },
  {
    id: "card",
    text: "No Credit Card Required*",
    highlight: "No Credit Card Required*",
  },
];

export function TopAnnouncementBar() {
  // Repeat items 4 times per group to ensure continuous fill on all screens up to 4K
  const renderItemSet = (groupIndex: number) => (
    <div key={`group-${groupIndex}`} className="flex items-center shrink-0">
      {[...Array(4)].flatMap((_, repeatIndex) =>
        PROMO_ITEMS.map((item, itemIndex) => (
          <div
            key={`grp-${groupIndex}-rep-${repeatIndex}-item-${item.id}`}
            className="inline-flex items-center"
          >
            <span className="inline-flex items-center gap-2 mx-5 sm:mx-8">
              <span className="text-[10px] text-white/70">✦</span>
              <span className="font-semibold text-white tracking-wide text-[12px] sm:text-[13.5px] uppercase sm:normal-case whitespace-nowrap">
                {item.text}
              </span>
            </span>
            <span
              className="text-white/35 font-light select-none text-[13px]"
              aria-hidden="true"
            >
              |
            </span>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div
      role="region"
      aria-label="Promotional announcement"
      className="relative w-full bg-[#1e42d9] text-white overflow-hidden select-none border-b border-white/10 shadow-xs z-50"
    >
      <Link
        href="/order"
        className="group relative flex items-center h-[34px] sm:h-[38px] w-full overflow-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
        title="15-Day Free Trial — Get Started"
      >
        {/* Soft edge gradient fades to prevent abrupt text cut-off */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-[#1e42d9] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-[#1e42d9] to-transparent z-10" />

        {/* Marquee Track (Group 1 + Duplicate Group 2 for seamless infinite loop) */}
        <div className="inline-flex w-max animate-top-strip group-hover:[animation-play-state:paused] will-change-transform">
          {renderItemSet(1)}
          {renderItemSet(2)}
        </div>
      </Link>
    </div>
  );
}

export default TopAnnouncementBar;
