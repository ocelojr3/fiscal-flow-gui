import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Newspaper } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinancialNews } from "@/hooks/useFinancialNews";

const NewsSection = () => {
  const { data: news, isLoading, isError } = useFinancialNews();

  const fallbackSources = [
    { name: "Portal Contábeis", url: "https://www.contabeis.com.br/", desc: "Notícias e artigos para contadores" },
    { name: "Receita Federal", url: "https://www.gov.br/receitafederal/pt-br/assuntos/noticias", desc: "Atualizações oficiais da RFB" },
    { name: "CFC", url: "https://cfc.org.br/", desc: "Normas e comunicados do CFC" },
    { name: "JOTA Tributário", url: "https://www.jota.info/tributos", desc: "Análises tributárias" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-accent" />
          <CardTitle className="text-lg">Notícias em Tempo Real</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading && (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 p-3 rounded-lg bg-secondary/30">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))}
          </>
        )}

        {!isLoading && news && news.length > 0 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Últimas Notícias</p>
            {news.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <p className="text-sm font-medium group-hover:text-accent transition-colors line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {new Date(item.pubDate).toLocaleDateString("pt-BR")}
                </p>
              </a>
            ))}
          </>
        )}

        {!isLoading && (!news || news.length === 0 || isError) && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Fontes Confiáveis</p>
            {fallbackSources.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="min-w-0">
                  <span className="text-sm font-medium group-hover:text-accent transition-colors">{item.name}</span>
                  <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent shrink-0 ml-2" />
              </a>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsSection;
