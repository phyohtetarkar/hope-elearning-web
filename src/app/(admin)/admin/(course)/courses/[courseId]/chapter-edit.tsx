"use client";

import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { createChapter, updateChapter } from "@/lib/actions";
import { Chapter, Course } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { setStringToSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number().optional(),
  courseId: z.number(),
  title: z.string().min(1, {
    message: "Please enter chapter title",
  }),
  slug: z.string().min(1, {
    message: "Please enter chapter slug",
  }),
});

type ChapterForm = z.infer<typeof schema>;

function ChapterEdit({
  course,
  data,
  index,
  close,
}: {
  course: Course;
  data?: Chapter;
  index: number;
  close?: () => void;
}) {
  const { toast } = useToast();
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<ChapterForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.id,
      courseId: course.id,
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
              sortOrder: index,
              updatedAt: data?.audit?.updatedAt,
            };
            if (!values.id) {
              await createChapter(course.id, body);
            } else {
              await updateChapter(course.id, body);
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
                wrapperClass="mb-4"
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

export default ChapterEdit;
