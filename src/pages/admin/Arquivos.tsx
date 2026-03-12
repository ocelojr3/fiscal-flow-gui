import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Trash2, FolderOpen, Loader2 } from "lucide-react";

interface LeadFolder {
  leadId: string;
  leadName: string;
  files: { name: string; path: string; size: number; created: string }[];
}

const Arquivos = () => {
  const [folders, setFolders] = useState<LeadFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFiles = async () => {
      // Get all leads
      const { data: leads } = await supabase.from("leads").select("id, nome").order("created_at", { ascending: false });
      if (!leads) { setLoading(false); return; }

      const result: LeadFolder[] = [];
      for (const lead of leads) {
        const { data: files } = await supabase.storage.from("irpf_docs").list(lead.id);
        if (files?.length) {
          result.push({
            leadId: lead.id,
            leadName: lead.nome,
            files: files.map((f) => ({
              name: f.name,
              path: `${lead.id}/${f.name}`,
              size: f.metadata?.size ?? 0,
              created: f.created_at,
            })),
          });
        }
      }
      setFolders(result);
      setLoading(false);
    };
    fetchFiles();
  }, []);

  const downloadFile = async (path: string) => {
    const { data, error } = await supabase.storage.from("irpf_docs").createSignedUrl(path, 60);
    if (error) {
      toast({ variant: "destructive", title: "Erro", description: error.message });
      return;
    }
    window.open(data.signedUrl, "_blank");
  };

  const deleteFile = async (path: string) => {
    if (!confirm("Excluir este arquivo?")) return;
    await supabase.storage.from("irpf_docs").remove([path]);
    toast({ title: "Arquivo excluído" });
    // Refresh
    setFolders((prev) =>
      prev.map((f) => ({ ...f, files: f.files.filter((file) => file.path !== path) }))
        .filter((f) => f.files.length > 0)
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Arquivos IRPF</h1>
          <p className="text-muted-foreground">Documentos enviados pelos clientes</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {!loading && folders.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Nenhum documento enviado ainda.
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {folders.map((folder) => (
            <Card key={folder.leadId}>
              <CardHeader
                className="cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => setOpenFolder(openFolder === folder.leadId ? null : folder.leadId)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-accent" />
                    {folder.leadName}
                  </CardTitle>
                  <span className="text-xs text-muted-foreground">{folder.files.length} arquivo(s)</span>
                </div>
              </CardHeader>
              {openFolder === folder.leadId && (
                <CardContent className="space-y-2 pt-0">
                  {folder.files.map((file) => (
                    <div key={file.path} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {file.created ? new Date(file.created).toLocaleDateString("pt-BR") : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => downloadFile(file.path)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => deleteFile(file.path)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Arquivos;
