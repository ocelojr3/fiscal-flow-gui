import { useQuery } from '@tanstack/react-query';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
}

const fetchNews = async (): Promise<NewsItem[]> => {
  const feeds = [
    'https://www.infomoney.com.br/economia/feed/',
    'https://valor.globo.com/financas/rss',
  ];

  for (const feed of feeds) {
    try {
      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`
      );
      const data = await res.json();
      if (data.status === 'ok' && data.items?.length) {
        return data.items.slice(0, 4).map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description: item.description?.replace(/<[^>]*>/g, '').slice(0, 120) + '...',
          thumbnail: item.thumbnail || item.enclosure?.link,
        }));
      }
    } catch {
      continue;
    }
  }

  return [];
};

export const useFinancialNews = () => {
  return useQuery({
    queryKey: ['financial-news'],
    queryFn: fetchNews,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
};
