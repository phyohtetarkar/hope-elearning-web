"use client";

import { useTheme } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import { Suspense } from "react";
import { NavigationEvents } from "./navigation-events";

export default function NavigationProgress() {
  const { theme } = useTheme();

  return (
    <Suspense fallback={null}>
      <NavigationEvents />
      <NextNProgress
        color={theme === "dark" ? "#818cf8" : "#5863f8"}
        startPosition={0.3}
        height={2}
        options={{
          showSpinner: false,
        }}
      />
    </Suspense>
  );
}
