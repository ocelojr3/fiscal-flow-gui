import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PracticalTables = () => {
  const categories = [
    { title: "Trabalho e Previdência", link: "#" },
    { title: "Federal", link: "#" },
    { title: "Estadual", link: "#" },
  ];

  return (
    <Card className="bg-accent/10">
      <CardHeader>
        <CardTitle className="text-lg bg-accent text-accent-foreground px-4 py-2 -mx-4 -mt-2">
          Tabelas Práticas e Índices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="link"
            className="text-primary justify-start w-full p-0 h-auto font-normal"
          >
            {category.title}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default PracticalTables;
