import { Container, SectionTitle } from "@/components/ui";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  deliveryTag?: string;
}

function ServiceCard({
  title,
  description,
  image,
  deliveryTag,
}: ServiceCardProps) {
  return (
    <div className="bg-white border border-gray-border rounded-card overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="h-[200px] bg-gray-bg relative">
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          {image}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-xl capitalize mb-1">{title}</h3>
        <p className="font-sans text-base text-text-primary/70 mb-3">
          {description}
        </p>
        {deliveryTag && (
          <span className="inline-block bg-accent-orange-light border border-accent-orange text-text-primary/70 text-base px-3 py-1 rounded-tag">
            {deliveryTag}
          </span>
        )}
      </div>
    </div>
  );
}

const services = [
  {
    title: "Graphic Design",
    description: "Social posts, banners, brand assets",
    image: "🎨",
    deliveryTag: "Same Day Delivery",
  },
  {
    title: "Video Editing",
    description: "Reels, YouTube videos, ads",
    image: "🎬",
    deliveryTag: "2-3 Days Delivery",
  },
  {
    title: "Presentations",
    description: "Pitch decks, corporate presentations",
    image: "📊",
    deliveryTag: "Same Day Delivery",
  },
  {
    title: "UI/UX Design",
    description: "App screens, website mockups",
    image: "💻",
    deliveryTag: "3-5 Days Delivery",
  },
  {
    title: "Branding",
    description: "Logos, brand guidelines, identity",
    image: "✨",
    deliveryTag: "5-7 Days Delivery",
  },
  {
    title: "Illustrations",
    description: "Custom illustrations, icons",
    image: "🖌️",
    deliveryTag: "2-3 Days Delivery",
  },
];

export function FeaturesSection() {
  return (
    <section id="services" className="py-16 md:py-24">
      <Container>
        <SectionTitle className="mb-12">
          The Designs You Need, The Quality You Want
        </SectionTitle>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
