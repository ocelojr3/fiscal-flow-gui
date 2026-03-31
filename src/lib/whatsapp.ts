/**
 * Utilitário centralizado de WhatsApp.
 * Número padrão lido do ambiente — nunca hardcode nos componentes.
 */
const DEFAULT_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "5511994595404";

export const buildWhatsAppUrl = (number: string, message?: string): string => {
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (message?: string, number?: string): void => {
  window.open(buildWhatsAppUrl(number ?? DEFAULT_NUMBER, message), "_blank", "noopener,noreferrer");
};

export const getDefaultNumber = (): string => DEFAULT_NUMBER;
