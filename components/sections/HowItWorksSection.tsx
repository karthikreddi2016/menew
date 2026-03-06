import { Container, SectionTitle } from "@/components/ui";

interface StepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

function Step({ number, title, description, isLast = false }: StepProps) {
  return (
    <div className="relative flex flex-col gap-5 rounded-3xl border border-black/10 bg-white/65 p-5 md:flex-row md:items-start md:p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-inter text-lg font-semibold text-white">
        {number}
      </div>

      <div className="flex-1">
        <h3 className="font-serif text-2xl leading-tight text-(--foreground)">{title}</h3>
        <p className="mt-2 font-sans text-base leading-7 text-black/65">{description}</p>
      </div>

      {!isLast && (
        <div className="absolute left-[1.45rem] top-[4.3rem] hidden h-14 w-px bg-black/10 md:block" />
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
    <section id="process" className="section-shell">
      <Container>
        <div className="mb-12 max-w-3xl">
          <p className="section-kicker">Process</p>
          <SectionTitle className="mt-4">Three stages, one clear creative flow.</SectionTitle>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Step
                key={step.number}
                {...step}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>

          <div className="surface-panel grid-outline hidden rounded-4xl p-6 md:block">
            <div className="rounded-3xl border border-black/10 bg-(--surface-strong) p-5">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div>
                  <p className="fine-label">Project board</p>
                  <p className="mt-2 text-lg font-semibold text-(--foreground)">Summer product push</p>
                </div>
                <span className="rounded-full bg-(--accent-soft) px-3 py-1 text-xs uppercase tracking-[0.18em] text-(--accent)">
                  Active
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
                  <p className="fine-label">Inputs</p>
                  <p className="mt-2 text-sm leading-6 text-black/65">
                    Product screenshots, campaign goals, audience notes, and a rough founder voice memo.
                  </p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
                  <p className="fine-label">Outputs</p>
                  <p className="mt-2 text-sm leading-6 text-black/65">
                    Hero visual direction, ad variations, and a supporting deck for outbound conversations.
                  </p>
                </div>
                <div className="rounded-2xl bg-primary p-4 text-white">
                  <p className="fine-label text-white/55!">Status</p>
                  <p className="mt-2 text-sm leading-6 text-white/78">
                    Feedback windows are scheduled upfront, so the project keeps moving instead of waiting in a vague review loop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
