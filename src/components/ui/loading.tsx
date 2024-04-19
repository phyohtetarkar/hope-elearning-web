import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="flex justify-center py-3">
      <Loader2 className="h-10 w-10 animate-spin text-sliver" />
    </div>
  );
}
