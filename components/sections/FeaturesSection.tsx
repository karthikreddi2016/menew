import { Container } from "@/components/ui";

const imgGraphicDesign = "/images/graphic-design.jpg";
const imgVideoEditing = "/images/video-editing.jpg";
const img3DMotion = "/images/3d-motion.jpg";
const imgBranding = "/images/branding-kit.jpg";
const imgThumbnail = "/images/thumbnail.jpg";
const imgPPT = "/images/ppt-design.jpg";

const services = [
  {
    image: imgGraphicDesign,
    title: "Graphic Design",
    description: "Social posts, banners, brand assets",
    deliveryTag: "Same Day Delivery",
  },
  {
    image: imgVideoEditing,
    title: "Video Editing",
    description: "Reels, ads, YouTube, short-form",
    deliveryTag: "12–24 hours",
  },
  {
    image: img3DMotion,
    title: "3D / Motion Design",
    description: "Product visuals, animations, explainers",
    deliveryTag: "48–72 hours",
  },
  {
    image: imgBranding,
    title: "Branding Kit",
    description: "Logos, brand guidelines",
    deliveryTag: "48 hours",
  },
  {
    image: imgThumbnail,
    title: "Thumbnail",
    description: "YouTube & social media",
    deliveryTag: "12 hours",
  },
  {
    image: imgPPT,
    title: "PPT Design",
    description: "Investor ready pitch decks, presentation slides",
    deliveryTag: "24 hours",
  },
];

function ServiceCard({
  image,
  title,
  description,
  deliveryTag,
}: (typeof services)[number]) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white">
      <div className="relative h-[200px] w-full overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-1.5 p-4">
        <p className="font-serif text-xl leading-snug text-[color:var(--foreground)] tracking-[-0.01em]">
          {title}
        </p>
        <p className="font-sans text-base text-black/65">{description}</p>
        <span className="mt-1 inline-flex w-fit items-center rounded border border-[#ffae45] bg-[#ffe6c5] px-2.5 py-1 text-sm text-black/70">
          {deliveryTag}
        </span>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="services" className="section-shell">
      <Container>
        <h2 className="mb-8 font-serif text-[2rem] leading-snug tracking-[-0.02em] text-[color:var(--foreground)]">
          You Order, We Deliver!
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
