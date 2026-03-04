import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "O que acontece se eu cair na Malha Fina?",
    a: "Com o plano Blindagem 365, monitoramos seu CPF junto à Receita Federal durante 12 meses. Caso seja identificada qualquer pendência, nossos contadores entram em ação imediatamente para resolver — sem custo adicional de retificação.",
  },
  {
    q: "Meus dados estão seguros na plataforma?",
    a: "Sim. Utilizamos criptografia de ponta a ponta, armazenamento em servidores com certificação de segurança e conformidade total com a LGPD (Lei Geral de Proteção de Dados). Seus documentos são acessados apenas por contadores autorizados.",
  },
  {
    q: "Como funciona o envio de documentos?",
    a: "Tudo é 100% digital. Você envia seus informes de rendimento (PDF ou foto) diretamente pela nossa plataforma ou pelo WhatsApp. Nosso sistema processa e organiza automaticamente para o contador.",
  },
  {
    q: "Quem faz minha declaração? É inteligência artificial?",
    a: "Não. Cada declaração é revisada e assinada por um contador registrado no CRC (Conselho Regional de Contabilidade). Utilizamos tecnologia para agilizar o processo, mas a revisão final é sempre humana e profissional.",
  },
  {
    q: "Posso parcelar o pagamento?",
    a: "Sim! O plano Blindagem 365 pode ser parcelado em até 12x de R$ 34,90 no cartão de crédito, ou R$ 350,00 à vista com desconto. Aceitamos cartão, Pix e boleto.",
  },
  {
    q: "Qual a diferença entre declaração avulsa e Blindagem 365?",
    a: "A declaração avulsa inclui apenas a entrega do IRPF. Já o Blindagem 365 inclui a declaração + monitoramento de CPF por 12 meses contra Malha Fina + suporte prioritário + retificação gratuita se necessário.",
  },
  {
    q: "A PSP Contabil é uma empresa real com sede física?",
    a: "Sim! Temos mais de 30 anos de atuação e sede própria em São Paulo — SP. Nossa localização é verificada no Google Meu Negócio e você pode nos visitar a qualquer momento.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="h-4 w-4" />
            PERGUNTAS FREQUENTES
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Tire suas dúvidas sobre o <span className="text-primary">Leão</span>
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem value={`faq-${i}`} className="bg-card border rounded-xl px-4">
                <AccordionTrigger className="text-left text-sm font-semibold text-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
