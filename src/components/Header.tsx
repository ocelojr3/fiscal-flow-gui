import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, UserCircle } from "lucide-react";
import SecurityBadge from "./SecurityBadge";
import { useWhatsApp } from "@/hooks/useWhatsApp";

const navLinks = [
  { label: "Início", to: "/" },
  { label: "Quem Somos", to: "/quem-somos" },
  { label: "Serviços", to: "/servicos" },
  { label: "Guias IRPF", to: "/guias" },
  { label: "Contato", to: "/contato" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openWhatsApp } = useWhatsApp();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <video
            src="/logo-psp.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-10 w-auto md:h-14 object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <SecurityBadge />
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
            <Link to="/portal/login">
              <UserCircle className="h-4 w-4 mr-2" />
              Área do Cliente
            </Link>
          </Button>
          <Button
            className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6"
            onClick={() => openWhatsApp("Olá! Gostaria de falar com um especialista.")}
          >
            <Phone className="h-4 w-4 mr-2" />
            Falar com Especialista
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-foreground/80 hover:text-foreground py-2"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="outline" className="w-full" asChild>
            <Link to="/portal/login" onClick={() => setMenuOpen(false)}>
              <UserCircle className="h-4 w-4 mr-2" />
              Área do Cliente
            </Link>
          </Button>
          <Button
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            onClick={() => openWhatsApp("Olá! Gostaria de falar com um especialista.")}
          >
            <Phone className="h-4 w-4 mr-2" />
            Falar com Especialista
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
