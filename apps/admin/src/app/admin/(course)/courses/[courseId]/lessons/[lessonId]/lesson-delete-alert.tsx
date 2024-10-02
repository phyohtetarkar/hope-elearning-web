"use client";

import { deleteLesson } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    Button,
    useToast,
} from "@elearning/ui";
import { Lesson } from "@elearning/lib/models";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function LessonDeleteAlert({
  lesson,
  isOpen,
  onOpenChange,
}: {
  lesson: Lesson;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isDeleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteLesson(lesson.chapter?.course?.id ?? 0, lesson.id, true);
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to delete lesson?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting && (
              <LoaderCircle className="mr-2 size-4 animate-spin" />
            )}
            Proceed
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
