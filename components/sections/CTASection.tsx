import { Button, Container } from "@/components/ui";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Stop searching. Start creating.
            </h2>
            <p className="font-sans text-lg text-white/80 mb-8">
              Your first design is on us. Let's see what we can do together.
            </p>
            <Button
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              Get Started Now
            </Button>
          </div>

          {/* Interactive Demo */}
          <div className="bg-white rounded-card p-6 text-text-primary">
            {/* Input Area */}
            <div className="border border-gray-border rounded-input p-4 mb-4">
              <p className="font-sans text-sm text-text-primary/50 mb-2">
                What do you need designed?
              </p>
              <p className="font-sans text-base">
                I need a social media post for my coffee shop's new seasonal
                menu...
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end mb-6">
              <button className="font-inter text-sm text-text-primary/70 px-4 py-2 hover:bg-gray-bg rounded-button transition-colors">
                Cancel
              </button>
              <Button variant="primary" size="sm">
                Submit
              </Button>
            </div>

            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-input p-4 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <p className="font-sans text-sm text-green-800">
                Request received! Our designer will start working on it shortly.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
