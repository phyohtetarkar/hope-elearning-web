"use client";

import { NovelEditor } from "@/components/editor";
import { TitleInput } from "@/components/forms";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateLesson } from "@/lib/actions";
import { Lesson } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { debounce } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cloud, CloudUpload, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Please enter lesson title",
  }),
  slug: z.string().optional(),
  lexical: z.string().optional(),
});

type LessonForm = z.infer<typeof schema>;

export default function LessonEditPage({ lesson }: { lesson: Lesson }) {
  const [isStale, setStale] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const { toast } = useToast();

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<LessonForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      lexical: lesson.lexical,
    },
  });

  const handleUpdate = async (values: LessonForm) => {
    if (isSaving) {
      setStale(true);
      return;
    }

    try {
      setSaving(true);
      setStale(false);
      const body = { ...values, updatedAt: lesson?.audit?.updatedAt };
      await updateLesson(lesson.course?.id ?? "", body);
    } catch (error) {
      setStale(true);
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const debouncedUpdate = debounce(handleUpdate, 2000);

  const saveStateView = () => {
    if (isSaving) {
      return (
        <LoaderCircle className="flex-shrink-0 animate-spin text-sliver" />
      );
    }

    if (isStale) {
      return <CloudUpload className="flex-shrink-0 text-sliver" />;
    }

    return <Cloud className="flex-shrink-0 text-success" />;
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 fixed inset-x-0 top-0 bg-white px-4 h-[65px] border-b z-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/admin/courses/${lesson.course?.id}`}>Course</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-nowrap">
                Edit Lesson
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex-1"></div>
        <Button>Save</Button>
      </div>
      <div className="grow fixed inset-0 overflow-y-auto mt-[65px]">
        <div className="container max-w-3xl mt-7 mb-10">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/admin/courses/${lesson.course?.id}`}>
                    {lesson.course?.title}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{lesson.chapter?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="mb-6">
            <Controller
              control={control}
              name="title"
              render={({ field }) => {
                return (
                  <TitleInput
                    placeholder="Lesson title"
                    className="text-gray-800"
                    spellCheck={false}
                    maxLength={2000}
                    value={field.value ?? ""}
                    onChange={(evt) => {
                      field.onChange(evt);
                      const value = evt.target.value;
                      if (lesson.status === "draft") {
                      }
                    }}
                  />
                );
              }}
            />
          </div>
          <NovelEditor
            content={lesson.lexical ? JSON.parse(lesson.lexical) : undefined}
            onChange={(json) => {
              setValue("lexical", JSON.stringify(json));
              if (lesson.status === "draft") {
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
