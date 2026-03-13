import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LatestPublications = () => {
  const publications = [
    {
      category: "Federal - Trabalhista",
      title: "LEI Nº 15.232, DE 6 DE OUTUBRO DE 2025 (DOU DE 07.10.2025)",
      description: "Altera a Lei nº 13.819, de 26 de abril de 2019, que institui a Política Nacional de Prevenção da Automutilação e do Suicídio, para prever ações direcionadas às pessoas psicologicamente vulneráveis.",
    },
    {
      category: "Estadual",
      title: "DECRETO Nº 16.680, DE 3 DE OUTUBRO DE 2025.",
      description: "Altera a redação e acrescenta dispositivos ao Anexo I - Dos Benefícios Fiscais, e ao Anexo V - Dos Regimes Especiais, das Autorizações Especiais, e das outras providências.",
    },
    {
      category: "Municipal",
      title: "LEI MUNICIPAL Nº 130/2025 DE 25 DE SETEMBRO DE 2025",
      description: '"ALTERA A LEI N. 312 DE 10 DE OUTUBRO DE 2005."',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Últimas Publicações</h2>
        <Link to="/guias">
          <Button variant="link" className="text-accent">
            Ver mais →
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {publications.map((pub, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-accent">{pub.category}</span>
                  <Link to="/servicos" className="ml-auto">
                    <Button variant="link" className="text-accent p-0 h-auto">
                      Ver mais →
                    </Button>
                  </Link>
                </div>
                <h3 className="font-semibold">{pub.title}</h3>
                <p className="text-sm text-muted-foreground">{pub.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-foreground text-sm">📰 Jornal no eSocial — PSP Contábil</p>
          <p className="text-xs text-muted-foreground">Acompanhe nossas publicações e atualizações no LinkedIn</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-primary/30 hover:bg-primary/10 shrink-0"
          onClick={() => window.open("https://www.linkedin.com/showcase/jornal-e-social", "_blank", "noopener,noreferrer")}
        >
          Seguir no LinkedIn →
        </Button>
      </div>
    </div>
  );
};

export default LatestPublications;
