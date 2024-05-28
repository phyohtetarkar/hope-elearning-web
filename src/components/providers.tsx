"use client";

import { NextUIProvider } from "@nextui-org/system";
import {
  ArcElement,
  CategoryScale,
  Chart,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  Tooltip,
} from "chart.js";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";
import NProgress from "nprogress";
import { useEffect } from "react";
import NavigationProgress from "./navigation-progress";
import { Toaster } from "./ui/toaster";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  PieController,
  DoughnutController,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined
];

function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl && !targetUrl.includes("#")) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a");
      anchorElements.forEach((anchor) => {
        const isExternalLink = !anchor.href.startsWith(location.origin);
        if (anchor.target !== "_blank" && !isExternalLink) {
          anchor.addEventListener("click", handleAnchorClick);
        }
      });
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  }, []);
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <NavigationProgress />
      <Toaster />
      <NextUIProvider className="h-full dark:bg-zinc-950">
        {children}
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default dynamic(() => Promise.resolve(Providers), {
  ssr: false,
});
