"use client";

import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { createTag, updateTag } from "@/lib/actions";
import { Tag } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { setStringToSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Please enter tag name",
  }),
  slug: z.string().min(1, {
    message: "Please enter tag slug",
  }),
});

type TagForm = z.infer<typeof schema>;

function TagEdit({ data, close }: { data?: Tag; close?: () => void }) {
  const router = useRouter();

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<TagForm>({
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
              await createTag(values);
            } else {
              await updateTag(values);
            }
            close?.();
            router.refresh();
          } catch (error) {
            toast.error(parseErrorResponse(error));
          }
        })();
      }}
    >
      <div className="gird grid-cols-1">
        <Input
          label="Tag"
          id="tag"
          type="text"
          wrapperClass="mb-4"
          placeholder="Enter tag"
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

export default TagEdit;
