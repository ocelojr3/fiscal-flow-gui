import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, ExternalLink, MessageSquare, Upload, Loader2 } from "lucide-react";

type Client = { id: string; nome: string; whatsapp: string };
type Doc = {
  id: string;
  client_id: string;
  title: string;
  description: string | null;
  file_url: string;
  month_ref: string | null;
  is_payment_guide: boolean;
  created_at: string;
  clients?: { nome: string };
};

const Documentos = () => {
  const [searchParams] = useSearchParams();
  const preselectedClientId = searchParams.get("cliente") ?? "";

  const [docs, setDocs] = useState<Doc[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState(preselectedClientId);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    client_id: preselectedClientId,
    title: "",
    description: "",
    month_ref: "",
    is_payment_guide: false,
  });
  const { toast } = useToast();

  const fetchDocs = async () => {
    let q = supabase
      .from("client_documents" as any)
      .select("*, clients(nome)")
      .order("created_at", { ascending: false });
    if (selectedClient) q = q.eq("client_id", selectedClient);
    const { data } = await q;
    setDocs((data ?? []) as Doc[]);
  };

  useEffect(() => {
    supabase.from("clients" as any).select("id, nome, whatsapp").order("nome").then(({ data }) => {
      setClients((data ?? []) as Client[]);
    });
  }, []);

  useEffect(() => { fetchDocs(); }, [selectedClient]);

  const openNew = () => {
    setForm({ client_id: selectedClient, title: "", description: "", month_ref: "", is_payment_guide: false });
    setFile(null);
    setOpen(true);
  };

  const handleUpload = async () => {
    if (!form.client_id || !form.title || !file) {
      toast({ variant: "destructive", title: "Preencha cliente, título e selecione o arquivo." });
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${form.client_id}/${Date.now()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("client_docs")
        .upload(path, file);
      if (upErr) throw upErr;

      const { data: { publicUrl } } = supabase.storage
        .from("client_docs")
        .getPublicUrl(path);

      await supabase.from("client_documents" as any).insert({
        client_id: form.client_id,
        title: form.title,
        description: form.description || null,
        file_url: publicUrl,
        file_type: ext ?? "pdf",
        month_ref: form.month_ref || null,
        is_payment_guide: form.is_payment_guide,
      });

      // Send WhatsApp notification if client has whatsapp
      const client = clients.find((c) => c.id === form.client_id);
      if (client) {
        const msg = encodeURIComponent(
          `Olá, ${client.nome}! Um novo documento foi disponibilizado no seu portal PSP Contábil: *${form.title}*.\nAcesse: ${window.location.origin}/portal/dashboard`
        );
        window.open(`https://wa.me/${client.whatsapp}?text=${msg}`, "_blank", "noopener,noreferrer");
      }

      toast({ title: "Documento publicado!", description: "WhatsApp de notificação aberto." });
      setOpen(false);
      fetchDocs();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro ao publicar", description: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (doc: Doc) => {
    if (!confirm(`Excluir "${doc.title}"? Esta ação não pode ser desfeita.`)) return;
    // Remove from storage
    const storagePath = doc.file_url.split("/client_docs/")[1];
    if (storagePath) await supabase.storage.from("client_docs").remove([storagePath]);
    await supabase.from("client_documents" as any).delete().eq("id", doc.id);
    fetchDocs();
    toast({ title: "Documento excluído" });
  };

  const notifyWhatsApp = (doc: Doc) => {
    const client = clients.find((c) => c.id === doc.client_id);
    if (!client) return;
    const msg = encodeURIComponent(
      `Olá, ${client.nome}! Lembrete: você tem um documento disponível no portal PSP Contábil: *${doc.title}*.\nAcesse: ${window.location.origin}/portal/dashboard`
    );
    window.open(`https://wa.me/${client.whatsapp}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Documentos</h1>
            <p className="text-muted-foreground">Publique guias e documentos para os clientes</p>
          </div>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4 mr-2" /> Publicar documento
          </Button>
        </div>

        <div className="max-w-xs">
          <Select value={selectedClient || "all"} onValueChange={(v) => setSelectedClient(v === "all" ? "" : v)}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os clientes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os clientes</SelectItem>
              {clients.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Competência</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Publicado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {docs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhum documento publicado
                    </TableCell>
                  </TableRow>
                )}
                {docs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.title}</TableCell>
                    <TableCell className="text-sm">{doc.clients?.nome ?? "—"}</TableCell>
                    <TableCell className="text-sm">{doc.month_ref ?? "—"}</TableCell>
                    <TableCell>
                      {doc.is_payment_guide ? (
                        <Badge>Guia</Badge>
                      ) : (
                        <Badge variant="secondary">Documento</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(doc.created_at).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="icon" variant="ghost" asChild>
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => notifyWhatsApp(doc)}>
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(doc)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upload Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Publicar documento</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1">Cliente *</label>
                <Select value={form.client_id} onValueChange={(v) => setForm({ ...form, client_id: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Título *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex: Guia DAS Março/2026"
                  maxLength={200}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Descrição</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Instrução adicional para o cliente..."
                  rows={2}
                  maxLength={500}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Competência (mês/ano)</label>
                <Input
                  value={form.month_ref}
                  onChange={(e) => setForm({ ...form, month_ref: e.target.value })}
                  placeholder="2026-03"
                  maxLength={7}
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.is_payment_guide}
                  onCheckedChange={(v) => setForm({ ...form, is_payment_guide: v })}
                  id="is_guide"
                />
                <label htmlFor="is_guide" className="text-sm">É guia de recolhimento (cliente envia comprovante)</label>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Arquivo (PDF, imagem) *</label>
                <label className="cursor-pointer">
                  <div className={`border-2 border-dashed rounded-md p-4 text-center text-sm transition-colors ${file ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50"}`}>
                    {file ? (
                      <span className="text-primary font-medium">{file.name}</span>
                    ) : (
                      <span className="text-muted-foreground flex items-center justify-center gap-2">
                        <Upload className="h-4 w-4" /> Clique para selecionar
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={handleUpload} disabled={uploading}>
                {uploading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {uploading ? "Enviando..." : "Publicar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Documentos;
