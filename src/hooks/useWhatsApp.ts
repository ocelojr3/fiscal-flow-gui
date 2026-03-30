import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { buildWhatsAppUrl, getDefaultNumber } from "@/lib/whatsapp";

/**
 * Hook que retorna o número do WhatsApp configurado no painel admin.
 * Faz fallback para a variável de ambiente VITE_WHATSAPP_NUMBER.
 */
export const useWhatsApp = () => {
  const [number, setNumber] = useState<string>(getDefaultNumber());

  useEffect(() => {
    supabase
      .from("site_settings" as any)
      .select("value")
      .eq("key", "whatsapp_number")
      .maybeSingle()
      .then(({ data }: { data: any }) => {
        if (data?.value) setNumber(data.value);
      });
  }, []);

  const open = (message?: string): void => {
    window.open(buildWhatsAppUrl(number, message), "_blank", "noopener,noreferrer");
  };

  return { number, open };
};
