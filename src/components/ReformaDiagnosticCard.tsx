import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Scale, AlertTriangle } from "lucide-react";

const ReformaDiagnosticCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="border-accent/30 bg-gradient-to-r from-primary/5 to-accent/5 overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
              <Scale className="h-7 w-7 text-accent" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-wide">Reforma Tributária 2026</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground font-serif">
                Diagnóstico de Transição para o IVA Dual
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A Reforma Tributária já está em vigor. Sua empresa está preparada para a transição do ICMS/ISS para o IBS e CBS? 
                Solicite um diagnóstico gratuito e descubra o impacto no seu negócio.
              </p>
            </div>
            <Button
              onClick={() => window.open("https://wa.me/pspcontabil?text=Olá! Gostaria de solicitar o diagnóstico de transição para o IVA Dual (Reforma Tributária 2026).", "_blank")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shrink-0"
            >
              Solicitar Diagnóstico
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReformaDiagnosticCard;
