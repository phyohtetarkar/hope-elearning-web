"use client";

import { createCategory, updateCategory } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { Input } from "@elearning/ui/forms";
import { Button, DialogClose, DialogFooter, useToast } from "@elearning/ui";
import { Category } from "@elearning/lib/models";
import { setStringToSlug } from "@elearning/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Please enter category name",
  }),
  slug: z.string().min(1, {
    message: "Please enter category slug",
  }),
});

type CategoryForm = z.infer<typeof schema>;

function CategoryEdit({
  data,
  close,
}: {
  data?: Category;
  close?: () => void;
}) {
  const { toast } = useToast();

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<CategoryForm>({
    resolver: zodResolver(schema),
    defaultValues: data ?? {
      name: "",
      slug: "",
    },
  });

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(async (values) => {
          try {
            if (!values.id) {
              await createCategory(values);
            } else {
              await updateCategory(values);
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
          label="Category"
          id="category"
          type="text"
          wrapperClass="mb-4"
          placeholder="Enter category"
          {...register("name", {
            onChange: (evt) => {
              const slug = setStringToSlug(evt.target.value) ?? "";
              setValue("slug", slug, {
                shouldValidate: !!slug,
              });
            },
          })}
          error={errors.name?.message}
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
                value={field.value}
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

export default CategoryEdit;
