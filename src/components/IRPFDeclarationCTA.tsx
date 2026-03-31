import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Shield, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import DocumentUploadPanel from "./DocumentUploadPanel";
import { useWhatsApp } from "@/hooks/useWhatsApp";

const IRPFDeclarationCTA = () => {
  const [showUpload, setShowUpload] = useState(false);
  const { open: openWhatsApp } = useWhatsApp();

  const benefits = [
    { icon: Shield, text: "Declaração segura e sem erros" },
    { icon: CheckCircle2, text: "Revisão completa por especialista" },
    { icon: FileText, text: "Informe de rendimentos organizado" },
  ];

  return (
    <>
      <section className="py-16 relative overflow-hidden">
        {/* Fundo com gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50" />
        
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Lado esquerdo - Texto e CTA */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
                <FileText className="h-4 w-4" />
                IRPF 2026
              </div>

              <h2 className="text-4xl font-bold text-foreground leading-tight">
                Declare seu Imposto de Renda com{" "}
                <span className="text-primary">tranquilidade</span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Envie seus documentos de forma segura e deixe nossos especialistas
                cuidarem de tudo. Sem filas, sem estresse, sem erros.
              </p>

              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <b.icon className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-foreground font-medium">{b.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  size="lg"
                  onClick={() => setShowUpload(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 group"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Declarar meu Imposto de Renda
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base border-primary/20 hover:bg-primary/5"
                  onClick={() => openWhatsApp("Olá! Preciso de ajuda com meu IRPF.")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Falar com Especialista
                </Button>
              </div>
            </motion.div>

            {/* Lado direito - Card visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl border shadow-lg p-8 space-y-6">
                <div className="text-center space-y-2">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Informe de Rendimentos</h3>
                  <p className="text-sm text-muted-foreground">
                    Envie seus documentos em poucos cliques
                  </p>
                </div>

                {/* Simulação de steps */}
                {[
                  { step: 1, label: "Envie seus documentos", desc: "CPF, informe de rendimentos, recibos" },
                  { step: 2, label: "Análise especializada", desc: "Revisamos tudo com atenção" },
                  { step: 3, label: "Declaração pronta", desc: "Receba sua declaração validada" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-start gap-4 p-3 rounded-lg bg-secondary/70"
                  >
                    <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}

                <Button
                  onClick={() => setShowUpload(true)}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base"
                >
                  Começar Agora
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Decorative floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                100% Digital
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
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

export default IRPFDeclarationCTA;
