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
    <div className="flex h-full flex-col p-6 md:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent)]">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-[color:var(--foreground)]">{name}</p>
          <p className="font-sans text-xs text-black/55">{role}</p>
        </div>
      </div>

      <p className="flex-1 font-serif text-[1.65rem] leading-[1.45] text-[color:var(--foreground)]">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/10 pt-4">
        <span className="font-sans text-sm text-black/50">{company}</span>
        <span className="text-xs uppercase tracking-[0.22em] text-black/35">
          {imagePosition === "left" ? "Founder" : "Marketing"}
        </span>
      </div>
    </div>
  );

  const imagePlaceholder = (
    <div className="grid-outline min-h-[260px] bg-[linear-gradient(135deg,rgba(24,64,67,0.14),rgba(217,109,67,0.12))] p-6">
      <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-black/10 bg-white/55 p-5">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-black/40">
          <span>Client story</span>
          <span>Proof</span>
        </div>
        <div>
          <p className="font-serif text-4xl text-primary">{company}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-black/60">
            Teams use Menew when the launch plan is moving faster than internal creative bandwidth.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="surface-panel grid grid-cols-1 overflow-hidden rounded-[1.9rem] md:grid-cols-2">
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
    <section id="reviews" className="section-shell">
      <Container>
        <div className="mb-12 max-w-3xl">
          <p className="section-kicker">Client proof</p>
          <SectionTitle className="mt-4">
            Trusted by teams that care about speed and taste.
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}
