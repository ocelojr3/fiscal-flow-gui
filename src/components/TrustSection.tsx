import { motion } from "framer-motion";
import { Users, ShieldCheck, Lock, MapPin, Building2 } from "lucide-react";

const trustItems = [
  {
    icon: Building2,
    title: "Empresa com Sede Própria",
    desc: "Mais de 10 anos de tradição em São Paulo. Estrutura sólida por trás de uma plataforma 100% digital.",
  },
  {
    icon: MapPin,
    title: "Sede Física em São Paulo",
    desc: "Visite-nos ou agende uma reunião. Estamos localizados e verificados no Google Meu Negócio, garantindo transparência total.",
    mapLink: true,
  },
  {
    icon: Users,
    title: "Atendimento Humanizado e Especializado",
    desc: "Cada cliente recebe atenção personalizada da nossa equipe de contadores certificados.",
  },
  {
    icon: ShieldCheck,
    title: "Proteção contra Phishing e Vazamentos",
    desc: "Seus dados trafegam com criptografia de ponta e monitoramento contra fraudes.",
  },
  {
    icon: Lock,
    title: "Ambiente 100% Seguro e Adequado à LGPD",
    desc: "Conformidade total com a Lei Geral de Proteção de Dados. Sua privacidade é prioridade.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Por que confiar na <span className="text-primary">PSP Contabil</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border rounded-2xl p-8 text-center space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="h-14 w-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              {"mapLink" in item && item.mapLink && (
                <a
                  href="https://www.google.com/maps/search/PSP+Contabil+São+Paulo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Ver nossa localização no Google Maps
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
