import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

// Obrigações fiscais federais reais 2026
const fiscalObligations: Record<string, { label: string; type: string }[]> = {
  "2026-03-07": [{ label: "FGTS - Competência 02/2026", type: "federal" }],
  "2026-03-13": [{ label: "EFD-Contribuições (PIS/COFINS)", type: "federal" }],
  "2026-03-15": [{ label: "EFD-ICMS/IPI", type: "estadual" }],
  "2026-03-20": [
    { label: "IRRF - Fato Gerador 02/2026", type: "federal" },
    { label: "INSS - Competência 02/2026", type: "federal" },
    { label: "DARF PIS/COFINS", type: "federal" },
    { label: "DCTF Web", type: "federal" },
  ],
  "2026-03-25": [{ label: "COFINS - Competência 02/2026", type: "federal" }],
  "2026-03-31": [
    { label: "IRPF 2026 - Início das Declarações", type: "federal" },
    { label: "DEFIS - Simples Nacional", type: "federal" },
  ],
  "2026-04-07": [{ label: "FGTS - Competência 03/2026", type: "federal" }],
  "2026-04-20": [
    { label: "IRRF - Fato Gerador 03/2026", type: "federal" },
    { label: "INSS - Competência 03/2026", type: "federal" },
  ],
  "2026-04-30": [{ label: "IRPF 2026 - Prazo Final", type: "federal" }],
  "2026-05-07": [{ label: "FGTS - Competência 04/2026", type: "federal" }],
  "2026-05-15": [{ label: "EFD-ICMS/IPI", type: "estadual" }],
  "2026-05-20": [
    { label: "IRRF - Fato Gerador 04/2026", type: "federal" },
    { label: "INSS - Competência 04/2026", type: "federal" },
  ],
  "2026-05-29": [{ label: "ECF - Escrituração Contábil Fiscal", type: "federal" }],
};

const AgendaCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // Março 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("FEDERAL");
  
  const tabs = ["FEDERAL", "ESTADUAL", "MUNICIPAL"];
  const weekDays = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: { day: number; isCurrentMonth: boolean; dateKey: string }[] = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const m = month === 0 ? 12 : month;
    const y = month === 0 ? year - 1 : year;
    calendarDays.push({ day: d, isCurrentMonth: false, dateKey: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({ day: d, isCurrentMonth: true, dateKey: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
  }
  // Next month
  const remaining = 42 - calendarDays.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month + 2 > 12 ? 1 : month + 2;
    const y = month + 2 > 12 ? year + 1 : year;
    calendarDays.push({ day: d, isCurrentMonth: false, dateKey: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
  }

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getObligationsForDate = (dateKey: string) => {
    const all = fiscalObligations[dateKey] || [];
    return all.filter(o => o.type === activeFilter.toLowerCase());
  };

  const hasObligations = (dateKey: string) => {
    return getObligationsForDate(dateKey).length > 0;
  };

  const selectedObligations = selectedDate ? getObligationsForDate(selectedDate) : [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-accent" />
          <CardTitle className="text-lg">Agenda de Obrigações Fiscais</CardTitle>
        </div>
        <div className="flex gap-2 mt-4">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={tab === activeFilter ? "default" : "outline"}
              size="sm"
              onClick={() => { setActiveFilter(tab); setSelectedDate(null); }}
              className={tab === activeFilter ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}
            >
              {tab}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold capitalize">{monthName}</span>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium p-2 text-muted-foreground">
                {day}
              </div>
            ))}
            {calendarDays.map((item, index) => {
              const hasObl = hasObligations(item.dateKey);
              const isSelected = selectedDate === item.dateKey;

              return (
                <button
                  key={index}
                  onClick={() => hasObl ? setSelectedDate(item.dateKey) : null}
                  className={`
                    aspect-square flex flex-col items-center justify-center text-sm rounded relative transition-colors
                    ${!item.isCurrentMonth ? 'text-muted-foreground/40' : ''}
                    ${hasObl ? 'cursor-pointer font-semibold' : 'cursor-default'}
                    ${hasObl && !isSelected ? 'bg-accent/10 text-accent hover:bg-accent/20' : ''}
                    ${isSelected ? 'bg-accent text-accent-foreground' : ''}
                  `}
                >
                  {item.day}
                  {hasObl && (
                    <span className={`absolute bottom-0.5 h-1 w-1 rounded-full ${isSelected ? 'bg-accent-foreground' : 'bg-accent'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected date obligations */}
          {selectedDate && selectedObligations.length > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-muted/50 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
                {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
              </h4>
              {selectedObligations.map((obl, i) => (
                <div key={i} className="text-sm flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  {obl.label}
                </div>
              ))}
            </div>
          )}

          <div className="text-xs text-center text-muted-foreground pt-2">
            Clique nas datas destacadas para ver obrigações
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendaCalendar;
