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
  Tooltip
} from "chart.js";
import NextNProgress from "nextjs-progressbar";
import NProgress from "nprogress";
import { Suspense, useEffect } from "react";
import { NavigationEvents } from "./navigation-events";
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

export default function Providers({ children }: { children: React.ReactNode }) {
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
    <>
      <Suspense fallback={null}>
        <NavigationEvents />
        <NextNProgress
          color="#5863f8"
          startPosition={0.3}
          height={2}
          options={{
            showSpinner: false,
          }}
        />
      </Suspense>
      <NextUIProvider className="h-full">{children}</NextUIProvider>
      <Toaster />
    </>
  );
}
