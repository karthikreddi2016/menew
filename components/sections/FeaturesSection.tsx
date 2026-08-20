import Link from "next/link";
import { Container } from "@/components/ui";
import { SERVICE_CONFIG } from "@/lib/types/order.types";
import type { ServiceType } from "@/lib/types/database.types";

const services = Object.values(SERVICE_CONFIG);

function ServiceCard({
  image,
  label,
  description,
  deliveryTag,
  slug,
}: {
  image: string;
  label: string;
  description: string;
  deliveryTag: string;
  slug: ServiceType;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white transition-all hover:border-[#2952E1]/40 hover:shadow-md">
      <div className="relative h-[200px] w-full overflow-hidden bg-[#F3F4F6]">
        <img src={image} alt={label} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col flex-1 justify-between p-5 sm:p-6">
        <div>
          <h3 className="font-serif text-[22px] sm:text-[24px] font-normal text-[#191919] leading-[32px] sm:leading-[36px] tracking-[-0.25px]">
            {label}
          </h3>
          <p className="font-inter text-[15px] sm:text-[16px] leading-[24px] text-black/60 mt-2 tracking-[-0.25px]">
            {description}
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-[6px] border border-[#FFE2CC] bg-[#FFF4EC] px-3 py-1 font-inter text-[12px] font-medium text-[#C85A17]">
              {deliveryTag}
            </span>
          </div>
        </div>
        <div className="mt-5">
          <Link
            href={`/order?service=${slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0F3738] hover:bg-[#103B3D] px-5 py-2.5 font-inter text-[14px] font-medium text-white transition-colors"
          >
            Order Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="services" className="bg-white py-16 sm:py-20 border-t border-[#F0F0F0]">
      <Container>
        <h2 className="mb-8 sm:mb-10 font-serif text-[28px] sm:text-[32px] font-normal text-[#191919] leading-[40px] sm:leading-[48px] tracking-[-0.25px]">
          You Order, We Deliver!
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[1300px]">
          {services.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
