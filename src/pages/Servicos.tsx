import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import CountdownTimer from "@/components/CountdownTimer";
import { FileText, BarChart3, Scale, Users } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "IRPF — Declaração de Imposto de Renda",
    desc: "Declaração completa para pessoas físicas, incluindo deduções de livro caixa, ganhos de capital, rendimentos no exterior e muito mais. Revisada por contador registrado no CRC.",
    features: ["Declaração completa e otimizada", "Dedução de Livro Caixa", "Ganhos de capital e investimentos", "Revisão por contador certificado"],
  },
  {
    icon: BarChart3,
    title: "Consultoria Financeira",
    desc: "Análise completa da sua situação financeira com recomendações personalizadas para otimizar seus investimentos e reduzir sua carga tributária legalmente.",
    features: ["Planejamento de investimentos", "Análise de perfil tributário", "Estratégias de economia fiscal", "Relatórios periódicos"],
  },
  {
    icon: Scale,
    title: "Planejamento Tributário",
    desc: "Estudo aprofundado para empresas e profissionais liberais que buscam reduzir legalmente a carga tributária através de enquadramentos e regimes fiscais otimizados.",
    features: ["Escolha do regime tributário ideal", "Simulações comparativas", "Compliance fiscal contínuo", "Acompanhamento legislativo"],
  },
  {
    icon: Users,
    title: "Gestão de Folha de Pagamento",
    desc: "Gestão completa de folha para clínicas médicas e empresas com múltiplos colaboradores. Inclui eSocial, DCTF-Web e todas as obrigações acessórias.",
    features: ["Cálculo e processamento de folha", "eSocial e obrigações acessórias", "Gestão de férias e rescisões", "Suporte trabalhista contínuo"],
  },
];

const Servicos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary to-background">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Nossos <span className="text-primary">Serviços</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Soluções contábeis completas para pessoa física e jurídica, com tecnologia e atendimento humanizado.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground mb-4">{s.desc}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <CountdownTimer />
        </div>

        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Servicos;
