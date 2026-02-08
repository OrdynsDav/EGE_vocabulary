"use client";

import { useState, useEffect, useRef } from "react";

interface AutoNextCountdownProps {
  initialSeconds: number;
}

export function AutoNextCountdown({ initialSeconds }: AutoNextCountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [initialSeconds]);

  return (
    <span className="text-sm text-gray-400">
      Автоматическое обновление: {secondsLeft} с
    </span>
  );
}
