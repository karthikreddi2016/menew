import {
  HeroSection,
  CreateTodaySection,
  FeaturesSection,
  HowItWorksSection,
  WhyChooseUsSection,
  FAQSection,
  TestimonialsSection,
  CTASection,
} from "@/components/sections";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── First Fold: Hero Landing Viewport ── */}
      <div className="min-h-screen flex flex-col justify-between bg-white relative">
        <Navbar />
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <HeroSection />
          <CreateTodaySection />
        </div>
      </div>

      {/* ── Remaining Sections Below ── */}
      <main>
        <FeaturesSection />
        <HowItWorksSection />
        <WhyChooseUsSection />
        <FAQSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
