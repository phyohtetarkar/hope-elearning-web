"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { publishPost, unpublishPost } from "@/lib/actions";
import { Post } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function PostPublishButton({
  post,
  disabled,
  beforeUpdate,
}: {
  post: Post;
  disabled?: boolean;
  beforeUpdate?: () => void | Promise<void>;
}) {
  const [isOpenAlert, setOpenAlert] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleStatusUpdate = async () => {
    try {
      setSaving(true);
      if (post.status === "published") {
        await unpublishPost(post.id);
      } else {
        await beforeUpdate?.();
        await publishPost(post.id);
      }
      setOpenAlert(false);
      toast({
        title: "Success",
        description: `Post ${
          post.status === "draft" ? "published" : "unpublished"
        }`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AlertDialog open={isOpenAlert} onOpenChange={setOpenAlert}>
      <AlertDialogTrigger asChild>
        {post.status === "draft" ? (
          <Button disabled={disabled}>Publish</Button>
        ) : (
          <Button
            variant="ghost"
            disabled={disabled}
            className="p-0 text-destructive hover:text-destructive/50 hover:bg-transparent"
          >
            Unpublish
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to&nbsp;
            {post.status === "draft" ? "publish" : "unpublish"} post?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
          <Button disabled={isSaving} onClick={handleStatusUpdate}>
            {isSaving && <LoaderCircle className="mr-2 size-4 animate-spin" />}
            {post.status === "draft" ? "Publish" : "Unpublish"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
