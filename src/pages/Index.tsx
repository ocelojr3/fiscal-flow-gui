import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import AgendaCalendar from "@/components/AgendaCalendar";
import NewsSection from "@/components/NewsSection";
import FinancialIndicators from "@/components/FinancialIndicators";
import PracticalTables from "@/components/PracticalTables";
import Simulators from "@/components/Simulators";
import LatestPublications from "@/components/LatestPublications";
import IRRFCalculator from "@/components/IRRFCalculator";
import TaxReformResources from "@/components/TaxReformResources";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />
        <TrustSection />

        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
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
      </main>
    </div>
  );
};

export default Index;
