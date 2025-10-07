import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}/>
      </div>
      
      <div className="relative px-8 py-12">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="text-xs">DESTAQUES TRIBUTARIUM</div>
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold leading-tight">
            PRORROGADA A LICENÇA-MATERNIDADE EM ATÉ 120 (CENTO [...]
          </h2>
          <p className="text-sm opacity-90">
            A Lei nº 15.222, de 29 de setembro de 2025 Altera a Consolidação das Leis do Trabalho (CLT), artigo §92, § 7º, para prorrogar a licença-maternidade em até 120 ([...]
          </p>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            SAIBA MAIS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
