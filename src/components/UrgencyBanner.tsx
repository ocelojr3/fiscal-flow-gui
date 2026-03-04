import { useState } from "react";
import { X } from "lucide-react";

const UrgencyBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="sticky top-0 z-[60] bg-destructive text-destructive-foreground py-2.5 px-4 text-center text-sm font-bold tracking-wide">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
        <span>⚠️ Vagas para Planejamento Tributário 2026 limitadas por região</span>
        <span className="bg-destructive-foreground text-destructive px-2 py-0.5 rounded font-black text-xs uppercase">
          CONSULTE DISPONIBILIDADE
        </span>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
          aria-label="Fechar banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default UrgencyBanner;
