import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, BookOpen, Scale, Building2, Globe } from "lucide-react";
import { motion } from "framer-motion";

const TaxReformResources = () => {
  const categories = [
    {
      title: "Reforma Tributária 2026",
      icon: Scale,
      description: "Acompanhe todas as mudanças da reforma tributária em andamento",
      links: [
        { label: "PLP 68/2024 - Texto da Reforma", url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm", tag: "Lei Complementar" },
        { label: "IBS e CBS - Novas regras", url: "https://www.gov.br/receitafederal/pt-br/assuntos/reforma-tributaria", tag: "Receita Federal" },
        { label: "Regulamentação do IVA Dual", url: "https://www.gov.br/fazenda/pt-br/assuntos/reforma-tributaria", tag: "Min. Fazenda" },
        { label: "Período de Transição 2026-2033", url: "https://www.gov.br/receitafederal/pt-br/assuntos/reforma-tributaria/transicao", tag: "Cronograma" },
      ]
    },
    {
      title: "Manuais e Guias - Receita Federal",
      icon: FileText,
      description: "Downloads de manuais oficiais atualizados",
      links: [
        { label: "Manual do IRPF 2026", url: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda", tag: "IRPF" },
        { label: "IN RFB - Instruções Normativas", url: "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/legislacao/instrucoes-normativas", tag: "Legislação" },
        { label: "Manual do eSocial", url: "https://www.gov.br/esocial/pt-br/documentacao-tecnica", tag: "Trabalhista" },
        { label: "Manual da EFD-Reinf", url: "https://www.gov.br/receitafederal/pt-br/assuntos/efd-reinf", tag: "SPED" },
        { label: "Manual da DCTF Web", url: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/declaracoes-e-demonstrativos/DCTFWeb", tag: "Obrigações" },
      ]
    },
    {
      title: "SPED e Obrigações Acessórias",
      icon: Building2,
      description: "Sistema Público de Escrituração Digital",
      links: [
        { label: "Portal do SPED", url: "https://www.gov.br/receitafederal/pt-br/assuntos/sped", tag: "Portal" },
        { label: "ECD - Escrituração Contábil", url: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/declaracoes-e-demonstrativos/sped-fiscal/escrituracao-contabil-digital-ecd", tag: "ECD" },
        { label: "ECF - Escrituração Fiscal", url: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/declaracoes-e-demonstrativos/sped-fiscal/escrituracao-contabil-fiscal-ecf", tag: "ECF" },
        { label: "NF-e / NFS-e", url: "https://www.nfe.fazenda.gov.br/portal/principal.aspx", tag: "Notas Fiscais" },
      ]
    },
    {
      title: "Portais Internacionais",
      icon: Globe,
      description: "Normas e atualizações contábeis globais",
      links: [
        { label: "IFRS Foundation - Normas Internacionais", url: "https://www.ifrs.org/", tag: "IFRS" },
        { label: "IASB - Padrões Contábeis", url: "https://www.ifrs.org/groups/international-accounting-standards-board/", tag: "IASB" },
        { label: "OECD Tax Policy", url: "https://www.oecd.org/tax/", tag: "OCDE" },
        { label: "IRS - Receita dos EUA", url: "https://www.irs.gov/", tag: "EUA" },
        { label: "Deloitte Tax News", url: "https://www.deloitte.com/global/en/services/tax.html", tag: "Consultoria" },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Central de Legislação e Reforma Tributária</h2>
          <p className="text-muted-foreground mt-1">
            Links oficiais, manuais e atualizações organizados para você
          </p>
        </div>
        <BookOpen className="h-8 w-8 text-accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <category.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{category.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-sm text-foreground group-hover:text-accent transition-colors truncate">
                        {link.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                        {link.tag}
                      </span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaxReformResources;
