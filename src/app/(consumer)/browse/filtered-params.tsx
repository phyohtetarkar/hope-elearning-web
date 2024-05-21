"use client";

import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function FilteredParams({ className }: { className?: string }) {
  const sp = useSearchParams();
  const router = useRouter();

  const params = useMemo(() => {
    return Array.from(sp.entries());
  }, [sp]);

  if (params.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {params.map((en, i) => {
        return (
          <div key={i} className="p-3 rounded-md bg-muted flex items-center">
            {en[1]}
            <div
              role="button"
              className="ms-2 text-muted-foreground hover:text-foreground"
              onClick={() => {
                const params = new URLSearchParams(sp.toString());
                params.delete(en[0]);
                router.push(`?${params.toString()}`);
              }}
            >
              <XIcon className="size-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
