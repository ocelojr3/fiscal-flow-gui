import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, ArrowRight } from "lucide-react";

const GuiasPublic = () => {
  const [guides, setGuides] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("guides")
      .select("id, title, slug, description, pdf_url, category")
      .eq("is_published", true)
      .order("sort_order")
      .then(({ data }) => setGuides(data ?? []));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-3">
            Guias Gratuitos — IRPF 2026
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Aprenda a fazer sua própria declaração de Imposto de Renda com nossos guias passo a passo.
            Para casos mais complexos, conte com nossa consultoria especializada.
          </p>
        </div>

        {guides.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Nenhum guia disponível no momento.</p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                    <Link to={`/guias/${guide.slug}`}>
                      <Button variant="outline" size="sm">
                        Acessar Guia <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA consultoria */}
        <div className="mt-16 text-center bg-primary/5 border border-primary/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground font-serif mb-2">Caso Complexo?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Investimentos, ganhos no exterior, múltiplas fontes de renda? Nossa equipe resolve para você com segurança total.
          </p>
          <Button
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
            onClick={() => window.open("https://wa.me/pspcontabil?text=Olá! Preciso de consultoria para meu IRPF.", "_blank")}
          >
            Falar com Consultor Especialista
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuiasPublic;
