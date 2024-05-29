"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { ContentRenderer } from "@/components/editor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { addCompletedLesson, removeCompletedLesson } from "@/lib/actions";
import { Lesson } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { formatRelativeTimestamp } from "@/lib/utils";
import { JSONContent } from "@tiptap/core";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import DrawerToggleButton from "./drawer-toggle-button";

export default function ResumeCoursePage({ lesson }: { lesson: Lesson }) {
  const { toast } = useToast();
  const { user } = useContext(AuthenticationContext);

  const [isSaving, setSaving] = useState(false);
  const [isCompleted, setCompleted] = useState(lesson.completed ?? false);

  const headings = useMemo(() => {
    try {
      const json = lesson.lexical
        ? (JSON.parse(lesson.lexical) as JSONContent)
        : undefined;
      if (!json) {
        return [];
      }

      return (
        json.content
          ?.filter((v) => v.type === "heading")
          .flatMap((v) => v.content)
          .map((v) => v?.text ?? "")
          .filter((v) => !!v) ?? []
      );
    } catch (error) {}
    return [];
  }, [lesson]);

  const handleCompleted = async () => {
    try {
      setSaving(true);
      const courseId = lesson.courseId;
      const lessonId = lesson.id;
      const path = `/learn/${lesson.course?.slug}/lessons/${lesson.slug}`;
      if (lesson.completed) {
        await removeCompletedLesson(courseId, lessonId, path);
      } else {
        await addCompletedLesson(courseId, lessonId, path);
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
    } catch (error) {}
  };

  const content = () => {
    const course = lesson.course;
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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="lg:hidden">
              <DrawerToggleButton />
            </BreadcrumbItem>
            <BreadcrumbSeparator className="lg:hidden" />
            <BreadcrumbItem>{lesson.chapter?.title}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lesson.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Separator className="my-4" />

        <ContentRenderer lexical={lesson.lexical} />

        <Separator className="mt-16 mb-4" />

        <div className="flex items-center space-x-2 pb-16">
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
          <div className="text-muted-foreground text-sm">
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
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
      <div className="lg:col-span-9 relative">
        <div className="absolute inset-0 lg:overflow-y-auto lg:scrollbar-hide p-4 lg:px-6">
          {content()}
          {/* <div className="flex justify-between pb-10">
            <Button variant="default" asChild>
              <Link href={`/learn`}>Previous</Link>
            </Button>
            <Button asChild>
              <Link href={`/learn`}>Next</Link>
            </Button>
          </div> */}
        </div>
      </div>
      <div className="lg:col-span-3 relative border-l hidden lg:block">
        <div className="absolute inset-0 lg:overflow-y-auto lg:scrollbar-hide p-4">
          <h6 className="text-sm">On this content</h6>
          <Separator className="my-4" />
          <div className="px-4">
            <ol className="list-decimal">
              {headings.map((h, i) => {
                return (
                  <li
                    key={i}
                    className="text-muted-foreground hover:text-foreground text-sm mb-1"
                  >
                    <a href={`#${h.replaceAll(/\s+/g, "-").toLowerCase()}`}>
                      {h}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
