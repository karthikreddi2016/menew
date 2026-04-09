import Link from "next/link";
import { Container } from "@/components/ui";
import { QUICK_SERVICE_MAP } from "@/lib/types/order.types";

const iconPoster = "/images/icon-poster.svg";
const iconPPT = "/images/icon-ppt.svg";
const iconVideo = "/images/icon-video.svg";
const iconBanner = "/images/icon-banner.svg";
const iconBranding = "/images/icon-branding.svg";
const iconBrochure = "/images/icon-brochure.svg";
const iconAds = "/images/icon-ads.svg";
const iconSocial = "/images/icon-social.svg";
const iconBizCard = "/images/icon-bizcard.svg";

const services = [
  { icon: iconPoster, name: "Poster Design" },
  { icon: iconPPT, name: "PPT Design" },
  { icon: iconVideo, name: "Video Editing" },
  { icon: iconBanner, name: "Banner Design" },
  { icon: iconBranding, name: "Branding Kit" },
  { icon: iconBrochure, name: "Brochure Design" },
  { icon: iconAds, name: "Ads/Flex Design" },
  { icon: iconSocial, name: "Social Media Post Design" },
  { icon: iconBizCard, name: "Business Card Design" },
];

export function CreateTodaySection() {
  return (
    <section className="section-shell">
      <Container>
        <div className="flex items-center gap-3 sm:gap-4 mb-8">
          <div className="flex-1 h-px bg-black/15" />
          <p className="shrink-0 font-serif text-base sm:text-xl text-(--foreground) tracking-[-0.01em] text-center">
            What would you like to create today
          </p>
          <div className="flex-1 h-px bg-black/15" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 justify-items-center">
          {services.map((service) => {
            const serviceSlug = QUICK_SERVICE_MAP[service.name];
            return (
              <Link
                key={service.name}
                href={serviceSlug ? `/order?service=${serviceSlug}` : "/order"}
                className="flex h-[100px] w-full max-w-[120px] flex-col items-center justify-center gap-2 rounded-lg border border-black/10 bg-white/80 p-3 transition-shadow hover:shadow-md hover:border-[#184043]/30"
              >
                <img src={service.icon} alt={service.name} className="h-6 w-6 object-contain" />
                <p className="text-center font-inter text-[11px] sm:text-[13px] font-medium leading-tight text-(--foreground)">
                  {service.name}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
