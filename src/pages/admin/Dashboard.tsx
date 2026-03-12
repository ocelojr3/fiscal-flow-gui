import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, FileText, Download, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({ leads: 0, novos: 0, downloads: 0, docs: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [leadsRes, novosRes, downloadsRes] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "novo"),
        supabase.from("guide_downloads").select("id", { count: "exact", head: true }),
      ]);

      // Count files in irpf_docs bucket
      const { data: files } = await supabase.storage.from("irpf_docs").list("", { limit: 1000 });
      
      setStats({
        leads: leadsRes.count ?? 0,
        novos: novosRes.count ?? 0,
        downloads: downloadsRes.count ?? 0,
        docs: files?.length ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total de Leads", value: stats.leads, icon: Users, color: "text-primary" },
    { label: "Leads Novos", value: stats.novos, icon: TrendingUp, color: "text-accent" },
    { label: "Downloads de Guias", value: stats.downloads, icon: Download, color: "text-emerald-500" },
    { label: "Documentos IRPF", value: stats.docs, icon: FileText, color: "text-amber-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do funil IRPF 2026</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Card key={c.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
                <c.icon className={`h-5 w-5 ${c.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{c.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentLeads />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

const RecentLeads = () => {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data }) => setLeads(data ?? []));
  }, []);

  return (
    <div className="space-y-3">
      {leads.length === 0 && <p className="text-sm text-muted-foreground">Nenhum lead ainda.</p>}
      {leads.map((lead) => (
        <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div>
            <p className="font-medium text-sm">{lead.nome}</p>
            <p className="text-xs text-muted-foreground">{lead.whatsapp}</p>
          </div>
          <div className="text-right">
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              lead.status === "novo" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
            }`}>
              {lead.status}
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(lead.created_at).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
