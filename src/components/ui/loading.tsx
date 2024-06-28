import { LoaderCircle } from "lucide-react";

export function Loading() {
  return (
    <div className="flex justify-center py-3">
      <LoaderCircle className="h-10 w-10 animate-spin text-muted-foreground" />
    </div>
  );
}
