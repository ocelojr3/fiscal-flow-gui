import { useState, useEffect, useCallback } from "react";

const TOTAL_SECONDS = 10 * 60; // 10 minutes
const STORAGE_KEY = "promo_timer_end";
const RESET_KEY = "promo_timer_reset_used";

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const remaining = Math.max(0, Math.floor((Number(saved) - Date.now()) / 1000));
      return remaining;
    }
    const end = Date.now() + TOTAL_SECONDS * 1000;
    localStorage.setItem(STORAGE_KEY, String(end));
    return TOTAL_SECONDS;
  });

  const [expired, setExpired] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return Number(saved) <= Date.now();
    }
    return false;
  });

  useEffect(() => {
    if (seconds <= 0) {
      // Try one-time reset
      const resetUsed = localStorage.getItem(RESET_KEY);
      if (!resetUsed) {
        localStorage.setItem(RESET_KEY, "true");
        const newEnd = Date.now() + TOTAL_SECONDS * 1000;
        localStorage.setItem(STORAGE_KEY, String(newEnd));
        setSeconds(TOTAL_SECONDS);
        return;
      }
      setExpired(true);
      window.location.reload();
      return;
    }
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds > 0]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  if (expired) {
    return (
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl px-6 py-4 text-center">
          <p className="text-sm font-bold text-destructive">
            ⏰ Oferta Expirada
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Consulte novos valores via{" "}
            <a
              href="https://wa.me/pspcontabil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline font-semibold"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <p className="text-sm font-semibold text-destructive">
        Condição especial expira em:
      </p>
      <div className="flex items-center gap-1 font-mono">
        <span className="bg-foreground text-background text-2xl md:text-3xl font-black px-3 py-2 rounded-lg">
          {mins}
        </span>
        <span className="text-2xl font-black text-foreground animate-pulse">:</span>
        <span className="bg-foreground text-background text-2xl md:text-3xl font-black px-3 py-2 rounded-lg">
          {secs}
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
