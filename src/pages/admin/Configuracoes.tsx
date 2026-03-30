import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save, Loader2 } from "lucide-react";

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
}

const LABELS: Record<string, string> = {
  whatsapp_number: "Número do WhatsApp",
  whatsapp_message_default: "Mensagem Padrão do WhatsApp",
  cnpj: "CNPJ",
  email_contato: "E-mail de Contato",
};

const Configuracoes = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await (supabase as any).from("site_settings").select("*").order("key");
    const rows: SiteSetting[] = data ?? [];
    setSettings(rows);
    const map: Record<string, string> = {};
    rows.forEach((r) => (map[r.key] = r.value));
    setValues(map);
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSave = async (key: string) => {
    setSaving(key);
    try {
      const { error } = await (supabase as any)
        .from("site_settings")
        .update({ value: values[key], updated_at: new Date().toISOString() })
        .eq("key", key);
      if (error) throw error;
      toast({ title: "Salvo!", description: `Configuração "${LABELS[key] ?? key}" atualizada.` });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro ao salvar", description: err.message });
    } finally {
      setSaving(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            Configurações do Site
          </h1>
          <p className="text-muted-foreground">Edite informações globais como WhatsApp, CNPJ e e-mail.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settings.map((s) => (
              <Card key={s.key}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    {LABELS[s.key] ?? s.key}
                  </CardTitle>
                  {s.description && (
                    <p className="text-xs text-muted-foreground">{s.description}</p>
                  )}
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Input
                    value={values[s.key] ?? ""}
                    onChange={(e) => setValues((prev) => ({ ...prev, [s.key]: e.target.value }))}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSave(s.key)}
                    disabled={saving === s.key}
                    className="shrink-0"
                  >
                    {saving === s.key ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Configuracoes;
