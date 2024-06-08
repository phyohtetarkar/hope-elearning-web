"use client";

import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { updateLesson } from "@/lib/actions";
import { Audit, Lesson } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { setStringToSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  slug: z.string().min(1, {
    message: "Please enter lesson slug",
  }),
  trial: z.boolean().optional(),
});

type LessonForm = z.infer<typeof schema>;

export default function LessonSettingDialog({
  lesson,
  isOpen,
  afterUpdate,
  onOpenChange,
}: {
  lesson: Lesson;
  isOpen: boolean;
  afterUpdate: (lesson: Lesson) => void;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();

  const auditRef = useRef<Audit>();

  const {
    control,
    formState: { isSubmitting },
    setValue,
    handleSubmit,
    reset,
  } = useForm<LessonForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: lesson.id,
      slug: lesson.slug,
      trial: lesson.trial,
    },
    values: {
      id: lesson.id,
      slug: lesson.slug,
      trial: lesson.trial,
    },
  });

  useEffect(() => {
    auditRef.current = lesson.audit;
  }, [lesson]);

  const handleUpdate = async (values: LessonForm) => {
    try {
      const audit = auditRef.current;

      const body = {
        ...values,
        courseId: lesson.chapter?.course?.id,
        slug: !values.slug?.trim() ? lesson.slug : values.slug,
        updatedAt: audit?.updatedAt,
      };

      setValue("slug", body["slug"], { shouldValidate: true });

      const result = await updateLesson(lesson.chapter?.course?.id ?? 0, body);

      afterUpdate(result);

      toast({
        title: "Success",
        description: "Lesson updated",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          reset();
        }
      }}
    >
      <DialogContent onInteractOutside={(evt) => evt.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Lesson settings</DialogTitle>
        </DialogHeader>
        <div className="gird grid-cols-1">
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
                    onCheckedChange={(v) => {
                      setValue("trial", v);
                    }}
                  />
                  <label htmlFor="trial" className="font-medium">
                    Trial
                  </label>
                </div>
              );
            }}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="default" disabled={isSubmitting}>
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              handleSubmit(handleUpdate)();
            }}
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <LoaderCircle className="mr-2 size-4 animate-spin" />
            )}
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
