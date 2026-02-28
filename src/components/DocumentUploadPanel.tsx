import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, FileText, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  nativeFile: File;
}

interface DocumentUploadPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const DocumentUploadPanel = ({ open, onOpenChange }: DocumentUploadPanelProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"lead" | "upload" | "success">("lead");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 1: Save lead (name + whatsapp only)
  const handleSaveLead = async () => {
    if (!nome.trim() || whatsapp.replace(/\D/g, "").length < 10) return;
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .insert({ nome: nome.trim(), whatsapp: whatsapp.replace(/\D/g, "") })
        .select("id")
        .single();

      if (error) throw error;

      setLeadId(data.id);
      toast({ title: "Dados salvos!", description: "Agora envie seus documentos." });
      setStep("upload");
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro", description: err.message || "Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Upload files to storage
  const handleUploadFiles = async () => {
    if (!files.length || !leadId) return;
    setIsSubmitting(true);
    try {
      for (const file of files) {
        const path = `${leadId}/${Date.now()}_${file.name}`;
        const { error } = await supabase.storage
          .from("irpf_docs")
          .upload(path, file.nativeFile);
        if (error) throw error;
      }
      setStep("success");
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro no upload", description: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        name: f.name, size: f.size, type: f.type, nativeFile: f,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map((f) => ({
        name: f.name, size: f.size, type: f.type, nativeFile: f,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep("lead");
      setNome("");
      setWhatsapp("");
      setLeadId(null);
      setFiles([]);
    }, 300);
  };

  const canProceedLead = nome.trim().length >= 2 && whatsapp.replace(/\D/g, "").length >= 10;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {/* STEP 1: Lead capture */}
        {step === "lead" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5 text-primary" />
                Declaração IRPF 2026
              </DialogTitle>
              <DialogDescription>
                Preencha seus dados para iniciarmos. É rápido!
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Nome Completo</label>
                <Input placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">WhatsApp</label>
                <Input placeholder="(00) 00000-0000" value={whatsapp} onChange={(e) => setWhatsapp(formatPhone(e.target.value))} />
              </div>
              <Button
                onClick={handleSaveLead}
                disabled={!canProceedLead || isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-semibold"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                {isSubmitting ? "Salvando..." : "Continuar"}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Dados criptografados e protegidos.
              </div>
            </div>
          </>
        )}

        {/* STEP 2: File upload */}
        {step === "upload" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Upload className="h-5 w-5 text-accent" />
                Envie seus Documentos
              </DialogTitle>
              <DialogDescription>
                Arraste ou selecione o informe de rendimentos e outros documentos.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="bg-secondary/50 rounded-lg p-3 text-sm space-y-1">
                <p className="font-medium text-foreground flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-accent" />
                  Documentos aceitos:
                </p>
                <p className="text-muted-foreground text-xs ml-6">
                  Informe de rendimentos, comprovantes médicos, recibos (PDF, JPG, PNG)
                </p>
              </div>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragOver ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                }`}
              >
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="font-medium text-foreground">Arraste seus arquivos aqui</p>
                <p className="text-sm text-muted-foreground mt-1">ou clique para selecionar</p>
                <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileSelect} className="hidden" />
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                      </div>
                      <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={handleUploadFiles}
                disabled={files.length === 0 || isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-semibold"
              >
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Enviando...</>
                ) : (
                  "Enviar Documentos"
                )}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Seus dados são criptografados de ponta a ponta. Ambiente 100% seguro contra vazamentos.
              </div>
            </div>
          </>
        )}

        {/* STEP 3: Success */}
        {step === "success" && (
          <div className="text-center py-8 space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-accent/15 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Documentos Enviados!</h3>
            <p className="text-muted-foreground">
              Recebemos seus documentos com sucesso. Nossa equipe entrará em contato pelo seu WhatsApp em breve.
            </p>
            <Button onClick={handleClose} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadPanel;
