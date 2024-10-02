"use client";

import { addCompletedLesson, removeCompletedLesson } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { ContentRenderer } from "@elearning/block-editor";
import { useAppSelector } from "@elearning/global-store";
import { selectUser } from "@elearning/global-store/slices";
import { Lesson, QuizResponse } from "@elearning/lib/models";
import { cn, formatRelativeTimestamp, pluralize } from "@elearning/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Checkbox,
  Separator,
  useToast,
} from "@elearning/ui";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ContentHeadings from "./content-headings";
import DrawerToggleButton from "./drawer-toggle-button";
import QuizListing from "./quiz-listing";

export default function ResumeCoursePage({
  lesson,
  responses,
}: {
  lesson: Lesson;
  responses?: QuizResponse[];
}) {
  const { toast } = useToast();
  const user = useAppSelector(selectUser);

  const [isSaving, setSaving] = useState(false);
  const [isCompleted, setCompleted] = useState(lesson.completed ?? false);

  const handleCompleted = async () => {
    try {
      setSaving(true);
      const courseId = lesson.chapter?.course?.id;
      const lessonId = lesson.id;
      const path = `/learn/${lesson.chapter?.course?.slug}/lessons/${lesson.slug}`;
      if (lesson.completed) {
        await removeCompletedLesson(courseId ?? 0, lessonId, path);
      } else {
        await addCompletedLesson(courseId ?? 0, lessonId, path);
      }
      setCompleted(!lesson.completed);
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

  const handleResumed = async () => {
    try {
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  const content = () => {
    const course = lesson.chapter?.course;
    if (
      course?.access === "premium" &&
      (user?.expiredAt ?? 0) < new Date().getTime()
    ) {
      return (
        <div className="rounded bg-primary dark:bg-muted px-5 py-8 flex flex-col items-center">
          <LockKeyhole className="text-primary-foreground dark:text-muted-foreground mb-2 size-7" />
          <p className="mb-4 text-primary-foreground dark:text-muted-foreground">
            You need to subscribe to view this content.
          </p>
          <Button className="bg-white hover:bg-gray-200 text-black" asChild>
            <Link href={`/pricing`}>Subscribe</Link>
          </Button>
        </div>
      );
    }

    return (
      <>
        <h2>{lesson.title}</h2>

        <Separator className="my-4" />

        {lesson.type === "quiz" ? (
          <QuizListing lesson={lesson} responses={responses ?? []} />
        ) : (
          <ContentRenderer html={lesson.html} />
        )}

        <Separator
          className={cn("mb-4 mt-8", {
            "hidden ": false,
            "mt-16": lesson.type !== "quiz",
          })}
        />

        <div
          className={cn("flex items-center space-x-2 pb-16", {
            "hidden ": false,
          })}
        >
          {isSaving ? (
            <LoaderCircle className="size-4 animate-spin text-primary" />
          ) : (
            <>
              <Checkbox
                id="completed-check"
                className="rounded"
                checked={isCompleted}
                onCheckedChange={(checked) => {
                  if (checked === "indeterminate") {
                    return;
                  }
                  handleCompleted();
                }}
              />
              <label
                htmlFor="completed-check"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {isCompleted ? "Unmark completed" : "Mark as completed"}
              </label>
            </>
          )}
          <div className="flex-grow"></div>
          <div
            className={cn("text-muted-foreground text-sm", {
              "hidden ": lesson.type === "quiz",
            })}
          >
            Last edited: {formatRelativeTimestamp(lesson.audit?.updatedAt)}
          </div>
        </div>
      </>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
        <div className="lg:col-span-9 relative">
          <div className="lg:hidden h-[3.5rem] fixed inset-x-0 bg-background border-b z-10 overflow-hidden">
            <Breadcrumb className="h-full px-4">
              <BreadcrumbList className="h-full flex-nowrap">
                <BreadcrumbItem className="lg:hidden">
                  <DrawerToggleButton />
                </BreadcrumbItem>
                <BreadcrumbSeparator className="lg:hidden" />
                <BreadcrumbItem className="truncate">
                  <span className="truncate">{lesson.chapter?.title}</span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="absolute inset-0 top-[3.5rem] lg:top-0 p-4 lg:px-6 lg:overflow-y-auto lg:scrollbar-hide lg:border-r">
            {content()}
          </div>
        </div>
        <div className="lg:col-span-3 relative hidden lg:block">
          <div className="absolute inset-0 lg:overflow-y-auto lg:scrollbar-hide p-4">
            <h6 className="text-sm mb-4">On this content</h6>
            {lesson.type === "quiz" ? (
              <span className="text-muted-foreground text-sm">
                {pluralize(lesson.quizzes?.length ?? 0, "Question")}
              </span>
            ) : (
              <div className="px-4">
                <ContentHeadings html={lesson.html} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
