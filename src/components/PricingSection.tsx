import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, ArrowRight, Building2, Shield, Stethoscope, MessageCircle } from "lucide-react";

const plans = [
  {
    name: "Individual",
    highlight: "R$ 11,66/dia",
    price: "R$ 350",
    installment: "ou 12x de R$ 34,90",
    description: "Ideal para médicos autônomos e profissionais de saúde",
    icon: Stethoscope,
    features: [
      "Declaração IRPF completa",
      "Dedução de Livro Caixa",
      "Revisão por especialista",
      "Suporte via WhatsApp",
      "Envio digital 100% seguro",
    ],
    cta: "Contratar Agora",
    href: "https://mpago.li/2kDEmyK",
    popular: true,
  },
  {
    name: "Prestador de Serviço",
    highlight: "Sob Consulta",
    price: "Pacote B2B",
    installment: "Desconto progressivo a partir de 50 declarações",
    description: "Para clínicas de SST e empresas com múltiplos colaboradores",
    icon: Building2,
    features: [
      "Pacotes de 50+ declarações",
      "Gestor de conta dedicado",
      "Painel de acompanhamento",
      "Desconto progressivo por volume",
      "Prospecção ativa de colaboradores",
    ],
    cta: "Falar com Consultor",
    href: "https://wa.me/pspcontabil?text=Olá! Tenho interesse no pacote Clínica SST para múltiplas declarações.",
    popular: false,
  },
  {
    name: "Consultoria Tributaria",
    highlight: "R$ 350,00/mês",
    price: "R$ 59,90",
    installment: "Recorrência mensal — cancele quando quiser",
    description: "IRPF incluso + monitoramento de malha fina o ano todo",
    icon: Shield,
    features: [
      "Declaração IRPF inclusa",
      "Monitoramento de Malha Fina 12 meses",
      "Alertas de pendências na Receita",
      "Retificação gratuita se necessário",
      "Consultoria tributária contínua",
    ],
    cta: "Assinar Blindagem",
    href: "https://mpago.li/2kDEmyK",
    popular: false,
  },
];

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
            <Stethoscope className="h-4 w-4" />
            PLANOS PARA PROFISSIONAIS DE SAÚDE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Escolha o plano ideal para sua <span className="text-primary">realidade</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Do médico autônomo à clínica com centenas de colaboradores. Preços que cabem no orçamento com o máximo de restituição.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold z-10 shadow-md">
                  MAIS POPULAR
                </div>
              )}
              <Card
                className={`h-full flex flex-col ${
                  plan.popular
                    ? "border-accent shadow-lg ring-2 ring-accent/20"
                    : "border shadow-sm"
                }`}
              >
                <CardHeader className="text-center pb-2 pt-8">
                  <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <plan.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col pt-4">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-foreground">{plan.highlight}</p>
                    <p className="text-sm text-muted-foreground mt-1">{plan.installment}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <span className="text-foreground">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => window.open(plan.href, "_blank")}
                    className={`w-full h-12 text-base font-semibold ${
                      plan.popular
                        ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
