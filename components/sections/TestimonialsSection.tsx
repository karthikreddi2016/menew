"use client";

import Image from "next/image";
import { Container } from "@/components/ui";

export interface TestimonialItem {
  id: string;
  type: "work" | "review";
  // Work fields
  mediaType?: "video" | "design";
  imageUrl?: string;
  hasPlayButton?: boolean;
  workTitle?: string;
  // Review fields
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  quote?: string;
}

// Sample initial testimonials & work showcases (ready to be hooked to Admin / Supabase)
export const DEFAULT_TESTIMONIALS_ROW_1: TestimonialItem[] = [
  {
    id: "work-1",
    type: "work",
    mediaType: "video",
    imageUrl: "/images/figma_testimonial_sample_art.png",
    hasPlayButton: true,
    workTitle: "3D Motion Design Showcase",
  },
  {
    id: "review-1",
    type: "review",
    userName: "Sarah Jenkins",
    userRole: "Head of Marketing at Canva",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
    quote:
      "The adoption of Menew has been a transformative move for our growth team, addressing critical turnaround bottlenecks and enhancing our overall creative output.",
  },
  {
    id: "work-2",
    type: "work",
    mediaType: "design",
    imageUrl: "/images/figma_testimonial_sample_art.png",
    hasPlayButton: false,
    workTitle: "Brand Identity & Guidelines",
  },
  {
    id: "review-2",
    type: "review",
    userName: "Michael Brown",
    userRole: "Founder at GrowthLabs",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
    quote:
      "I used to spend hours explaining my vision to freelancers. With Menew, they just get it. Turnaround time is incredible and the quality speaks for itself.",
  },
  {
    id: "work-3",
    type: "work",
    mediaType: "video",
    imageUrl: "/images/figma_testimonial_sample_art.png",
    hasPlayButton: true,
    workTitle: "Product Launch Reel",
  },
];

export const DEFAULT_TESTIMONIALS_ROW_2: TestimonialItem[] = [
  {
    id: "review-3",
    type: "review",
    userName: "Emily Rodriguez",
    userRole: "Product Lead at FlowTech",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
    quote:
      "From high-stakes pitch decks to daily social campaigns, Menew delivers high polish consistently. Having on-demand artists without hiring overhead is unmatched.",
  },
  {
    id: "work-4",
    type: "work",
    mediaType: "design",
    imageUrl: "/images/figma_testimonial_sample_art.png",
    hasPlayButton: false,
    workTitle: "Investor Pitch Deck Visuals",
  },
  {
    id: "review-4",
    type: "review",
    userName: "David Kim",
    userRole: "CEO at InnovateCo",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    quote:
      "Top-tier design quality with zero management friction. Our team requests creatives in minutes and receives final deliverables ready for production.",
  },
  {
    id: "work-5",
    type: "work",
    mediaType: "video",
    imageUrl: "/images/figma_testimonial_sample_art.png",
    hasPlayButton: true,
    workTitle: "Social Ads & Motion Graphics",
  },
  {
    id: "review-5",
    type: "review",
    userName: "Aarav Patel",
    userRole: "Creative Producer",
    userAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=faces",
    quote:
      "Menew gives us a predictable, ultra-fast pipeline. No bidding wars or endless revisions—just sharp, on-brief creative execution.",
  },
];

function WorkCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="relative shrink-0 w-[320px] sm:w-[380px] md:w-[410px] h-[220px] sm:h-[240px] rounded-[16px] overflow-hidden border border-[#E5E7EB] bg-[#0D1F22] shadow-xs group cursor-pointer">
      <img
        src={item.imageUrl || "/images/figma_testimonial_sample_art.png"}
        alt={item.workTitle || "Work sample"}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {item.hasPlayButton && (
        <div className="absolute left-4 bottom-4 z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur-xs transition-transform duration-200 group-hover:scale-110">
            <svg
              className="w-4 h-4 text-[#1E293B] translate-x-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="relative shrink-0 w-[320px] sm:w-[380px] md:w-[410px] h-[220px] sm:h-[240px] rounded-[16px] border border-[#E5E7EB] bg-[#FBFBFB] p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:border-[#2952E1]/30 transition-all">
      {/* Top: User Avatar & Info */}
      <div className="flex items-center gap-3">
        <img
          src={item.userAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces"}
          alt={item.userName || "User"}
          className="h-10 w-10 rounded-full object-cover shrink-0 border border-[#E5E7EB] bg-[#EAEFFF]"
        />
        <div className="flex flex-col">
          <p className="font-inter text-[14px] font-semibold text-[#282828] leading-tight">
            {item.userName}
          </p>
          <p className="font-inter text-[12px] text-[#737373] mt-0.5">
            {item.userRole}
          </p>
        </div>
      </div>

      {/* Quote */}
      <p className="font-inter text-[13.5px] sm:text-[14px] leading-[22px] text-[#444444] line-clamp-3 tracking-[-0.2px]">
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Bottom: Menew Brand Watermark */}
      <div className="flex items-center gap-1.5 opacity-80">
        <div className="h-4 w-16 relative">
          <div
            style={{
              position: "absolute",
              width: "70px",
              height: "70px",
              left: "-4px",
              top: "-27px",
              backgroundImage: "url('/images/logo.png')",
              backgroundSize: "100% 100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="reviews" className="bg-white py-16 sm:py-24 border-t border-[#F0F0F0] overflow-hidden">
      <Container>
        {/* Single Section Heading matching Figma */}
        <div className="mb-8 sm:mb-10">
          <h2 className="font-serif text-[28px] sm:text-[32px] font-normal text-[#191919] leading-[40px] sm:leading-[48px] tracking-[-0.25px]">
            Frequent Users
          </h2>
        </div>

        {/* 2 Rows of Dynamic Work & Review Cards */}
        <div className="flex flex-col gap-6">
          {/* Row 1 */}
          <div className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden no-scrollbar snap-x snap-mandatory">
            {DEFAULT_TESTIMONIALS_ROW_1.map((item) =>
              item.type === "work" ? (
                <WorkCard key={item.id} item={item} />
              ) : (
                <ReviewCard key={item.id} item={item} />
              )
            )}
          </div>

          {/* Row 2 */}
          <div className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden no-scrollbar snap-x snap-mandatory">
            {DEFAULT_TESTIMONIALS_ROW_2.map((item) =>
              item.type === "work" ? (
                <WorkCard key={item.id} item={item} />
              ) : (
                <ReviewCard key={item.id} item={item} />
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
