"use client";

import { bookmarkCourse, removeBookmark } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { Button, useToast } from "@elearning/ui";
import { useAppSelector } from "@elearning/global-store";
import { selectUser } from "@elearning/global-store/slices";
import { Course } from "@elearning/lib/models";
import { cn } from "@elearning/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookmarkCourseButton({
  course,
  isBookmarked,
  className,
  revalidate,
}: {
  course: Course;
  isBookmarked: boolean;
  className?: string;
  revalidate?: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const user = useAppSelector(selectUser);
  const router = useRouter();

  const handleBookmark = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!user.emailVerified) {
      router.push("/verify-email");
    }
    try {
      setLoading(true);
      if (!isBookmarked) {
        await bookmarkCourse(course.id, revalidate);
      } else {
        await removeBookmark(course.id, revalidate);
      }
      toast({
        title: "Success",
        description: isBookmarked
          ? "Removed from bookmark"
          : "Added to bookmark",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isBookmarked ? (
        <Button
          variant="outline"
          onClick={handleBookmark}
          disabled={isLoading}
          className={cn("text-destructive hover:text-destructive", className)}
        >
          {isLoading && <LoaderCircle className="mr-2 size-4 animate-spin" />}
          Remove bookmark
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={handleBookmark}
          disabled={isLoading}
          className={className}
        >
          {isLoading && <LoaderCircle className="mr-2 size-4 animate-spin" />}
          Bookmark
        </Button>
      )}
    </>
  );
}
