import Link from "next/link";
import { QUICK_SERVICE_MAP } from "@/lib/types/order.types";

const items = [
  {
    name: "PPT",
    bgColor: "bg-[#E865AA]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h20v14H2z" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 8h5a2 2 0 0 1 0 4H7V8z" />
      </svg>
    ),
  },
  {
    name: "Banners/flex",
    bgColor: "bg-[#2952E1]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="13" y2="14" />
      </svg>
    ),
  },
  {
    name: "Social Media",
    bgColor: "bg-[#FFAE45]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    name: "Brand Identity",
    bgColor: "bg-[#00C288]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L11 18l7-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    name: "Business Card",
    bgColor: "bg-[#D9383A]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <path d="M14 10h4" />
        <path d="M14 14h3" />
      </svg>
    ),
  },
  {
    name: "Poster",
    bgColor: "bg-[#FFAE45]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        <circle cx="12" cy="9" r="2.5" />
        <path d="M8 17s1.5-2 4-2 4 2 4 2" />
      </svg>
    ),
  },
  {
    name: "Video Editing",
    bgColor: "bg-[#10B981]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Brochure",
    bgColor: "bg-[#E865AA]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="7" x2="16" y2="7" />
        <line x1="9" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    name: "Explore More",
    bgColor: "bg-[#F3F4F6] text-[#2952E1]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2952E1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="1.5" fill="#2952E1" />
        <circle cx="12" cy="12" r="1.5" fill="#2952E1" />
        <circle cx="19" cy="12" r="1.5" fill="#2952E1" />
      </svg>
    ),
  },
];

export function CreateTodaySection() {
  return (
    <section className="shrink-0 bg-white pb-10 pt-0 px-4 sm:px-8 max-w-[1340px] mx-auto w-full">
      {/* Dashed divider line with header text (Figma Node 249:15546) */}
      <div className="relative flex items-center justify-center mb-7 sm:mb-9">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-dashed border-[#D9D9D9]" />
        </div>
        <div className="relative bg-white px-5">
          <span className="font-serif text-[16px] sm:text-[18px] text-[#2C2C2C] font-normal tracking-[-0.25px]">
            What would you like to create today
          </span>
        </div>
      </div>

      {/* Grid of 9 circular icon cards in exact Figma order (Figma Node 249:15549) */}
      <div className="grid grid-cols-3 sm:grid-cols-9 gap-3 sm:gap-4 justify-items-center">
        {items.map((item) => {
          const serviceSlug = QUICK_SERVICE_MAP[item.name] || "graphic_design";
          let href = `/order?service=${serviceSlug}`;
          if (item.name === "Explore More") href = "/services";
          else if (item.name === "PPT") href = "/services/ppt";
          else if (item.name === "Video Editing") href = "/services/video-editing";
          else if (item.name === "Brand Identity") href = "/services/branding";

          return (
            <Link
              key={item.name}
              href={href}
              className="group flex flex-col items-center justify-center rounded-[16px] border border-[#EDEDED] bg-white p-2 w-full h-[110px] sm:h-[117px] max-w-[130px] transition-all hover:border-[#2952E1]/40 hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className={`w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-105 ${item.bgColor}`}
              >
                {item.icon}
              </div>
              <p className="mt-2 text-center font-inter text-[12px] sm:text-[13px] font-medium leading-tight text-[#191919] group-hover:text-[#2952E1] whitespace-nowrap w-full px-0.5">
                {item.name}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
