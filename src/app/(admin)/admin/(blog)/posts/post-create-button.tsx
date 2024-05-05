"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createPost } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostCreateButton() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setLoading] = useState(false);
  return (
    <Button
      color="primary"
      disabled={isLoading}
      onClick={async () => {
        try {
          setLoading(true);
          await createPost();
        } catch (error) {
          toast({
            title: "Error",
            description: parseErrorResponse(error),
            variant: "destructive",
          });
        } finally {
          // setLoading(false);
        }
      }}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      New post
    </Button>
  );
}
