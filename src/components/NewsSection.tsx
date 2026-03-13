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
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-accent" />
          <CardTitle className="text-lg">Notícias em Tempo Real</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/30 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && news && news.length > 0 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Últimas Notícias</p>
            <div className="grid grid-cols-1 gap-2">
              {news.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl border border-transparent hover:border-accent/20 hover:bg-accent/5 hover:shadow-sm transition-all duration-200 group"
                >
                  <p className="text-sm font-semibold group-hover:text-accent transition-colors line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[11px] text-muted-foreground/70">
                      {new Date(item.pubDate).toLocaleDateString("pt-BR")}
                    </p>
                    <ExternalLink className="h-3 w-3 text-muted-foreground/50 group-hover:text-accent transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {!isLoading && (!news || news.length === 0 || isError) && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Fontes Confiáveis</p>
            <div className="grid grid-cols-1 gap-2">
              {fallbackSources.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-accent/20 hover:bg-accent/5 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="min-w-0">
                    <span className="text-sm font-semibold group-hover:text-accent transition-colors">{item.name}</span>
                    <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsSection;
