import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-primary rounded-lg">
            <span className="text-xl font-bold text-primary-foreground">P</span>
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            PSP CONTABIL
          </h1>
        </div>

        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6">
          <Phone className="h-4 w-4 mr-2" />
          Falar com Especialista
        </Button>
      </div>
    </header>
  );
};

export default Header;
