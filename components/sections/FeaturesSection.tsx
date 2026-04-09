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
    <div className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white">
      <div className="relative h-[200px] w-full overflow-hidden">
        <img src={image} alt={label} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-1.5 p-4">
        <p className="font-serif text-xl leading-snug text-(--foreground) tracking-[-0.01em]">
          {label}
        </p>
        <p className="font-sans text-base text-black/65">{description}</p>
        <span className="mt-1 inline-flex w-fit items-center rounded border border-[#ffae45] bg-[#ffe6c5] px-2.5 py-1 text-sm text-black/70">
          {deliveryTag}
        </span>
        <Link
          href={`/order?service=${slug}`}
          className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#184043] px-4 py-2 font-inter text-sm font-medium text-white transition-colors hover:bg-[#184043]/90"
        >
          Order Now →
        </Link>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="services" className="section-shell">
      <Container>
        <h2 className="mb-8 font-serif text-[2rem] leading-snug tracking-[-0.02em] text-(--foreground)">
          You Order, We Deliver!
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
