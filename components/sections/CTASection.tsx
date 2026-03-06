import { Button, Container } from "@/components/ui";

const imgColorful = "/images/cta-colorful.jpg";

export function CTASection() {
  return (
    <section className="section-shell">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-[#f5f5f5] px-8 py-10 md:px-12 md:py-12">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] text-[color:var(--foreground)] md:text-[2.75rem]">
                Stop searching. Start creating.
              </h2>
              <p className="mt-3 font-sans text-xl leading-8 text-black/60">
                Your flexible designers are just 2 mins away from you
              </p>
              <Button size="lg" className="mt-8 bg-[#2952e1] hover:bg-[#2952e1]/90">
                Request a Design →
              </Button>
            </div>

            <div className="relative flex items-start justify-end gap-4">
              {/* Input mockup */}
              <div className="relative z-10 w-[284px] rounded-xl border border-black/10 bg-white p-2 shadow-lg">
                <div className="rounded-lg border border-[#2952e1] p-3">
                  <p className="font-sans text-sm text-[color:var(--foreground)]">
                    Create a branding kit for my business
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-end gap-2 px-1 pb-1">
                  <button className="rounded-lg border border-black/10 bg-[#f5f5f5] px-4 py-2 font-inter text-sm text-black/55">
                    Cancel
                  </button>
                  <button className="rounded-lg bg-[#2952e1] px-4 py-2 font-inter text-sm font-medium text-white">
                    Create
                  </button>
                </div>
              </div>

              {/* Colorful decoration image */}
              <div className="hidden overflow-hidden rounded-2xl bg-[#fce4d8] md:block">
                <img
                  src={imgColorful}
                  alt=""
                  className="h-[160px] w-[160px] object-cover"
                />
              </div>

              {/* Success message */}
              <div className="absolute -bottom-2 left-0 flex items-center gap-2 rounded-lg bg-[#1fa401] px-3 py-2.5 text-white shadow-md md:bottom-[-2.5rem]">
                <span className="text-xl">🎉</span>
                <p className="font-sans text-sm">
                  Your Requirements has been assigned to the designer successfully
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
