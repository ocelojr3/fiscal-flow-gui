import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle2, XCircle, Loader2, FileSpreadsheet, Download } from "lucide-react";
import * as XLSX from "xlsx";

type Row = {
  nome: string;
  cpf?: string;
  email?: string;
  whatsapp: string;
  status?: string;
  _result?: "ok" | "error" | "skip";
  _message?: string;
};

const REQUIRED_COLS = ["nome", "whatsapp"];

const Importar = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [importing, setImporting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

        // Normalize column names to lowercase
        const normalized: Row[] = json.map((r) => {
          const lower: any = {};
          for (const key of Object.keys(r)) lower[key.toLowerCase().trim()] = r[key];
          return {
            nome: String(lower.nome ?? "").trim(),
            cpf: String(lower.cpf ?? "").trim() || undefined,
            email: String(lower.email ?? "").trim() || undefined,
            whatsapp: String(lower.whatsapp ?? lower["celular"] ?? lower["telefone"] ?? "").trim(),
            status: "ativo",
          };
        }).filter((r) => r.nome || r.whatsapp);

        if (normalized.length === 0) {
          toast({ variant: "destructive", title: "Planilha vazia ou sem colunas reconhecidas." });
          return;
        }

        setRows(normalized);
        setDone(false);
      } catch {
        toast({ variant: "destructive", title: "Erro ao ler planilha", description: "Certifique-se de usar .xlsx ou .csv." });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImport = async () => {
    if (rows.length === 0) return;
    setImporting(true);
    const updated = [...rows];

    for (let i = 0; i < updated.length; i++) {
      const r = updated[i];
      if (!r.nome || !r.whatsapp) {
        updated[i] = { ...r, _result: "error", _message: "Nome e WhatsApp são obrigatórios" };
        continue;
      }

      // Check if client with same email/whatsapp already exists
      if (r.email) {
        const { data: existing } = await supabase
          .from("clients" as any)
          .select("id")
          .eq("email", r.email)
          .maybeSingle();
        if (existing) {
          updated[i] = { ...r, _result: "skip", _message: "Email já cadastrado" };
          continue;
        }
      }

      const { error } = await supabase.from("clients" as any).insert({
        nome: r.nome,
        cpf: r.cpf ?? null,
        email: r.email ?? null,
        whatsapp: r.whatsapp,
        status: r.status ?? "ativo",
        user_id: null,
      });

      if (error) {
        updated[i] = { ...r, _result: "error", _message: error.message };
      } else {
        updated[i] = { ...r, _result: "ok", _message: "Importado com sucesso" };
      }

      setRows([...updated]);
    }

    setImporting(false);
    setDone(true);
    const ok = updated.filter((r) => r._result === "ok").length;
    const skipped = updated.filter((r) => r._result === "skip").length;
    const errors = updated.filter((r) => r._result === "error").length;
    toast({
      title: "Importação concluída",
      description: `${ok} importados, ${skipped} ignorados, ${errors} erros.`,
    });
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["nome", "cpf", "email", "whatsapp"],
      ["João Silva", "000.000.000-00", "joao@email.com", "5511999999999"],
      ["Maria Santos", "", "maria@email.com", "5511888888888"],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");
    XLSX.writeFile(wb, "modelo_clientes.xlsx");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Importar Clientes</h1>
          <p className="text-muted-foreground">
            Importe uma lista de clientes a partir de uma planilha Excel (.xlsx) ou CSV
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Upload area */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" /> Selecionar planilha
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="cursor-pointer block">
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Clique para selecionar</p>
                  <p className="text-xs text-muted-foreground mt-1">.xlsx ou .csv — máx. 5MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls,.csv"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
              </label>
              <Button variant="outline" size="sm" className="w-full" onClick={downloadTemplate}>
                <Download className="h-4 w-4 mr-2" /> Baixar modelo
              </Button>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Formato esperado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                A planilha deve conter as seguintes colunas (primeira linha = cabeçalho):
              </p>
              <ul className="text-sm space-y-1">
                <li><span className="font-medium">nome</span> <span className="text-destructive">*</span> — nome completo</li>
                <li><span className="font-medium">whatsapp</span> <span className="text-destructive">*</span> — ex: 5511999999999</li>
                <li><span className="font-medium">email</span> — para acesso ao portal</li>
                <li><span className="font-medium">cpf</span> — opcional</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3">
                Clientes com email já cadastrado serão ignorados.
                Após importar, atribua senhas individualmente em <strong>Clientes</strong>.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Preview + results */}
        {rows.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">
                {done ? "Resultado da importação" : `Pré-visualização — ${rows.length} linha(s)`}
              </CardTitle>
              {!done && (
                <Button onClick={handleImport} disabled={importing}>
                  {importing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {importing ? "Importando..." : "Importar tudo"}
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>CPF</TableHead>
                    {done && <TableHead>Resultado</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{r.nome || <span className="text-destructive">—</span>}</TableCell>
                      <TableCell className="text-sm">{r.email ?? "—"}</TableCell>
                      <TableCell className="text-sm">{r.whatsapp || <span className="text-destructive">—</span>}</TableCell>
                      <TableCell className="text-sm">{r.cpf ?? "—"}</TableCell>
                      {done && (
                        <TableCell>
                          {r._result === "ok" && (
                            <Badge variant="default" className="gap-1">
                              <CheckCircle2 className="h-3 w-3" /> OK
                            </Badge>
                          )}
                          {r._result === "skip" && (
                            <Badge variant="secondary" className="gap-1">
                              Ignorado
                            </Badge>
                          )}
                          {r._result === "error" && (
                            <Badge variant="destructive" className="gap-1">
                              <XCircle className="h-3 w-3" /> {r._message}
                            </Badge>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default Importar;
