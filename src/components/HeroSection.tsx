import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, MessageCircle } from "lucide-react";
import DocumentUploadPanel from "./DocumentUploadPanel";

const HeroSection = () => {
  const [showUpload, setShowUpload] = useState(false);

  const steps = [
    { step: 1, label: "Envie seus documentos", desc: "CPF, informe de rendimentos, recibos" },
    { step: 2, label: "Análise especializada", desc: "Revisamos tudo com atenção" },
    { step: 3, label: "Declaração pronta", desc: "Receba sua declaração validada" },
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Copy lado esquerdo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold">
                <FileText className="h-4 w-4" />
                IRPF 2026
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Evite a Malha Fina e Garanta sua Restituição{" "}
                <span className="text-primary">Mais Rápido.</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Envie seus arquivos de forma 100% digital e segura. Nossa equipe de
                especialistas cuida de toda a burocracia para você.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={() => setShowUpload(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 h-14 text-lg font-semibold group"
                >
                  Começar Minha Declaração
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base border-primary/20 hover:bg-primary/5 h-14 text-lg"
                  onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Tirar Dúvidas no WhatsApp
                </Button>
              </div>
            </motion.div>

            {/* Card 3 passos lado direito */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl border shadow-lg p-8 space-y-6">
                <div className="text-center space-y-2">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Como funciona?</h3>
                  <p className="text-sm text-muted-foreground">
                    Simples, rápido e seguro
                  </p>
                </div>

                {steps.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary/70"
                  >
                    <div className="h-10 w-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}

                <Button
                  onClick={() => setShowUpload(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base h-12"
                >
                  Começar Agora
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

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

export default HeroSection;
