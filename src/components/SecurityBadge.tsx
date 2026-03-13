import { ShieldCheck, Lock } from "lucide-react";

interface SecurityBadgeProps {
  variant?: "inline" | "compact";
}

const SecurityBadge = ({ variant = "inline" }: SecurityBadgeProps) => {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-accent" />
        <span>Criptografia AES-256</span>
        <span className="text-border">|</span>
        <Lock className="h-3.5 w-3.5 text-accent" />
        <span>SSL Ativo</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-semibold">
        <ShieldCheck className="h-3.5 w-3.5" />
        AES-256
      </div>
      <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold">
        <Lock className="h-3.5 w-3.5" />
        SSL Protegido
      </div>
    </div>
  );
};

export default SecurityBadge;
