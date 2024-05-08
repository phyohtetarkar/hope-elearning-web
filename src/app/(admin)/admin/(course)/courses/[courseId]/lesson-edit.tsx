"use client";

import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { createLesson, updateLesson } from "@/lib/actions";
import { Chapter, Course, Lesson } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { setStringToSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.string().optional(),
  courseId: z.string(),
  chapterId: z.string(),
  title: z.string().min(1, {
    message: "Please enter lesson title",
  }),
  slug: z.string().min(1, {
    message: "Please enter lesson slug",
  }),
  trial: z.boolean().optional(),
});

type LessonForm = z.infer<typeof schema>;

function LessonEdit({
  course,
  chapter,
  data,
  close,
}: {
  course: Course;
  chapter: Chapter;
  data?: Lesson;
  close?: () => void;
}) {

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
      id: data?.id,
      courseId: course.id,
      chapterId: chapter.id,
      title: data?.title,
      slug: data?.slug,
    },
  });

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(async (values) => {
          try {
            const body = {
              ...values,
              sortOrder: chapter.lessons?.length ?? 0,
              updatedAt: data?.audit?.updatedAt,
            };
            if (!values.id) {
              await createLesson(course.id, body);
            } else {
              await updateLesson(course.id, body);
            }
            close?.();
          } catch (error) {
            toast({
              title: "Error",
              description: parseErrorResponse(error),
              variant: "destructive",
            });
          }
        })();
      }}
    >
      <div className="gird grid-cols-1">
        <Input
          label="Title"
          type="text"
          wrapperClass="mb-4"
          placeholder="Enter title"
          {...register("title", {
            onChange: (evt) => {
              const slug = setStringToSlug(evt.target.value) ?? "";
              setValue("slug", slug, {
                shouldValidate: !!slug,
              });
            },
          })}
          error={errors.title?.message}
        />

        <Controller
          control={control}
          name="slug"
          render={({ field, fieldState: { error } }) => {
            return (
              <Input
                label="Slug"
                id="slug"
                type="text"
                wrapperClass="mb-6"
                placeholder="Enter slug"
                value={field.value ?? ""}
                onChange={(evt) => {
                  const slug = setStringToSlug(evt.target.value) ?? "";
                  setValue("slug", slug, {
                    shouldValidate: true,
                  });
                }}
                error={error?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="trial"
          render={({ field }) => {
            return (
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  id="trial"
                  checked={field.value ?? false}
                  onCheckedChange={(v) => setValue("trial", v)}
                />
                <label htmlFor="trial" className="font-medium">Trial</label>
              </div>
            );
          }}
        />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="button"
            variant="default"
            className="mt-2"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="mt-2" disabled={isSubmitting}>
          {isSubmitting && (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save
        </Button>
      </DialogFooter>
    </form>
  );
}

export default LessonEdit;
