import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, ArrowRight, Building2, Shield, Scale, MessageCircle, Zap, Smartphone, Crown, FileText, CreditCard } from "lucide-react";
import { usePromoExpiry } from "@/hooks/usePromoExpiry";

const PricingSection = () => {
  const isOfferValid = usePromoExpiry();
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
            PLANEJAMENTO TRIBUTÁRIO AVANÇADO
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-serif">
            Soluções sob medida <span className="text-primary">para cada perfil</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Do profissional autônomo à empresa com centenas de colaboradores. Máxima eficiência fiscal, zero dor de cabeça.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {/* Card 1 — Consultoria Tributária */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="h-full flex flex-col border shadow-sm relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 z-10">
                <Crown className="h-3 w-3" />
                VIP / EXCLUSIVO
              </div>
              <CardHeader className="text-center pb-2 pt-8">
                <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Consultoria Tributária</h3>
                <p className="text-sm text-muted-foreground">Planejamento estratégico para PF e PJ</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-4">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-foreground">Sob Consulta</p>
                  <p className="text-sm text-muted-foreground mt-1">Orçamento personalizado para seu perfil</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Análise tributária completa",
                    "Planejamento fiscal estratégico",
                    "Recuperação de créditos tributários",
                    "Revisão por Contador certificado",
                    "Suporte contínuo via WhatsApp",
                  ].map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => window.open("https://wa.me/5511994595404?text=" + encodeURIComponent("Olá! Gostaria de solicitar uma análise de perfil tributário."), "_blank")}
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Solicitar Análise de Perfil
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2 — IRPF 2026 (ancoragem de preço) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="relative"
          >
            <Card className="h-full flex flex-col border shadow-sm">
              <CardHeader className="text-center pb-2 pt-8">
                <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Declaração IRPF 2026</h3>
                <p className="text-sm text-muted-foreground">100% digital, revisada por contador</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-4">
                <div className="text-center mb-6">
                  {isOfferValid ? (
                    <>
                      <p className="text-lg text-muted-foreground line-through">De R$ 690,00</p>
                      <p className="text-2xl font-bold text-foreground">12x de <span className="text-accent">R$ 34,90</span></p>
                      <p className="text-xs text-muted-foreground mt-1">ou R$ 349,00 à vista</p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-bold text-foreground">Sob Consulta</p>
                      <p className="text-xs text-muted-foreground mt-1">Lote promocional encerrado</p>
                    </>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Declaração completa PF",
                    "Revisão por contador certificado",
                    "Retificação gratuita se necessário",
                    "Suporte via WhatsApp por 12 meses",
                  ].map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                {isOfferValid ? (
                  <Button
                    onClick={() => window.open("https://mpago.li/2kDEmyK", "_blank")}
                    className="w-full h-12 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Garantir Minha Vaga
                  </Button>
                ) : (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-destructive">⚠️ Lote encerrado</p>
                    <a
                      href={"https://wa.me/5511994595404?text=" + encodeURIComponent("Olá! Gostaria de saber o valor atual do IRPF 2026.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary underline font-semibold mt-1 inline-block"
                    >
                      Consultar Valor Atual
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2 — Gestão de Folha (destaque) */}
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
                <h3 className="font-bold text-foreground text-lg">Gestão de Folha de Pagamento</h3>
                <p className="text-sm text-muted-foreground">Gestão completa de colaboradores</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-4">
                <div className="text-center mb-6">
                  <p className="text-lg text-accent font-bold">Apenas R$ 1,15 por hora de trabalho</p>
                  <p className="text-sm text-muted-foreground mt-1">Gestão completa para 1-5 funcionários a partir de R$ 350,00/mês</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Gestão completa de folha de pagamento",
                    "eSocial e obrigações acessórias inclusos",
                    "Suporte Prioritário o ano todo",
                    "Gestão de férias, rescisões e admissões",
                    "Retificação gratuita se necessário",
                    "Acesso a Aplicativo Exclusivo para holerites e dados em tempo real",
                  ].map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-foreground font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                {isOfferValid ? (
                  <Button
                    onClick={() => window.open("https://wa.me/pspcontabil?text=Olá! Tenho interesse na Gestão de Folha de Pagamento.", "_blank")}
                    className="w-full h-13 text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-md"
                  >
                    Contratar Gestão de Folha
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                ) : (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-destructive">⚠️ Oferta encerrada para este lote</p>
                    <a
                      href="https://wa.me/pspcontabil?text=Olá! Gostaria de consultar o valor atual da Gestão de Folha."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary underline font-semibold mt-1 inline-block"
                    >
                      Consultar Valor Atual no WhatsApp
                    </a>
                  </div>
                )}
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Smartphone className="h-3.5 w-3.5 text-accent" />
                  Inclui app exclusivo para gestão em tempo real
                </div>
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
                <h3 className="font-bold text-foreground">Empresas & Múltiplas Declarações</h3>
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
                {isOfferValid ? (
                  <Button
                    onClick={() => window.open("https://wa.me/pspcontabil?text=Olá! Tenho interesse no pacote B2B para múltiplas declarações.", "_blank")}
                    className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Consultar Orçamento B2B
                    <MessageCircle className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-destructive">⚠️ Oferta encerrada para este lote</p>
                    <a
                      href="https://wa.me/pspcontabil?text=Olá! Gostaria de consultar o valor atual do pacote B2B."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary underline font-semibold mt-1 inline-block"
                    >
                      Consultar Valor Atual no WhatsApp
                    </a>
                  </div>
                )}
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
          <p className="text-sm text-muted-foreground mb-3">Dúvidas sobre qual solução escolher?</p>
          <Button
            variant="outline"
            onClick={() => window.open("https://wa.me/pspcontabil?text=Olá! Preciso de ajuda para escolher a solução ideal.", "_blank")}
            className="border-primary/20 hover:bg-primary/5"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Falar com Consultor Estratégico
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
