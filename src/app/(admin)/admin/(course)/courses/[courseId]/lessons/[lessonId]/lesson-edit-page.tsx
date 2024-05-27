"use client";

import { NovelEditor } from "@/components/editor";
import { Input, TitleInput } from "@/components/forms";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { deleteLesson, updateLesson } from "@/lib/actions";
import { Audit, Lesson } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { debounce, setStringToSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cloud, CloudUpload, LoaderCircle, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  title: z.string().min(1, {
    message: "Please enter lesson title",
  }),
  slug: z.string().optional(),
  lexical: z.string().optional(),
  trial: z.boolean().optional(),
  wordCount: z.number(),
});

type LessonForm = z.infer<typeof schema>;

export default function LessonEditPage({ lesson }: { lesson: Lesson }) {
  const [isStale, setStale] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const [openSetting, setOpenSetting] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const auditRef = useRef<Audit>();

  const { toast } = useToast();

  const { control, setValue, getValues } = useForm<LessonForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      lexical: lesson.lexical,
      trial: lesson.trial,
      wordCount: lesson.wordCount,
    },
  });

  useEffect(() => {
    auditRef.current = lesson.audit;
  }, [lesson]);

  const handleUpdate = async () => {
    if (isSaving) {
      setStale(true);
      return;
    }

    if (isDeleting) {
      return;
    }

    try {
      setSaving(true);
      setStale(false);

      const values = getValues();
      const audit = auditRef.current;

      const body = {
        ...values,
        courseId: lesson.course?.id,
        slug: !values.slug?.trim() ? lesson.slug : values.slug,
        updatedAt: audit?.updatedAt,
      };

      setValue("slug", body["slug"], { shouldValidate: true });

      await updateLesson(lesson.course?.id ?? 0, body);

      // console.log("update lesson");
      // await new Promise((resolve) => setTimeout(() => resolve(true), 3000));
      if (lesson.status === "published") {
        toast({
          title: "Success",
          description: "Lesson updated",
          variant: "success",
        });
      }
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

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteLesson(lesson.course?.id ?? 0, lesson.id, true);
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const debouncedUpdate = debounce(handleUpdate, 2000);

  const saveStateView = () => {
    if (lesson.status === "published") {
      return null;
    }

    if (isSaving) {
      return (
        <LoaderCircle className="flex-shrink-0 animate-spin text-muted-foreground" />
      );
    }

    if (isStale) {
      return <CloudUpload className="flex-shrink-0 text-muted-foreground" />;
    }

    return <Cloud className="flex-shrink-0 text-success" />;
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center space-x-3 fixed inset-x-0 top-0 bg-background px-4 h-[65px] border-b z-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/admin/courses/${lesson.course?.id}`}>
                    Course
                  </Link>
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
          {saveStateView()}
          {lesson.status === "published" && (
            <Button disabled={isSaving || isDeleting} onClick={handleUpdate}>
              {isSaving && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none" asChild>
              <Button variant="default" size="icon">
                <Settings className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="shadow-xl">
              <DropdownMenuItem onClick={() => setOpenSetting(true)}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpenDelete(true)}
                className="text-destructive focus:text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grow fixed inset-0 overflow-y-auto mt-[65px]">
          <div className="container max-w-3xl 2xl:max-w-4xl mt-7 mb-10">
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
                      spellCheck={false}
                      maxLength={2000}
                      value={field.value ?? ""}
                      onChange={(evt) => {
                        field.onChange(evt);
                        const value = evt.target.value;
                        const slug = setStringToSlug(value);
                        setValue("slug", slug);
                        if (lesson.status === "draft") {
                          debouncedUpdate(undefined);
                        }
                      }}
                    />
                  );
                }}
              />
            </div>
            <NovelEditor
              content={lesson.lexical ? JSON.parse(lesson.lexical) : undefined}
              onChange={(editor) => {
                const json = editor.getJSON();
                const wordCount = editor.storage.characterCount.words();
                setValue("lexical", JSON.stringify(json));
                setValue("wordCount", wordCount);
                if (lesson.status === "draft") {
                  debouncedUpdate(undefined);
                }
              }}
            />
          </div>
        </div>
      </div>

      <Dialog
        open={openSetting}
        onOpenChange={(open) => {
          setOpenSetting(open);
          if (isStale && lesson.status === "draft") {
            handleUpdate();
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
                      setStale(slug !== lesson.slug);
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
                        setStale(v !== lesson.trial);
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
              <Button
                type="button"
                className="mt-2"
                variant="default"
                disabled={isSaving}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure to delete lesson?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <Button onClick={handleDelete} disabled={isDeleting}>
              {isDeleting && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Proceed
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
