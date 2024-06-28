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
import { publishCourse, unpublishCourse } from "@/lib/actions";
import { Course } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function CoursePublishButton({
  course,
  disabled,
}: {
  course: Course;
  disabled?: boolean;
}) {
  const [isOpenAlert, setOpenAlert] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleStatusUpdate = async () => {
    try {
      setSaving(true);
      if (course.status === "published") {
        await unpublishCourse(course.id);
      } else {
        await publishCourse(course.id);
      }
      setOpenAlert(false);
      toast({
        title: "Success",
        description: `Course ${
          course.status === "draft" ? "published" : "unpublished"
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
        <Button disabled={disabled} className="ms-2">
          {course.status === "draft" ? "Publish" : "Unpublish"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to&nbsp;
            {course.status === "draft" ? "publish" : "unpublish"} course?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
          <Button disabled={isSaving} onClick={handleStatusUpdate}>
            {isSaving && <LoaderCircle className="mr-2 size-4 animate-spin" />}
            {course.status === "draft" ? "Publish" : "Unpublish"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
