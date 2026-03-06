import { Button, Container } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-10 pt-10 md:pb-16 md:pt-14">
      <div className="absolute inset-x-0 top-20 -z-10 h-144 bg-[radial-gradient(circle_at_top_left,rgba(217,109,67,0.22),transparent_32%),radial-gradient(circle_at_70%_20%,rgba(24,64,67,0.14),transparent_26%)]" />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-[2.8rem] leading-[1.1] tracking-[-0.03em] text-(--foreground) md:text-[4rem]">
            Your{" "}
            <span className="relative inline-block rounded-md bg-[#2952e1]/10 px-2 text-[#2952e1]">
              Creative Ideas
            </span>{" "}
            produced{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#e0457b]">on demand</span>
              <span className="absolute bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#e0457b]" />
            </span>{" "}
            experienced creatives.
          </h1>

          <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-8 text-black/65">
            Tell us what you need, a poster, PPT, reel, or logo, and we&apos;ll turn your messy thoughts
            into designs that actually feel you. No designer jargon. No long back-and-forth.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Button size="lg" className="bg-[#2952e1] px-8 hover:bg-[#2952e1]/90">
              Get Started
            </Button>
            <p className="font-sans text-sm text-black/45">
              Takes 2 minutes &nbsp;·&nbsp; No designer hunting
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
