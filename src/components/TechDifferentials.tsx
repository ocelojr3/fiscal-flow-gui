import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, Lock, Zap } from "lucide-react";

const differentials = [
  {
    icon: Smartphone,
    title: "Aplicativo Próprio de Gestão",
    desc: "Acesse holerites, dados fiscais e atualizações em tempo real direto do seu celular.",
  },
  {
    icon: Lock,
    title: "Criptografia de Nível Bancário",
    desc: "Seus documentos e dados pessoais protegidos com criptografia AES-256 de ponta a ponta.",
  },
  {
    icon: ShieldCheck,
    title: "Conformidade LGPD",
    desc: "Todos os processos atendem à Lei Geral de Proteção de Dados. Ambiente auditado e certificado.",
  },
  {
    icon: Zap,
    title: "Automação Fiscal Inteligente",
    desc: "Nossos sistemas cruzam dados automaticamente para garantir o menor imposto legalmente possível.",
  },
];

const TechDifferentials = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Diferenciais <span className="text-primary">Tecnológicos</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Tecnologia de ponta para proteger seu patrimônio e simplificar sua vida fiscal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border rounded-xl p-6 text-center space-y-3"
            >
              <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechDifferentials;
