"use client";

import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { startTransition, useEffect } from "react";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    startTransition(() => {
      NProgress.done();
    });
    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]);

  return null;
}
