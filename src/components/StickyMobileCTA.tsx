import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const StickyMobileCTA = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm border-t border-border p-3 flex gap-2">
        <Button
          onClick={() => window.open("https://wa.me/5511994595404?text=" + encodeURIComponent("Olá! Gostaria de falar com um consultor."), "_blank")}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-sm font-semibold"
        >
          🚀 Falar com Consultor Estratégico
        </Button>
        <Button
          variant="outline"
          className="h-12 px-4 border-primary/20"
          onClick={() => window.open("https://wa.me/pspcontabil", "_blank")}
        >
          <MessageCircle className="h-5 w-5 text-primary" />
        </Button>
      </div>
      <div className="h-20 md:hidden" />
    </>
  );
};

export default StickyMobileCTA;
