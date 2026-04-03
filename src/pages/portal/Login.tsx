import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogIn, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PortalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Check if user is a client (has a clients record linked to their user_id)
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado");

      const { data: clientRecord } = await supabase
        .from("clients" as any)
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!clientRecord) {
        // Not a client — check if admin, redirect accordingly
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin");

        if (roles?.length) {
          navigate("/admin");
        } else {
          await supabase.auth.signOut();
          throw new Error("Sua conta não está vinculada a nenhum cliente. Entre em contato com a PSP Contábil.");
        }
        return;
      }

      navigate("/portal/dashboard");
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro ao entrar", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/portal/nova-senha`,
      });
      if (error) throw error;
      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
      setResetMode(false);
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Logo / Brand */}
        <div className="text-center space-y-1">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold text-primary">PSP Contábil</h1>
          </Link>
          <p className="text-sm text-muted-foreground">Portal do Cliente</p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              {resetMode ? (
                <><KeyRound className="h-5 w-5" /> Redefinir Senha</>
              ) : (
                <><LogIn className="h-5 w-5" /> Acesso ao Portal</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {resetMode ? (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Informe seu email cadastrado para receber o link de redefinição.
                </p>
                <div>
                  <label className="text-sm font-medium block mb-1">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    maxLength={255}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Enviar link de redefinição
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setResetMode(false)}
                >
                  Voltar ao login
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
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
                  {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={() => setResetMode(true)}
                >
                  Esqueci minha senha
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground">
          Não tem acesso?{" "}
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "5511994595404"}?text=${encodeURIComponent("Olá! Gostaria de acessar o Portal do Cliente PSP Contábil.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Fale conosco no WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
};

export default PortalLogin;
