import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, Loader2, FileText, ShieldCheck } from "lucide-react";

const GuiaDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const [guide, setGuide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPdfForm, setShowPdfForm] = useState(false);
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("guides")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()
      .then(({ data, error }) => {
        if (!error) setGuide(data);
        setLoading(false);
      });
  }, [slug]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 10) return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
    return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
  };

  const handleDownloadPdf = async () => {
    if (!nome.trim() || whatsapp.replace(/\D/g, "").length < 10) return;
    setSubmitting(true);
    try {
      // Save lead
      const { data: leadData } = await supabase
        .from("leads")
        .insert({ nome: nome.trim(), whatsapp: whatsapp.replace(/\D/g, ""), source: "guia_pdf" })
        .select("id")
        .single();

      // Track download
      await supabase.from("guide_downloads").insert({
        guide_id: guide.id,
        lead_id: leadData?.id ?? null,
        nome: nome.trim(),
        whatsapp: whatsapp.replace(/\D/g, ""),
      });

      // Open PDF
      window.open(guide.pdf_url, "_blank");
      toast({ title: "Download liberado!", description: "O PDF será aberto em uma nova aba." });
      setShowPdfForm(false);
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro", description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Guia não encontrado</h1>
          <Link to="/guias"><Button variant="outline">Voltar aos Guias</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <Link to="/guias" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Voltar aos Guias
        </Link>

        <h1 className="text-3xl font-bold text-foreground font-serif mb-4">{guide.title}</h1>
        {guide.description && (
          <p className="text-lg text-muted-foreground mb-8">{guide.description}</p>
        )}

        {/* Guide content */}
        {guide.content && (
          <div className="prose prose-sm max-w-none text-foreground/90 mb-10 whitespace-pre-wrap leading-relaxed">
            {guide.content}
          </div>
        )}

        {/* PDF download with lead capture */}
        {guide.pdf_url && !showPdfForm && (
          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="p-6 text-center">
              <FileText className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Baixe o PDF Completo</h3>
              <p className="text-sm text-muted-foreground mb-4">Tenha este guia offline para consultar quando precisar.</p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setShowPdfForm(true)}>
                <Download className="h-4 w-4 mr-2" />
                Baixar PDF Gratuito
              </Button>
            </CardContent>
          </Card>
        )}

        {guide.pdf_url && showPdfForm && (
          <Card className="border-accent/30">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground text-center">Preencha para baixar</h3>
              <Input placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              <Input placeholder="(00) 00000-0000" value={whatsapp} onChange={(e) => setWhatsapp(formatPhone(e.target.value))} />
              <Button
                onClick={handleDownloadPdf}
                disabled={submitting || !nome.trim() || whatsapp.replace(/\D/g, "").length < 10}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                {submitting ? "Processando..." : "Baixar Agora"}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Dados protegidos. Não enviamos spam.
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-3">Precisa de ajuda profissional?</p>
          <Button
            variant="outline"
            onClick={() => window.open("https://wa.me/pspcontabil?text=Olá! Li o guia sobre IRPF e preciso de consultoria.", "_blank")}
          >
            Falar com Consultor
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuiaDetalhe;
