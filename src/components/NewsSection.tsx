import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NewsSection = () => {
  const news = [
    {
      date: "06/10/25",
      title: "DISPENSA DE TÉCNICA DE HOSPITAL PÚBLICO ...",
      description: "A Sétima Turma do Tribunal Superior do Trabalho rejeitou o recurso de uma técnica em secretariado do Hospital de Clínicas de Porto Alegre (RS) que pretendia anular sua dispensa.",
    },
  ];

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-lg">Notícias Diárias</CardTitle>
        <div className="text-sm opacity-90">📅 06/10/25</div>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.map((item, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-semibold text-base">{item.title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">{item.description}</p>
            <Button variant="secondary" size="sm">
              Ver Notícia
            </Button>
          </div>
        ))}
        
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-accent' : 'bg-primary-foreground/30'}`}
              />
            ))}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="secondary" className="w-full mt-4">
          + NOTÍCIAS CLIQUE AQUI
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsSection;
