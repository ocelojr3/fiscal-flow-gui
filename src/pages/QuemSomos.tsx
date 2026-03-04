import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Award, Users, Clock, MapPin, ShieldCheck } from "lucide-react";

const milestones = [
  { year: "1994", text: "Fundação da PSP Contabil em São Paulo" },
  { year: "2005", text: "Expansão para atendimento corporativo e folha de pagamento" },
  { year: "2015", text: "Adoção de plataforma 100% digital para declarações" },
  { year: "2020", text: "Mais de 5.000 declarações entregues com sucesso" },
  { year: "2024", text: "Lançamento do programa Blindagem Fiscal 365" },
];

const values = [
  { icon: ShieldCheck, title: "Segurança", desc: "Criptografia de ponta a ponta e conformidade total com a LGPD." },
  { icon: Users, title: "Atendimento Humanizado", desc: "Cada cliente tem atenção personalizada de contadores certificados." },
  { icon: Award, title: "Excelência Técnica", desc: "Equipe registrada no CRC com atualização contínua em legislação tributária." },
  { icon: Clock, title: "Agilidade", desc: "Processos digitais que entregam resultados em até 48 horas." },
];

const QuemSomos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary to-background">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Building2 className="h-4 w-4" />
                DESDE 1994
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                30 anos de tradição contábil em <span className="text-primary">São Paulo</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Somos uma empresa com sede própria, registrada no CRC, que combina décadas de experiência com tecnologia de ponta para proteger seu patrimônio fiscal.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Nossa Trajetória</h2>
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 bg-card border rounded-xl"
                >
                  <span className="bg-primary text-primary-foreground font-bold px-3 py-1.5 rounded-lg text-sm shrink-0">{m.year}</span>
                  <p className="text-foreground">{m.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border rounded-2xl p-6 flex gap-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Sede Própria em São Paulo</h2>
            <p className="text-muted-foreground mb-6">
              Visite-nos ou agende uma reunião presencial. Transparência e confiança começam com um endereço real.
            </p>
            <a
              href="https://www.google.com/maps/search/PSP+Contabil+São+Paulo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <MapPin className="h-4 w-4" />
              Ver no Google Maps
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuemSomos;
