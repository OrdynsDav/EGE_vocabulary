"use client";

import { useEffect, useState, type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <div
      className={`transition-all duration-300 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {children}
    </div>
  );
}

