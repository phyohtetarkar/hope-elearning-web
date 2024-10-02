"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return <></>;
}
