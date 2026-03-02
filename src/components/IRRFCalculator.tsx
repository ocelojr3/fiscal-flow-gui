import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, AlertCircle, FileText, Users } from "lucide-react";

const IRRF_TABLE_2026 = [
  { faixa: 1, de: 0, ate: 2259.20, aliquota: 0, deducao: 0 },
  { faixa: 2, de: 2259.21, ate: 2826.65, aliquota: 7.5, deducao: 169.44 },
  { faixa: 3, de: 2826.66, ate: 3751.05, aliquota: 15, deducao: 381.44 },
  { faixa: 4, de: 3751.06, ate: 4664.68, aliquota: 22.5, deducao: 662.77 },
  { faixa: 5, de: 4664.69, ate: Infinity, aliquota: 27.5, deducao: 896.00 },
];

const DEDUCAO_DEPENDENTE = 189.59;
const DEDUCAO_INSS_TETO = 908.85;

function calcularINSS(salario: number): number {
  const faixas = [
    { ate: 1518.00, aliq: 7.5 },
    { ate: 2793.88, aliq: 9 },
    { ate: 4190.83, aliq: 12 },
    { ate: 8157.41, aliq: 14 },
  ];
  let inss = 0;
  let anterior = 0;
  for (const f of faixas) {
    if (salario <= anterior) break;
    const base = Math.min(salario, f.ate) - anterior;
    inss += base * (f.aliq / 100);
    anterior = f.ate;
  }
  return Math.min(inss, DEDUCAO_INSS_TETO);
}

function calcularIRRF(salarioBruto: number, dependentes: number) {
  const inss = calcularINSS(salarioBruto);
  const baseCalculo = salarioBruto - inss - (dependentes * DEDUCAO_DEPENDENTE);

  if (baseCalculo <= 0) return { irrf: 0, aliquotaEfetiva: 0, faixa: 1, baseCalculo: 0, inss };

  const faixa = IRRF_TABLE_2026.find(f => baseCalculo >= f.de && baseCalculo <= f.ate)!;
  const irrf = Math.max(0, (baseCalculo * faixa.aliquota / 100) - faixa.deducao);
  const aliquotaEfetiva = salarioBruto > 0 ? (irrf / salarioBruto) * 100 : 0;

  return { irrf, aliquotaEfetiva, faixa: faixa.faixa, baseCalculo, inss };
}

const IRRFCalculator = () => {
  const [salario, setSalario] = useState("");
  const [dependentes, setDependentes] = useState("0");
  const [resultado, setResultado] = useState<ReturnType<typeof calcularIRRF> | null>(null);

  const handleCalcular = () => {
    const valor = parseFloat(salario.replace(/[^\d,]/g, "").replace(",", "."));
    const deps = parseInt(dependentes) || 0;
    if (!isNaN(valor) && valor > 0) {
      setResultado(calcularIRRF(valor, deps));
    }
  };

  const formatCurrency = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <section className="py-12">
      {/* Hero IRPF */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <TrendingUp className="h-4 w-4" />
          PRIORIDADE 2026
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Calculadora IRRF 2026 — Regime CLT
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Verifique se seus colaboradores têm imposto retido na fonte. <strong>Médicos e profissionais de saúde</strong> podem deduzir despesas via Livro Caixa para maximizar a restituição.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Calculadora */}
        <Card className="shadow-sm border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5 text-accent" />
              Simulador de Retenção
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Salário Bruto Mensal (CLT)
              </label>
              <Input
                placeholder="Ex: 5.000,00"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                className="text-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Número de Dependentes
              </label>
              <Input
                type="number"
                min="0"
                placeholder="0"
                value={dependentes}
                onChange={(e) => setDependentes(e.target.value)}
              />
            </div>
            <Button onClick={handleCalcular} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Calcular IRRF
            </Button>

            {resultado && (
              <div className="mt-4 space-y-3 p-4 bg-secondary rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">INSS descontado</span>
                  <span className="font-semibold">{formatCurrency(resultado.inss)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base de cálculo</span>
                  <span className="font-semibold">{formatCurrency(resultado.baseCalculo)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-medium">IRRF Retido</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(resultado.irrf)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Alíquota efetiva</span>
                  <span className="font-semibold">{resultado.aliquotaEfetiva.toFixed(2)}%</span>
                </div>
                {resultado.irrf > 0 && (
                  <div className="flex items-start gap-2 bg-accent/10 p-3 rounded text-sm">
                    <AlertCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>
                      Este colaborador tem <strong>imposto retido na fonte</strong> e provavelmente precisa declarar IRPF 2026.
                    </span>
                  </div>
                )}
                {resultado.irrf > 0 && (
                  <div className="flex items-start gap-2 bg-primary/10 p-3 rounded text-sm border border-primary/20">
                    <Users className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>
                      <strong>Médicos e profissionais de saúde:</strong> podem deduzir despesas profissionais via Livro Caixa e maximizar a restituição. Nossos especialistas garantem o máximo retorno.
                    </span>
                  </div>
                )}
                {resultado.irrf === 0 && (
                  <div className="flex items-start gap-2 bg-secondary p-3 rounded text-sm">
                    <AlertCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>Isento de IRRF. Sem retenção na fonte.</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabela IRRF */}
        <Card className="shadow-sm border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-accent" />
              Tabela Progressiva IRRF 2026
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-semibold text-muted-foreground">Base de Cálculo</th>
                    <th className="text-center py-3 font-semibold text-muted-foreground">Alíquota</th>
                    <th className="text-right py-3 font-semibold text-muted-foreground">Dedução</th>
                  </tr>
                </thead>
                <tbody>
                  {IRRF_TABLE_2026.map((f) => (
                    <tr
                      key={f.faixa}
                      className={`border-b border-border/50 ${
                        resultado?.faixa === f.faixa ? "bg-accent/10 font-medium" : ""
                      }`}
                    >
                      <td className="py-3">
                        {f.ate === Infinity
                          ? `Acima de ${formatCurrency(f.de)}`
                          : `${formatCurrency(f.de)} – ${formatCurrency(f.ate)}`}
                      </td>
                      <td className="text-center py-3">
                        {f.aliquota === 0 ? (
                          <span className="text-accent font-semibold">Isento</span>
                        ) : (
                          `${f.aliquota}%`
                        )}
                      </td>
                      <td className="text-right py-3">{f.deducao > 0 ? formatCurrency(f.deducao) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-secondary rounded-lg space-y-2 text-sm text-muted-foreground">
              <p><strong>Dedução por dependente:</strong> {formatCurrency(DEDUCAO_DEPENDENTE)}</p>
              <p><strong>Teto INSS 2026:</strong> {formatCurrency(DEDUCAO_INSS_TETO)}</p>
              <p className="text-xs mt-2 opacity-70">Valores baseados na tabela vigente. Consulte a Receita Federal para atualizações.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Prospecção */}
      <div className="mt-10 max-w-3xl mx-auto text-center">
        <Card className="bg-primary text-primary-foreground border-none">
          <CardContent className="py-8">
            <Users className="h-8 w-8 mx-auto mb-3 opacity-90" />
            <h3 className="text-xl font-bold mb-2">Prospecção Ativa IRPF 2026</h3>
            <p className="opacity-90 text-sm mb-4">
              Identifique colaboradores com retenção na fonte e ofereça planejamento tributário personalizado. A PSP Contabilidade cuida de cada declaração.
            </p>
            <Button variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Falar com Especialista
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default IRRFCalculator;
