"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { bookmarkCourse, removeBookmark } from "@/lib/actions";
import { Course } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { LoaderCircle } from "lucide-react";
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

  const handleBookmark = async () => {
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
          className={className}
        >
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Remove bookmark
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={handleBookmark}
          disabled={isLoading}
          className={className}
        >
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Bookmark
        </Button>
      )}
    </>
  );
}
