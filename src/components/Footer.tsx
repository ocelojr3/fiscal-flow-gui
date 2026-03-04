import { Link } from "react-router-dom";
import { ShieldCheck, Building2, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Verification Seal */}
      <div className="border-b border-border/20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-accent-foreground" />
            <span className="font-semibold">Escritório Verificado pelo CRC</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-accent-foreground" />
            <span className="font-semibold">Sede Própria em São Paulo</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-accent-foreground" />
            <a href="https://www.google.com/maps/search/PSP+Contabil+São+Paulo" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
              Ver localização
            </a>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-bold mb-3">Institucional</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><Link to="/" className="hover:text-secondary-foreground">Início</Link></li>
              <li><Link to="/quem-somos" className="hover:text-secondary-foreground">Quem Somos</Link></li>
              <li><Link to="/servicos" className="hover:text-secondary-foreground">Serviços</Link></li>
              <li><Link to="/contato" className="hover:text-secondary-foreground">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Serviços</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>Declaração IRPF</li>
              <li>Blindagem Fiscal 365</li>
              <li>Consultoria Tributária</li>
              <li>Folha de Pagamento</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Segurança</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><Link to="/politica-privacidade" className="hover:text-secondary-foreground">Política de Privacidade</Link></li>
              <li>Conformidade LGPD</li>
              <li>Dados Criptografados</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Contato</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="https://w.app/psp-contabil" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-foreground">WhatsApp</a></li>
              <li>contato@pspcontabil.com.br</li>
              <li>São Paulo — SP</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/20 mt-8 pt-6 text-center text-xs text-secondary-foreground/60">
          © {new Date().getFullYear()} PSP Contabil. Todos os direitos reservados. CNPJ: XX.XXX.XXX/0001-XX
        </div>
      </div>
    </footer>
  );
};

export default Footer;
