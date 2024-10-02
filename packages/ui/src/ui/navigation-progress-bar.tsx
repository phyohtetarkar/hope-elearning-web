"use client";

import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";

export function NavigationProgressBar({ theme }: { theme?: string }) {
  const [color, setColor] = useState("#5863f8");

  useEffect(() => {
    setColor(theme === "dark" ? "#6366F1" : "#5863f8");
  }, [theme]);

  return (
    <NextNProgress
      color={color}
      startPosition={0.3}
      height={2}
      options={{
        showSpinner: false,
      }}
    />
  );
}
