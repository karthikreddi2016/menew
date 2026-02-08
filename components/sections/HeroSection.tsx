import { Button, Container } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-50 pointer-events-none">
        {/* Left illustration placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-accent-pink/20 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 opacity-50 pointer-events-none">
        {/* Right illustration placeholder */}
        <div className="w-full h-full bg-gradient-to-bl from-primary-light to-transparent rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="relative mb-8">
            <div className="bg-primary-light border border-primary px-8 py-3 rounded-sm relative">
              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-primary" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-primary" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-primary" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-primary" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-[42px] leading-tight mb-4">
            Your <span className="text-primary">Creative Ideas</span> produced{" "}
            <br className="hidden md:block" />
            <span className="text-accent-pink">on demand</span> by experienced
            creatives.
          </h1>

          {/* Subheading */}
          <p className="font-sans text-base md:text-lg text-text-primary/70 max-w-2xl mb-8 leading-relaxed">
            Tell us what you need, a poster, PPT, reel, or logo, and we'll turn
            your messy thoughts into designs that actually feel you. No designer
            jargon. No long back-and-forth.
          </p>

          {/* CTA Button */}
          <Button variant="primary" size="md" className="mb-4">
            Get Started
          </Button>

          {/* Helper Text */}
          <div className="flex items-center gap-2 text-text-primary/60 text-base italic">
            <span className="font-sans">Takes 2 minutes</span>
            <span className="w-1 h-1 bg-text-primary/60 rounded-full" />
            <span className="font-sans">No designer hunting</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
