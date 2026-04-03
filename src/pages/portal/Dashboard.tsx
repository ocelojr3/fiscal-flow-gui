import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  FileText, Upload, LogOut, Loader2, CheckCircle2, Clock, ExternalLink,
} from "lucide-react";

type Document = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  month_ref: string | null;
  is_payment_guide: boolean;
  created_at: string;
  payment_proofs?: { id: string; status: string; file_url: string }[];
};

type Client = {
  id: string;
  nome: string;
  email: string | null;
};

const PortalDashboard = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/portal/login"); return; }

      const { data: clientData } = await supabase
        .from("clients" as any)
        .select("id, nome, email")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!clientData) { navigate("/portal/login"); return; }
      setClient(clientData as Client);

      const { data: docs } = await supabase
        .from("client_documents" as any)
        .select("*, payment_proofs(id, status, file_url)")
        .eq("client_id", (clientData as Client).id)
        .order("created_at", { ascending: false });

      setDocuments((docs ?? []) as Document[]);
      setLoading(false);
    };
    load();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/portal/login");
  };

  const handleUploadProof = async (documentId: string, file: File) => {
    if (!client) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ variant: "destructive", title: "Arquivo muito grande", description: "Máximo 10MB." });
      return;
    }

    setUploading(documentId);
    try {
      const ext = file.name.split(".").pop();
      const path = `${client.id}/${documentId}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("payment_proofs")
        .upload(path, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("payment_proofs")
        .getPublicUrl(path);

      await supabase.from("payment_proofs" as any).insert({
        client_document_id: documentId,
        client_id: client.id,
        file_url: publicUrl,
        status: "pendente",
      });

      toast({ title: "Comprovante enviado!", description: "Aguarde a confirmação do escritório." });

      // Reload documents
      const { data: docs } = await supabase
        .from("client_documents" as any)
        .select("*, payment_proofs(id, status, file_url)")
        .eq("client_id", client.id)
        .order("created_at", { ascending: false });
      setDocuments((docs ?? []) as Document[]);
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro ao enviar", description: err.message });
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const guides = documents.filter((d) => d.is_payment_guide);
  const others = documents.filter((d) => !d.is_payment_guide);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <Link to="/" className="font-bold text-primary">PSP Contábil</Link>
            <p className="text-xs text-muted-foreground">Olá, {client?.nome}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> Sair
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold">Meus Documentos</h1>
          <p className="text-sm text-muted-foreground">
            Acesse suas guias de recolhimento e documentos fiscais
          </p>
        </div>

        {documents.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>Nenhum documento disponível ainda.</p>
              <p className="text-xs mt-1">O escritório irá publicar seus documentos aqui.</p>
            </CardContent>
          </Card>
        )}

        {/* Payment guides */}
        {guides.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Guias de Recolhimento
            </h2>
            {guides.map((doc) => {
              const proof = doc.payment_proofs?.[0];
              return (
                <Card key={doc.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{doc.title}</CardTitle>
                      {proof ? (
                        <Badge variant={proof.status === "confirmado" ? "default" : "secondary"}>
                          {proof.status === "confirmado" ? (
                            <><CheckCircle2 className="h-3 w-3 mr-1" /> Confirmado</>
                          ) : (
                            <><Clock className="h-3 w-3 mr-1" /> Aguardando</>
                          )}
                        </Badge>
                      ) : (
                        <Badge variant="outline">Sem comprovante</Badge>
                      )}
                    </div>
                    {doc.month_ref && (
                      <p className="text-xs text-muted-foreground">
                        Competência: {doc.month_ref}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {doc.description && (
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5 mr-1" /> Abrir guia
                        </a>
                      </Button>
                      {!proof && (
                        <label className="cursor-pointer">
                          <Button size="sm" asChild disabled={uploading === doc.id}>
                            <span>
                              {uploading === doc.id ? (
                                <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                              ) : (
                                <Upload className="h-3.5 w-3.5 mr-1" />
                              )}
                              Enviar comprovante
                            </span>
                          </Button>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleUploadProof(doc.id, f);
                            }}
                          />
                        </label>
                      )}
                      {proof && (
                        <Button size="sm" variant="ghost" asChild>
                          <a href={proof.file_url} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-3.5 w-3.5 mr-1" /> Ver comprovante
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>
        )}

        {/* Other documents */}
        {others.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Outros Documentos
            </h2>
            {others.map((doc) => (
              <Card key={doc.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{doc.title}</CardTitle>
                  {doc.month_ref && (
                    <p className="text-xs text-muted-foreground">Competência: {doc.month_ref}</p>
                  )}
                </CardHeader>
                <CardContent>
                  {doc.description && (
                    <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>
                  )}
                  <Button size="sm" variant="outline" asChild>
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5 mr-1" /> Abrir documento
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default PortalDashboard;
