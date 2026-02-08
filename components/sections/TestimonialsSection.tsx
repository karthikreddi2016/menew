import { Container, SectionTitle } from "@/components/ui";

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  imagePosition: "left" | "right";
}

function Testimonial({
  name,
  role,
  company,
  quote,
  imagePosition,
}: TestimonialProps) {
  const content = (
    <div className="bg-white p-5 flex flex-col h-full">
      {/* Profile */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-bg rounded-full flex items-center justify-center text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-sans font-medium text-sm">{name}</p>
          <p className="font-sans text-xs text-text-primary/60">{role}</p>
        </div>
      </div>

      {/* Quote */}
      <p className="font-sans text-base text-text-primary/80 leading-relaxed flex-1">
        "{quote}"
      </p>

      {/* Company Logo Placeholder */}
      <div className="mt-6">
        <span className="font-sans text-sm text-text-primary/40">{company}</span>
      </div>
    </div>
  );

  const imagePlaceholder = (
    <div className="bg-gradient-to-br from-primary-light to-accent-pink/30 h-full min-h-[240px] flex items-center justify-center">
      <span className="text-6xl">📷</span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 rounded-card overflow-hidden border border-gray-border">
      {imagePosition === "left" ? (
        <>
          {imagePlaceholder}
          {content}
        </>
      ) : (
        <>
          {content}
          {imagePlaceholder}
        </>
      )}
    </div>
  );
}

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechStart Inc.",
    quote:
      "Menew transformed our brand presence. The designs are always on point and delivered faster than expected. It's like having an in-house design team without the overhead.",
    imagePosition: "left" as const,
  },
  {
    name: "Michael Brown",
    role: "Founder",
    company: "GrowthLabs",
    quote:
      "I used to spend hours explaining my vision to freelancers. With Menew, they just get it. The turnaround time is incredible and the quality speaks for itself.",
    imagePosition: "right" as const,
  },
  {
    name: "Emily Rodriguez",
    role: "Content Manager",
    company: "MediaFlow",
    quote:
      "From social media graphics to pitch decks, Menew handles it all. They've become an essential part of our content strategy. Highly recommend!",
    imagePosition: "left" as const,
  },
  {
    name: "David Kim",
    role: "CEO",
    company: "InnovateCo",
    quote:
      "The consistency and quality of work from Menew is unmatched. They understand our brand better than anyone and always deliver beyond expectations.",
    imagePosition: "right" as const,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionTitle className="mb-12">
          Our Valuable Users ❤️ Love Us
        </SectionTitle>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}
