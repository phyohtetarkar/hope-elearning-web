"use client";

import { ContentRenderer } from "@/components/editor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Lesson } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { formatRelativeTimestamp } from "@/lib/utils";
import { JSONContent } from "@tiptap/core";
import { LoaderCircle } from "lucide-react";
import { useMemo, useState } from "react";
import DrawerToggleButton from "./drawer-toggle-button";

export default function ResumeCoursePage({ lesson }: { lesson: Lesson }) {
  const { toast } = useToast();

  const [isSaving, setSaving] = useState(false);

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
      if (lesson.completed) {
      } else {
      }
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 h-full">
      <div className="lg:col-span-8 relative">
        <div className="absolute inset-0 lg:overflow-y-auto lg:scrollbar-hide p-4 lg:px-6">
          <Breadcrumb className="mb-5">
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
                  checked={lesson.completed ?? false}
                  onCheckedChange={async (checked) => {
                    if (checked === "indeterminate") {
                      return;
                    }
                    await handleCompleted();
                  }}
                />
                <label
                  htmlFor="completed-check"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {lesson.completed ? "Unmark completed" : "Mark as completed"}
                </label>
              </>
            )}
            <div className="flex-grow"></div>
            <div className="text-sliver text-sm">
              Last edited: {formatRelativeTimestamp(lesson.audit?.updatedAt)}
            </div>
          </div>
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
      <div className="lg:col-span-2 relative border-l hidden lg:block">
        <div className="absolute inset-0 lg:overflow-y-auto lg:scrollbar-hide p-4">
          <h6 className="text-sm">On this lesson</h6>
          <Separator className="my-3" />
          <div className="px-4">
            <ol className="list-decimal">
              {headings.map((h, i) => {
                return (
                  <li key={i} className="text-sliver hover:text-black text-sm mb-1">
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
