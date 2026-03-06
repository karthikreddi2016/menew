import { Navbar, Footer } from "@/components/layout";
import {
  HeroSection,
  CreateTodaySection,
  FeaturesSection,
  WhyChooseUsSection,
  HowItWorksSection,
  TestimonialsSection,
  CTASection,
  FAQSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CreateTodaySection />
        <FeaturesSection />
        <WhyChooseUsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
