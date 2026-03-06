import Header from "@/components/Header";
import UrgencyBanner from "@/components/UrgencyBanner";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import PricingSection from "@/components/PricingSection";
import TechDifferentials from "@/components/TechDifferentials";
import AgendaCalendar from "@/components/AgendaCalendar";
import NewsSection from "@/components/NewsSection";
import FinancialIndicators from "@/components/FinancialIndicators";
import PracticalTables from "@/components/PracticalTables";
import Simulators from "@/components/Simulators";
import LatestPublications from "@/components/LatestPublications";
import IRRFCalculator from "@/components/IRRFCalculator";
import TaxReformResources from "@/components/TaxReformResources";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <UrgencyBanner />
      <Header />

      <main>
        <HeroSection />
        <PricingSection />
        <TechDifferentials />
        <TrustSection />

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <AnimatedSection>
            <IRRFCalculator />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AgendaCalendar />
              <NewsSection />
              <div className="space-y-6">
                <FinancialIndicators />
                <PracticalTables />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <TaxReformResources />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Simulators />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <LatestPublications />
          </AnimatedSection>
        </div>

        <FAQSection />
      </main>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
