"use client";

import { NextUIProvider } from "@nextui-org/react";
import NextNProgress from "nextjs-progressbar";
import NProgress from "nprogress";
import { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { NavigationEvents } from "./navigation-events";

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined
];

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a");
      anchorElements.forEach((anchor) => {
        if (anchor.target !== "_blank") {
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
      <Suspense>
        <NavigationEvents />
        <NextNProgress
          color="#5863f8"
          startPosition={0.3}
          height={2}
          options={{
            showSpinner: false,
          }}
        />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          theme="colored"
        />
      </Suspense>
      <NextUIProvider className="h-full">{children}</NextUIProvider>
    </>
  );
}
