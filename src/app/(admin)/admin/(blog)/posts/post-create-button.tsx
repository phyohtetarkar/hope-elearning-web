"use client";

import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import NProgress from "nprogress";

export default function PostCreateButton() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  return (
    <Button
      color="primary"
      disabled={isLoading}
      onClick={async () => {
        try {
          setLoading(true);
          const postId = await createPost();
          NProgress.start();
          router.push(`/admin/posts/${postId}`);
        } catch (error) {
          toast.error(parseErrorResponse(error));
        } finally {
          setLoading(false);
        }
      }}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      New post
    </Button>
  );
}
