"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="container py-5">
      <h2 className="mb-3">Something went wrong!</h2>
      <Button
        onClick={() => {
          window.location.reload();
        }}
      >
        Try again
      </Button>
    </div>
  );
}
