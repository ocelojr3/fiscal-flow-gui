import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, ArrowRight, MessageCircle, ShieldCheck, Loader2, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DocumentUploadPanel from "./DocumentUploadPanel";
import CountdownTimer from "./CountdownTimer";
import { usePromoExpiry } from "@/hooks/usePromoExpiry";

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
};

const HeroSection = () => {
  const isOfferValid = usePromoExpiry();
  const { toast } = useToast();
  const [showUpload, setShowUpload] = useState(false);
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);

  const canSubmit = nome.trim().length >= 2 && whatsapp.replace(/\D/g, "").length >= 10;

  const handleInlineLead = async () => {
    if (!canSubmit) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("leads")
        .insert({ nome: nome.trim(), whatsapp: whatsapp.replace(/\D/g, "") });
      if (error) throw error;
      setLeadSaved(true);
      toast({ title: "Dados salvos!", description: "Agora envie seus documentos." });
      setShowUpload(true);
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro", description: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const steps = [
    { step: 1, label: "Informe seus dados", desc: "Nome e WhatsApp — só isso!" },
    { step: 2, label: "Envie seus documentos", desc: "Informe de rendimentos em PDF" },
    { step: 3, label: "Proteção contínua por 12 meses", desc: "Monitoramos seu patrimônio e obrigações fiscais" },
  ];

  return (
    <>
      {/* Urgency sub-banner */}
      <div className="bg-accent/10 border-b border-accent/20 py-2 text-center">
        <p className="text-xs md:text-sm font-semibold text-accent">
          ⚠️ Vagas para Planejamento Tributário 2026 limitadas por região
        </p>
      </div>

      <section className="py-12 md:py-20 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold">
                <TrendingUp className="h-4 w-4" />
                PLANEJAMENTO TRIBUTÁRIO AVANÇADO
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight font-serif">
                Segurança e Recuperação de Patrimônio{" "}
                <span className="text-primary">com Inteligência Contábil.</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Não entregamos apenas declarações — oferecemos consultoria tributária estratégica com proteção contínua do seu patrimônio. 100% digital, revisado por contador, com suporte prioritário.
              </p>

              <CountdownTimer />

              {/* Mobile: CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 lg:hidden">
                <Button
                  size="lg"
                  onClick={() => window.open("https://wa.me/5511994595404?text=" + encodeURIComponent("Olá! Gostaria de falar com um consultor tributário."), "_blank")}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-6 h-14 font-semibold group"
                >
                  🚀 Falar com Consultor Estratégico
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base border-primary/20 hover:bg-primary/5 h-14"
                  onClick={() => window.open("https://wa.me/5511994595404?text=" + encodeURIComponent("Olá! Tenho dúvidas sobre IRPF 2026."), "_blank")}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Tirar Dúvidas
                </Button>
              </div>

              {/* Desktop: 3 steps */}
              <div className="hidden lg:block space-y-3 pt-4">
                {steps.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/70"
                  >
                    <div className="h-9 w-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Lead capture form (desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="bg-card rounded-2xl border shadow-lg p-8 space-y-6">
                <div className="text-center space-y-2">
                  <div className="h-14 w-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Consultoria Tributária Estratégica</h3>
                  <p className="text-sm text-muted-foreground">
                    Preencha e receba uma análise personalizada
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Nome Completo</label>
                    <Input placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} className="h-12" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">WhatsApp</label>
                    <Input placeholder="(00) 00000-0000" value={whatsapp} onChange={(e) => setWhatsapp(formatPhone(e.target.value))} className="h-12" />
                  </div>
                </div>

                <Button
                  onClick={handleInlineLead}
                  disabled={!canSubmit || isSaving}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base h-13 font-semibold"
                >
                  {isSaving ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Salvando...</>
                  ) : (
                    <>
                      Solicitar Análise Tributária
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Dados criptografados de ponta a ponta. Ambiente 100% seguro.
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                12 meses de proteção
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-3 -left-3 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                Sem Filas
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <DocumentUploadPanel open={showUpload} onOpenChange={setShowUpload} />
    </>
  );
};

export default HeroSection;
