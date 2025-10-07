import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center bg-accent rounded">
              <span className="text-xl font-bold text-accent-foreground">T</span>
            </div>
            <h1 className="text-xl font-bold">TRIBUTARIUM</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-accent transition-colors">BOLETINS</a>
            <a href="#" className="hover:text-accent transition-colors">AGENDA</a>
            <a href="#" className="hover:text-accent transition-colors">LEGISLAÇÃO</a>
            <a href="#" className="hover:text-accent transition-colors">FERRAMENTAS</a>
            <a href="#" className="hover:text-accent transition-colors">BOLETIM DIÁRIO</a>
            <a href="#" className="hover:text-accent transition-colors">CURSOS</a>
            <a href="#" className="hover:text-accent transition-colors">FAQ</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            CENTRAL DE CONSULTAS
          </Button>
          <Button variant="ghost" size="sm" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary">
            ÁREA DO CLIENTE
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
