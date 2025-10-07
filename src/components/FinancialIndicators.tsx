import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinancialIndicators = () => {
  const indicators = [
    { label: "Dólar/EUA", type: "compra", value: "R$ 5,3220" },
    { label: "Dólar/EUA", type: "venda", value: "R$ 5,3226" },
    { label: "Euro", type: "compra", value: "R$ 6,2305" },
    { label: "Euro", type: "venda", value: "R$ 6,2317" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Indicadores Econômicos e financeiros</CardTitle>
        <div className="text-sm text-muted-foreground">Cotação de Moedas em 06/10/25</div>
      </CardHeader>
      <CardContent className="space-y-3">
        {indicators.map((indicator, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
            <div className="text-sm">
              <span className="font-medium">{indicator.label}</span>
              <span className="text-muted-foreground ml-2">- {indicator.type}</span>
            </div>
            <span className="font-semibold">{indicator.value}</span>
          </div>
        ))}
        <div className="text-xs text-muted-foreground pt-2">
          Fonte: Banco Central do Brasil
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialIndicators;
