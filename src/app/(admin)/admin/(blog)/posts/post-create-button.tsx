"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { createPost } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { setStringToSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, {
    message: "Please enter post title",
  }),
  slug: z.string().min(1, {
    message: "Please enter post slug",
  }),
});

type PostForm = z.infer<typeof schema>;

export default function PostCreateButton() {
  const { user } = useContext(AuthenticationContext);
  const { toast } = useToast();
  const [isOpen, setOpen] = useState(false);

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm<PostForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(op) => {
        setOpen(op);
        reset();
      }}
    >
      <DialogTrigger asChild>
        <Button color="primary">New post</Button>
      </DialogTrigger>

      <DialogContent onInteractOutside={(evt) => evt.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(async (values) => {
              try {
                await createPost({
                  ...values,
                  authors: user ? [user.id] : [],
                });
                setOpen(false);
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
              placeholder="Enter post title"
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
                    placeholder="Enter post slug"
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
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              )}
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
