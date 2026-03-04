import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6 prose prose-sm max-w-none">
          <h1 className="text-3xl font-bold text-foreground mb-8">Política de Privacidade</h1>
          <p className="text-muted-foreground text-sm mb-6">Última atualização: Março de 2026</p>

          <section className="space-y-6 text-foreground">
            <div>
              <h2 className="text-xl font-semibold mb-2">1. Informações Gerais</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A PSP Contabil, pessoa jurídica de direito privado, com sede em São Paulo — SP, inscrita no CRC, é a controladora responsável pelo tratamento dos seus dados pessoais. Esta Política de Privacidade foi elaborada em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. Dados Coletados</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Coletamos os seguintes dados pessoais: nome completo, número de WhatsApp, CPF, e-mail e documentos fiscais (informes de rendimento). Esses dados são coletados exclusivamente para a prestação dos serviços contábeis contratados.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. Finalidade do Tratamento</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Os dados coletados são utilizados para: (a) elaboração da Declaração de Imposto de Renda; (b) monitoramento de situação fiscal junto à Receita Federal; (c) comunicação sobre andamento do serviço; (d) envio de alertas fiscais relevantes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Segurança dos Dados</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empregamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais, incluindo criptografia de ponta a ponta, controle de acesso restrito e monitoramento contínuo contra vazamentos e acessos não autorizados.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">5. Compartilhamento de Dados</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Seus dados pessoais não são compartilhados com terceiros, exceto quando necessário para a prestação do serviço (envio à Receita Federal do Brasil) ou por determinação legal.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">6. Direitos do Titular</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Você tem direito a: acessar seus dados, corrigir informações incompletas, solicitar a exclusão dos seus dados, revogar o consentimento e solicitar a portabilidade. Para exercer seus direitos, entre em contato pelo nosso canal de atendimento.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">7. Retenção de Dados</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Os dados pessoais serão retidos pelo prazo necessário ao cumprimento das finalidades descritas, respeitando os prazos legais de guarda documental exigidos pela legislação tributária brasileira (mínimo de 5 anos).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">8. Contato</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Para dúvidas ou solicitações relacionadas a esta Política de Privacidade, entre em contato através do nosso WhatsApp ou e-mail: contato@pspcontabil.com.br.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
