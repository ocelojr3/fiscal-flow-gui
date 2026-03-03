import { useState, useEffect } from "react";

const TOTAL_SECONDS = 7 * 60; // 7 minutes

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(() => {
    const saved = sessionStorage.getItem("countdown_end");
    if (saved) {
      const remaining = Math.max(0, Math.floor((Number(saved) - Date.now()) / 1000));
      return remaining;
    }
    const end = Date.now() + TOTAL_SECONDS * 1000;
    sessionStorage.setItem("countdown_end", String(end));
    return TOTAL_SECONDS;
  });

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds > 0]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <p className="text-sm font-semibold text-destructive">
        O desconto de R$ 340,00 expira em:
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
