"use client";

import { useState, useEffect, useRef } from "react";

export function useCountdownTimer(
  totalSeconds: number,
  isRunning: boolean,
  onExpire: () => void
) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const hasExpired = useRef(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!hasExpired.current) {
            hasExpired.current = true;
            onExpire();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  return remaining;
}