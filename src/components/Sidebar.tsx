import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const categories = [
    { title: "Regulamentos Estaduais", badge: null },
    { title: "Regulamentos Municipais", badge: null },
    { title: "IPI", badge: null },
    { title: "Simples Nacional", badge: null },
    { title: "ICMS/ISS", badge: null },
    { title: "Regulamento do IR", badge: null },
    { title: "Manual da NBS", badge: "Novo" },
    { title: "Manual da Reforma Tributária", badge: "Novo" },
    { title: "Manual da DIRBI", badge: null },
    { title: "Manual da Atividade Rural", badge: null },
    { title: "Scont", badge: null },
    { title: "Trabalhista", badge: null },
    { title: "Previdenciário", badge: null },
    { title: "Comércio Exterior", badge: null },
    { title: "Direito Societário e Comercial", badge: null },
    { title: "Contratos", badge: null },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto">
      <div className="p-4">
        <div className="bg-accent text-accent-foreground font-semibold px-4 py-2 rounded mb-4">
          ACESSO RÁPIDO
        </div>
        
        <nav className="space-y-1">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-between text-left font-normal hover:bg-sidebar-accent"
            >
              <span className="flex items-center gap-2 text-sm">
                {category.title}
                {category.badge && (
                  <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded">
                    {category.badge}
                  </span>
                )}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
