import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <video
            src="/logo-psp.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-10 w-auto md:h-14 object-contain"
          />
        </div>

        <Button
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6"
          onClick={() => window.open("https://wa.me/pspcontabil", "_blank")}
        >
          <Phone className="h-4 w-4 mr-2" />
          Falar com Especialista
        </Button>
      </div>
    </header>
  );
};

export default Header;
