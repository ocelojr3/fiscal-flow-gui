import Header from "@/components/Header";
import UrgencyBanner from "@/components/UrgencyBanner";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import PricingSection from "@/components/PricingSection";
import TechDifferentials from "@/components/TechDifferentials";
import ReformaDiagnosticCard from "@/components/ReformaDiagnosticCard";
import AgendaCalendar from "@/components/AgendaCalendar";
import NewsSection from "@/components/NewsSection";
import FinancialIndicators from "@/components/FinancialIndicators";
import PracticalTables from "@/components/PracticalTables";
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

        <div className="py-16">
          <PricingSection />
        </div>

        <div className="py-16">
          <TechDifferentials />
        </div>

        <div className="py-12">
          <TrustSection />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 space-y-16">
          <AnimatedSection>
            <IRRFCalculator />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <AgendaCalendar />
              <NewsSection />
              <div className="space-y-8">
                <FinancialIndicators />
                <PracticalTables />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <ReformaDiagnosticCard />
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <TaxReformResources />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <LatestPublications />
          </AnimatedSection>
        </div>

        <div className="py-12">
          <FAQSection />
        </div>
      </main>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
