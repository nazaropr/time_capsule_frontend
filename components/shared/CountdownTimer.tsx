"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface IProps {
  unlockAt: string;
}

export default function CountDownTimer({ unlockAt }: IProps) {
  const router = useRouter();
  const targetDate = new Date(unlockAt).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const updateTimer = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        if (interval) clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        router.refresh();
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      setTimeLeft({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };

    updateTimer();
    interval = setInterval(updateTimer, 1000);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [targetDate, router]);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="glass relative overflow-hidden rounded-2xl w-24 h-24 flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 bg-indigo-500/5" />
          <span className="relative text-3xl font-mono font-bold text-indigo-400">
            {value.toString().padStart(2, "0")}
          </span>
          <span className="relative text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-medium">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
