"use client";

import { ThemeProvider } from "next-themes";
import NProgress from "nprogress";
import { Suspense, useEffect } from "react";
import { NavigationProgressBar } from "./ui/navigation-progress-bar";
import { Toaster } from "./ui/toaster";

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

export function UIProvider({ children }: { children: React.ReactNode }) {
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

    // eslint-disable-next-line no-undef
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <Suspense fallback={null}>
        <NavigationProgressBar />
      </Suspense>
      <Toaster />
      {children}
    </ThemeProvider>
  );
}
