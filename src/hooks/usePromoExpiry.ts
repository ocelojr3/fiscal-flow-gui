import { useState, useEffect } from "react";

const STORAGE_KEY = "promo_timer_end";
const RESET_KEY = "promo_timer_reset_used";

export const usePromoExpiry = () => {
  const [isOfferValid, setIsOfferValid] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const resetUsed = localStorage.getItem(RESET_KEY);
    if (saved && resetUsed) {
      return Number(saved) > Date.now();
    }
    return true;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      const resetUsed = localStorage.getItem(RESET_KEY);
      if (saved && resetUsed && Number(saved) <= Date.now()) {
        setIsOfferValid(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return isOfferValid;
};
