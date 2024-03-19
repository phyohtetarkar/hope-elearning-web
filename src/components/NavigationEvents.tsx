"use client";

import { startTransition, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    startTransition(() => {
      NProgress.done();
    });
  }, [pathname, searchParams]);

  return null;
}
