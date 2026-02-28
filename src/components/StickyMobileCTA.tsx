import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileText } from "lucide-react";
import DocumentUploadPanel from "./DocumentUploadPanel";

const StickyMobileCTA = () => {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      {/* Sticky bottom bar - mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm border-t border-border p-3 flex gap-2">
        <Button
          onClick={() => setShowUpload(true)}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-sm font-semibold"
        >
          <FileText className="h-4 w-4 mr-2" />
          Enviar Documentos
        </Button>
        <Button
          variant="outline"
          className="h-12 px-4 border-primary/20"
          onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
        >
          <MessageCircle className="h-5 w-5 text-primary" />
        </Button>
      </div>

      {/* Bottom spacer so content isn't hidden behind sticky bar */}
      <div className="h-20 md:hidden" />

      <DocumentUploadPanel open={showUpload} onOpenChange={setShowUpload} />
    </>
  );
};

export default StickyMobileCTA;
