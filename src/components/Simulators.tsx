import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Simulators = () => {
  const simulators = [
    {
      category: "Área Trabalho e Previdência",
      title: "CALCULADORA DE HORAS MENSAIS",
      badge: "NOVO",
    },
    {
      category: "Área Trabalho e Previdência",
      title: "RESCISÃO/ SIMULADOR",
      badge: "NOVO",
    },
    {
      category: "Área Trabalho e Previdência",
      title: "CALCULADORA DE IRRF E INSS",
      badge: "NOVO",
    },
    {
      category: "Área Trabalho e Previdência",
      title: "CALCULADORA SALÁRIO FAMÍLIA",
      badge: "NOVO",
    },
    {
      category: "Área Federal",
      title: "CALCULADORA DO FATOR 'R'",
      badge: "NOVO",
    },
    {
      category: "Área Federal",
      title: "CALCULADORA DO SIMPLES NACIONAL",
      badge: "NOVO",
    },
    {
      category: "Área Municipal",
      title: "CALCULADORA DE DÉCIMO TERCEIRO PROPORCIONAL",
      badge: "NOVO",
    },
    {
      category: "Área Federal",
      title: "PLANEJAMENTO TRIBUTÁRIO – SN/LP/LR",
      badge: "NOVA ATUALIZAÇÃO",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Simuladores - Últimos Lançamentos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {simulators.map((simulator, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-2">
              <div className="text-xs text-muted-foreground">{simulator.category}</div>
              <CardTitle className="text-sm font-semibold leading-tight">
                {simulator.title}
                {simulator.badge && (
                  <span className="ml-2 inline-block bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded">
                    {simulator.badge}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="text-primary p-0 h-auto font-semibold">
                Simule aqui →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          VER TODAS
        </Button>
      </div>
    </div>
  );
};

export default Simulators;
