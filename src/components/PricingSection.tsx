import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, ArrowRight, Building2, Shield, Stethoscope, MessageCircle, Zap } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Zap className="h-4 w-4" />
            OPERAÇÃO BLINDAGEM 365
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Proteção fiscal <span className="text-primary">o ano inteiro</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Do autônomo à empresa com centenas de colaboradores. Máxima restituição, zero dor de cabeça.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 — IRRF */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="h-full flex flex-col border shadow-sm">
              <CardHeader className="text-center pb-2 pt-8">
                <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">IRRF — Declaração Avulsa</h3>
                <p className="text-sm text-muted-foreground">Ideal para autônomos e profissionais</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-4">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-foreground">R$ 350,00</p>
                  <p className="text-sm text-muted-foreground mt-1">ou 12x de R$ 34,90</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Declaração IRPF completa", "Dedução de Livro Caixa", "Revisão por Contador", "Suporte via WhatsApp", "Envio digital 100% seguro"].map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => window.open("https://mpago.li/2kDEmyK", "_blank")}
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Contratar Agora
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2 — BLINDAGEM 365 (destaque) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold z-10 shadow-md">
              🔥 MAIS VENDIDO
            </div>
            <Card className="h-full flex flex-col border-accent shadow-lg ring-2 ring-accent/20">
              <CardHeader className="text-center pb-2 pt-8">
                <div className="h-12 w-12 mx-auto rounded-xl bg-accent/15 flex items-center justify-center mb-3">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground text-lg">Blindagem Fiscal 365</h3>
                <p className="text-sm text-muted-foreground">IRPF + Proteção contra Malha Fina o ano todo</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-4">
                <div className="text-center mb-6">
                  <p className="text-lg text-muted-foreground line-through">De R$ 690,00</p>
                  <p className="text-4xl font-black text-accent">12x R$ 34,90</p>
                  <p className="text-sm text-muted-foreground mt-1">ou R$ 350,00 à vista</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Declaração de IRPF 2026 Inclusa",
                    "Acompanhamento de CPF contra Malha Fina por 12 meses",
                    "Suporte Prioritário para dúvidas fiscais o ano todo",
                    "Alertas de pendências na Receita Federal",
                    "Retificação gratuita se necessário",
                    "Consultoria tributária contínua",
                  ].map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-foreground font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => window.open("https://mpago.li/2kDEmyK", "_blank")}
                  className="w-full h-13 text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-md"
                >
                  🚀 Garantir Blindagem 365
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3 — Empresas B2B */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Card className="h-full flex flex-col border shadow-sm">
              <CardHeader className="text-center pb-2 pt-8">
                <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Empresas & Folha de Pagamento</h3>
                <p className="text-sm text-muted-foreground">Para clínicas médicas e empresas com múltiplos colaboradores</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-4">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-foreground">Sob Consulta</p>
                  <p className="text-sm text-muted-foreground mt-1">Desconto progressivo a partir de 50 declarações</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Pacotes de 50+ declarações",
                    "Gestor de conta dedicado",
                    "Painel de acompanhamento",
                    "Desconto progressivo por volume",
                    "Prospecção ativa de colaboradores",
                  ].map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => window.open("https://wa.me/pspcontabil?text=Olá! Tenho interesse no pacote B2B para múltiplas declarações.", "_blank")}
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Consultar Orçamento B2B
                  <MessageCircle className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground mb-3">Dúvidas sobre qual plano escolher?</p>
          <Button
            variant="outline"
            onClick={() => window.open("https://wa.me/pspcontabil?text=Olá! Preciso de ajuda para escolher o plano ideal.", "_blank")}
            className="border-primary/20 hover:bg-primary/5"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Falar com Especialista
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
