import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinancialIndicators } from "@/hooks/useFinancialIndicators";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

const FinancialIndicators = () => {
  const { data: indicators, isLoading, isError, dataUpdatedAt } = useFinancialIndicators();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Indicadores Econômicos e financeiros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Erro ao carregar cotações. Tente novamente.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Indicadores Econômicos e financeiros</CardTitle>
            <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <RefreshCw className="h-3 w-3 animate-spin" />
              {dataUpdatedAt ? `Atualizado às ${formatTime(dataUpdatedAt)}` : 'Carregando...'}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </>
        ) : (
          <>
            {indicators?.map((indicator, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <div className="text-sm">
                  <span className="font-medium">{indicator.label}</span>
                  <span className="text-muted-foreground ml-2">- {indicator.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{indicator.value}</span>
                  {indicator.change !== undefined && (
                    <span className={`text-xs flex items-center ${
                      indicator.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {indicator.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(indicator.change).toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
        <div className="text-xs text-muted-foreground pt-2">
          Fonte: AwesomeAPI / Banco Central do Brasil
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialIndicators;
