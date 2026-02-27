import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Newspaper, Rss } from "lucide-react";

const NewsSection = () => {
  const sources = [
    {
      category: "Nacionais",
      items: [
        { name: "Portal Contábeis", url: "https://www.contabeis.com.br/", desc: "Notícias e artigos para contadores" },
        { name: "Receita Federal - Notícias", url: "https://www.gov.br/receitafederal/pt-br/assuntos/noticias", desc: "Atualizações oficiais da RFB" },
        { name: "CFC - Conselho Federal", url: "https://cfc.org.br/", desc: "Normas e comunicados do CFC" },
        { name: "Valor Econômico", url: "https://valor.globo.com/", desc: "Economia e finanças" },
        { name: "JOTA - Tributário", url: "https://www.jota.info/tributos", desc: "Análises tributárias" },
        { name: "ConJur - Tributário", url: "https://www.conjur.com.br/secoes/direito-tributario/", desc: "Jurisprudência e legislação" },
      ]
    },
    {
      category: "Internacionais",
      items: [
        { name: "Accounting Today", url: "https://www.accountingtoday.com/", desc: "News for accounting professionals" },
        { name: "Journal of Accountancy", url: "https://www.journalofaccountancy.com/", desc: "AICPA publication" },
        { name: "IFRS News", url: "https://www.ifrs.org/news-and-events/", desc: "International standards updates" },
        { name: "Tax Foundation", url: "https://taxfoundation.org/", desc: "Tax policy research" },
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-accent" />
            <CardTitle className="text-lg">Fontes de Notícias Contábeis</CardTitle>
          </div>
          <Rss className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {sources.map((group, groupIdx) => (
          <div key={groupIdx}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
              {group.category}
            </h3>
            <div className="space-y-1.5">
              {group.items.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="min-w-0">
                    <span className="text-sm font-medium group-hover:text-accent transition-colors">
                      {item.name}
                    </span>
                    <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full mt-2" asChild>
          <a href="https://www.gov.br/receitafederal/pt-br" target="_blank" rel="noopener noreferrer">
            Acessar Portal da Receita Federal
            <ExternalLink className="h-3.5 w-3.5 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsSection;
