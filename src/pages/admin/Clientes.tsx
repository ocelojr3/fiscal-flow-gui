import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Search, Plus, Pencil, FileText, UserCheck, UserX } from "lucide-react";
import { Link } from "react-router-dom";

type Client = {
  id: string;
  nome: string;
  cpf: string | null;
  email: string | null;
  whatsapp: string;
  status: string;
  user_id: string | null;
  created_at: string;
};

const empty: Omit<Client, "id" | "created_at"> = {
  nome: "", cpf: "", email: "", whatsapp: "", status: "ativo", user_id: null,
};

const Clientes = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase
      .from("clients" as any)
      .select("*")
      .order("nome");
    setClients((data ?? []) as Client[]);
  };

  useEffect(() => { fetch(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...empty });
    setPassword("");
    setOpen(true);
  };

  const openEdit = (c: Client) => {
    setEditing(c);
    setForm({ nome: c.nome, cpf: c.cpf ?? "", email: c.email ?? "", whatsapp: c.whatsapp, status: c.status, user_id: c.user_id });
    setPassword("");
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.nome || !form.whatsapp) {
      toast({ variant: "destructive", title: "Preencha nome e WhatsApp" });
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        // Update existing
        await supabase.from("clients" as any).update({
          nome: form.nome,
          cpf: form.cpf || null,
          email: form.email || null,
          whatsapp: form.whatsapp,
          status: form.status,
        }).eq("id", editing.id);

        // Update password if provided
        if (password && editing.user_id) {
          await supabase.auth.admin.updateUserById(editing.user_id, { password });
        }

        toast({ title: "Cliente atualizado" });
      } else {
        // Create auth user if email provided
        let userId: string | null = null;
        if (form.email && password) {
          const { data: authData, error: authErr } = await supabase.auth.admin.createUser({
            email: form.email,
            password,
            email_confirm: true,
          });
          if (authErr) throw authErr;
          userId = authData.user?.id ?? null;
        }

        await supabase.from("clients" as any).insert({
          nome: form.nome,
          cpf: form.cpf || null,
          email: form.email || null,
          whatsapp: form.whatsapp,
          status: form.status,
          user_id: userId,
        });

        toast({ title: "Cliente criado", description: userId ? "Acesso ao portal habilitado." : "Sem acesso ao portal (sem email/senha)." });
      }

      setOpen(false);
      fetch();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro", description: err.message });
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (c: Client) => {
    const newStatus = c.status === "ativo" ? "inativo" : "ativo";
    await supabase.from("clients" as any).update({ status: newStatus }).eq("id", c.id);
    fetch();
    toast({ title: `Cliente ${newStatus === "ativo" ? "ativado" : "desativado"}` });
  };

  const filtered = clients.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      (c.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      c.whatsapp.includes(search)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Clientes</h1>
            <p className="text-muted-foreground">Gerencie os clientes e o acesso ao portal</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/admin/importar">Importar planilha</Link>
            </Button>
            <Button onClick={openNew}>
              <Plus className="h-4 w-4 mr-2" /> Novo cliente
            </Button>
          </div>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou WhatsApp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Portal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhum cliente encontrado
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.nome}</TableCell>
                    <TableCell className="text-sm">{c.email ?? "—"}</TableCell>
                    <TableCell className="text-sm">{c.whatsapp}</TableCell>
                    <TableCell>
                      {c.user_id ? (
                        <Badge variant="default" className="text-xs">Ativo</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">Sem acesso</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={c.status === "ativo" ? "secondary" : "destructive"} className="text-xs">
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(c)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/admin/documentos?cliente=${c.id}`}>
                          <FileText className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => toggleStatus(c)}>
                        {c.status === "ativo" ? (
                          <UserX className="h-4 w-4 text-destructive" />
                        ) : (
                          <UserCheck className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Create / Edit Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editing ? "Editar cliente" : "Novo cliente"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1">Nome *</label>
                <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} maxLength={200} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium block mb-1">CPF</label>
                  <Input value={form.cpf ?? ""} onChange={(e) => setForm({ ...form, cpf: e.target.value })} maxLength={14} placeholder="000.000.000-00" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">WhatsApp *</label>
                  <Input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} maxLength={20} placeholder="5511999999999" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Email (login do portal)</label>
                <Input type="email" value={form.email ?? ""} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} placeholder="cliente@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  {editing ? "Nova senha (deixe em branco para manter)" : "Senha do portal"}
                </label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={128} placeholder="••••••••" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Clientes;
