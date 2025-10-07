import { useQuery } from '@tanstack/react-query';

interface CurrencyData {
  label: string;
  type: string;
  value: string;
  change?: number;
}

const fetchFinancialIndicators = async (): Promise<CurrencyData[]> => {
  try {
    // API do Banco Central do Brasil para cotações
    const [usdResponse, eurResponse] = await Promise.all([
      fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL'),
      fetch('https://economia.awesomeapi.com.br/json/last/EUR-BRL')
    ]);

    const usdData = await usdResponse.json();
    const eurData = await eurResponse.json();

    const usd = usdData.USDBRL;
    const eur = eurData.EURBRL;

    return [
      {
        label: "Dólar/EUA",
        type: "compra",
        value: `R$ ${parseFloat(usd.bid).toFixed(4)}`,
        change: parseFloat(usd.pctChange)
      },
      {
        label: "Dólar/EUA",
        type: "venda",
        value: `R$ ${parseFloat(usd.ask).toFixed(4)}`,
        change: parseFloat(usd.pctChange)
      },
      {
        label: "Euro",
        type: "compra",
        value: `R$ ${parseFloat(eur.bid).toFixed(4)}`,
        change: parseFloat(eur.pctChange)
      },
      {
        label: "Euro",
        type: "venda",
        value: `R$ ${parseFloat(eur.ask).toFixed(4)}`,
        change: parseFloat(eur.pctChange)
      }
    ];
  } catch (error) {
    console.error('Error fetching financial data:', error);
    throw error;
  }
};

export const useFinancialIndicators = () => {
  return useQuery({
    queryKey: ['financial-indicators'],
    queryFn: fetchFinancialIndicators,
    refetchInterval: 30000, // Atualiza a cada 30 segundos
    staleTime: 25000,
  });
};
