import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Banner from "@/components/Banner";
import AgendaCalendar from "@/components/AgendaCalendar";
import NewsSection from "@/components/NewsSection";
import FinancialIndicators from "@/components/FinancialIndicators";
import PracticalTables from "@/components/PracticalTables";
import Simulators from "@/components/Simulators";
import LatestPublications from "@/components/LatestPublications";
import IRRFCalculator from "@/components/IRRFCalculator";
import IRPFDeclarationCTA from "@/components/IRPFDeclarationCTA";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 overflow-auto">
          <Banner />

          {/* CTA principal - Declaração IRPF */}
          <IRPFDeclarationCTA />
          
          <div className="p-6 space-y-8">
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
            
            <AnimatedSection delay={0.1}>
              <Simulators />
            </AnimatedSection>
            
            <AnimatedSection delay={0.1}>
              <LatestPublications />
            </AnimatedSection>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
