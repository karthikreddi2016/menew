import { Container, SectionTitle } from "@/components/ui";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-gray-bg border border-gray-border rounded-card p-12">
      <div className="flex items-start gap-10 mb-8">
        <h3 className="flex-1 font-sans text-[28px] leading-tight">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="font-sans text-base text-text-primary/70 leading-relaxed">
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
    icon: "⚡",
  },
  {
    title: "No need to manage tasks, or designers back-and-forth.",
    description:
      "Share what's in your mind, upload references if you have any, we'll take it from there and deliver magic.",
    icon: "🎯",
  },
  {
    title: "Clear and transparent process, flexible timelines.",
    description:
      "Know exactly what's happening with your order at all times—no surprises, no delays, no ghosting.",
    icon: "📋",
  },
  {
    title: "Quality First. Zero Stress. Top quality designs in your pricing.",
    description:
      "You get pro-level work that's design for your brand & services at flexible, affordable pricing.",
    icon: "💎",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionTitle className="mb-12">Why Choose Menew</SectionTitle>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
