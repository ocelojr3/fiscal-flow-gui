import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Loader2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ADMIN_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || "5511994595404";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"email" | "whatsapp">("email");
  const navigate = useNavigate();
  const { toast } = useToast();

  const verifyAdminRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Usuário não encontrado");

    const { data: isAdmin } = await supabase
      .rpc("has_role", { _user_id: user.id, _role: "admin" });

    if (!isAdmin) {
      await supabase.auth.signOut();
      throw new Error("Acesso negado. Você não tem permissão de administrador.");
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await verifyAdminRole();
      navigate("/admin");
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      "Olá! Solicito acesso ao Painel Administrativo PSP Contábil. Favor enviar minhas credenciais de acesso."
    );
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${message}`, "_blank");
    toast({
      title: "WhatsApp aberto",
      description: "Após receber suas credenciais, faça login com email e senha abaixo.",
    });
    setMode("email");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Painel Administrativo</CardTitle>
          <p className="text-sm text-muted-foreground">PSP Contábil — Acesso Restrito</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pspcontabil.com"
                  required
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Senha</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  maxLength={128}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-accent/30 hover:bg-accent/5"
            onClick={handleWhatsAppRedirect}
          >
            <MessageCircle className="h-4 w-4 mr-2 text-accent" />
            Solicitar Acesso via WhatsApp
          </Button>

          <p className="text-[11px] text-muted-foreground text-center">
            Ao solicitar via WhatsApp, suas credenciais serão enviadas ao número cadastrado do administrador.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
