"use client";

import { Alert } from "@/components/ui/alert";
import { usePathname } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const pathname = usePathname();

  if (pathname.match(/^\/admin\/posts\/.+/)) {
    return (
      <div className="p-4">
        <Alert variant="destructive">{error.message}</Alert>
      </div>
    );
  }
  return <Alert variant="destructive">{error.message}</Alert>;
}
