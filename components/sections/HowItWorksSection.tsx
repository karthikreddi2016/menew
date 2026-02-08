import { Container, SectionTitle } from "@/components/ui";

interface StepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

function Step({ number, title, description, isLast = false }: StepProps) {
  return (
    <div className="relative flex flex-col md:flex-row items-start gap-6">
      {/* Step Number */}
      <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-inter font-semibold text-lg">
        {number}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-sans text-xl font-medium mb-2">{title}</h3>
        <p className="font-sans text-base text-text-primary/70">{description}</p>
      </div>

      {/* Connector Line */}
      {!isLast && (
        <div className="hidden md:block absolute left-6 top-12 w-0.5 h-24 bg-primary/20" />
      )}
    </div>
  );
}

const steps = [
  {
    number: 1,
    title: "Tell Us What You Need",
    description:
      "Share your idea, upload references, and tell us your timeline. Keep it rough—we'll figure out the rest.",
  },
  {
    number: 2,
    title: "Designer Gets to Work",
    description:
      "We match you with a creative expert who gets your vibe. They'll start crafting while you focus on your day.",
  },
  {
    number: 3,
    title: "Receive & Use",
    description:
      "Get your polished design delivered on time. Request tweaks if needed—then go impress the world.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-bg">
      <Container>
        <SectionTitle className="mb-12">How We Bring Your Vision</SectionTitle>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <Step
                key={step.number}
                {...step}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>

          {/* Illustration Placeholder */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full max-w-md aspect-square bg-white rounded-card border border-gray-border flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl block mb-4">🎨</span>
                <p className="font-sans text-text-primary/50">
                  Creative Process Illustration
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
