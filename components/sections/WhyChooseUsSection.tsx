import { Container, SectionTitle } from "@/components/ui";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="surface-panel rounded-[1.75rem] p-6 md:p-8">
      <div className="mb-8 flex items-start gap-6">
        <h3 className="flex-1 font-serif text-[1.9rem] leading-tight text-[color:var(--foreground)]">{title}</h3>
        <span className="inline-flex rounded-full border border-black/10 px-3 py-1.5 text-sm uppercase tracking-[0.18em] text-black/55">
          {icon}
        </span>
      </div>
      <p className="font-sans text-base leading-7 text-black/65">
        {description}
      </p>
    </div>
  );
}

const features = [
  {
    title: "Experienced designers are assigned to your need in no time.",
    description:
      "No bidding, no waiting, no confusion. Just tell us what you want and the right creative mind starts working for you.",
    icon: "Fast",
  },
  {
    title: "No need to manage tasks, or designers back-and-forth.",
    description:
      "Share what's in your mind, upload references if you have any, we'll take it from there and deliver magic.",
    icon: "Clear",
  },
  {
    title: "Clear and transparent process, flexible timelines.",
    description:
      "Know exactly what's happening with your order at all times—no surprises, no delays, no ghosting.",
    icon: "Visible",
  },
  {
    title: "Quality First. Zero Stress. Top quality designs in your pricing.",
    description:
      "You get pro-level work that's design for your brand & services at flexible, affordable pricing.",
    icon: "Sharp",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="section-shell">
      <Container>
        <div className="mb-12 max-w-3xl">
          <p className="section-kicker">Why Menew</p>
          <SectionTitle className="mt-4">
            A production model designed to remove the usual creative friction.
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
