import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye, EyeOff, Upload, Loader2, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const Guias = () => {
  const [guides, setGuides] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", content: "", category: "irpf", is_published: false });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchGuides = async () => {
    const { data } = await supabase.from("guides").select("*").order("sort_order");
    setGuides(data ?? []);
  };

  useEffect(() => { fetchGuides(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", slug: "", description: "", content: "", category: "irpf", is_published: false });
    setPdfFile(null);
    setDialogOpen(true);
  };

  const openEdit = (guide: any) => {
    setEditing(guide);
    setForm({
      title: guide.title,
      slug: guide.slug,
      description: guide.description ?? "",
      content: guide.content ?? "",
      category: guide.category,
      is_published: guide.is_published,
    });
    setPdfFile(null);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim()) {
      toast({ variant: "destructive", title: "Preencha título e slug" });
      return;
    }
    setSaving(true);
    try {
      let pdf_url = editing?.pdf_url ?? null;

      if (pdfFile) {
        const path = `${form.slug}/${pdfFile.name}`;
        const { error: uploadErr } = await supabase.storage.from("guide_pdfs").upload(path, pdfFile, { upsert: true });
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage.from("guide_pdfs").getPublicUrl(path);
        pdf_url = urlData.publicUrl;
      }

      if (editing) {
        await supabase.from("guides").update({ ...form, pdf_url }).eq("id", editing.id);
      } else {
        await supabase.from("guides").insert({ ...form, pdf_url });
      }

      toast({ title: editing ? "Guia atualizado" : "Guia criado" });
      setDialogOpen(false);
      fetchGuides();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro", description: err.message });
    } finally {
      setSaving(false);
    }
  };

  const deleteGuide = async (id: string) => {
    if (!confirm("Excluir este guia?")) return;
    await supabase.from("guides").delete().eq("id", id);
    fetchGuides();
    toast({ title: "Guia excluído" });
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("guides").update({ is_published: !current }).eq("id", id);
    fetchGuides();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Guias & Manuais</h1>
            <p className="text-muted-foreground">Gerencie conteúdo educativo IRPF</p>
          </div>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Guia
          </Button>
        </div>

        {guides.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Nenhum guia criado. Clique em "Novo Guia" para começar.
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {guides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{guide.title}</p>
                    <p className="text-xs text-muted-foreground">/{guide.slug} • {guide.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => togglePublish(guide.id, guide.is_published)}
                    title={guide.is_published ? "Despublicar" : "Publicar"}
                  >
                    {guide.is_published ? <Eye className="h-4 w-4 text-accent" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => openEdit(guide)}>Editar</Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteGuide(guide.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Guia" : "Novo Guia"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Título</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Como declarar IRPF 2026" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Slug (URL)</label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })} placeholder="como-declarar-irpf-2026" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Descrição</label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Conteúdo (texto do guia)</label>
              <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} placeholder="Escreva o conteúdo completo do guia aqui..." />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">PDF (opcional)</label>
              <Input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)} />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
              <span className="text-sm">Publicar imediatamente</span>
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              {saving ? "Salvando..." : editing ? "Salvar Alterações" : "Criar Guia"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Guias;
