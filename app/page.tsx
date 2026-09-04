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
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;
  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.role === "admin";
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── First Fold: Hero Landing Viewport ── */}
      <div className="min-h-screen flex flex-col justify-between bg-white relative">
        <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <HeroSection isLoggedIn={isLoggedIn} />
          <CreateTodaySection />
        </div>
      </div>

      {/* ── Remaining Sections Below ── */}
      <main>
        <FeaturesSection />
        <WhyChooseUsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection isLoggedIn={isLoggedIn} />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
