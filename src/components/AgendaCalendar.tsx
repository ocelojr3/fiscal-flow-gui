import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AgendaCalendar = () => {
  const tabs = ["FEDERAL", "ESTADUAL", "MUNICIPAL"];
  const weekDays = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];
  
  // Simplified calendar grid for October 2025
  const calendarDays = [
    [28, 29, 30, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, 1],
  ];

  const highlightedDays = [1, 6, 7, 14, 15, 20, 24, 31];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sua Agenda de Obrigações</CardTitle>
        <div className="flex gap-2 mt-4">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={tab === "FEDERAL" ? "default" : "outline"}
              size="sm"
              className={tab === "FEDERAL" ? "bg-accent hover:bg-accent/90" : ""}
            >
              {tab}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold">outubro de 2025</span>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium p-2">
                {day}
              </div>
            ))}
            {calendarDays.flat().map((day, index) => {
              const isHighlighted = highlightedDays.includes(day);
              const isNextMonth = day < 10 && index > 15;
              
              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded
                    ${isHighlighted && !isNextMonth ? 'bg-accent text-accent-foreground font-semibold' : ''}
                    ${isNextMonth || day > 31 ? 'text-muted-foreground' : ''}
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="text-xs text-center text-muted-foreground mt-4">
            <Button variant="link" className="text-accent">Mês</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendaCalendar;
