"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import {
  Input,
  ReactSelect,
  RichTextEditor,
  Select,
  Textarea,
} from "@/components/forms";
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
import { updateCourse } from "@/lib/actions";
import {
  Category,
  Course,
  CourseAccess,
  CourseLevel,
  User,
} from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { setStringToSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Cloud,
  CloudUpload,
  LoaderCircle,
  SquareArrowOutUpRight,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import CourseChaptersEdit from "./course-chapters-edit";

interface CourseEditPageProps {
  course: Course;
  categories: Category[];
  authors: User[];
}

const schema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Please enter course name",
  }),
  slug: z.string().min(1, {
    message: "Please enter course slug",
  }),
  cover: z.string().optional(),
  excerpt: z.string().optional(),
  description: z.string().optional(),
  level: z.custom<CourseLevel>((v) => {
    return typeof v === "string"
      ? /beginner|intermediate|advanced/.test(v)
      : false;
  }),
  access: z.custom<CourseAccess>((v) => {
    return typeof v === "string" ? /free|premium/.test(v) : false;
  }),
  category: z
    .custom<Category>()
    .refine((v) => !!v, { message: "Required course category" }),
  authors: z.custom<User>().array().min(1, {
    message: "Required at least one author",
  })
});

type CourseForm = z.infer<typeof schema>;

export default function CourseEditPage({
  course,
  categories,
  authors,
}: CourseEditPageProps) {
  const { user } = useContext(AuthenticationContext);
  const [isStale, setStale] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const { toast } = useToast();

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<CourseForm>({
    resolver: zodResolver(schema),
    defaultValues: course,
  });

  const handleUpdate = async (values: CourseForm) => {
    try {
      setSaving(true);
      setStale(false);
      const { slug, authors, category, ...body } = values;
      await updateCourse({
        ...body,
        slug: !slug ? course.slug : slug,
        categoryId: category.id,
        authors: authors.map((a) => a.id),
        updatedAt: course.audit?.updatedAt,
      });
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

  if (!user) {
    return null;
  }

  const isAdminOrOwner = user.role === "admin" || user.role === "owner";

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 fixed inset-x-0 top-0 bg-white px-4 h-[65px] border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/courses">Courses</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-nowrap">
                {course.status === "published" ? (
                  <Link
                    href={`/courses/${course.slug}`}
                    target="_blank"
                    className="hover:underline"
                  >
                    Published
                    <SquareArrowOutUpRight className="size-4" />
                  </Link>
                ) : (
                  `${course.status[0].toUpperCase()}${course.status.substring(
                    1
                  )}`
                )}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex-1"></div>
        {saveStateView()}
        <Button disabled={isSubmitting || isSaving} className="ms-2">
          Publish
        </Button>
      </div>
      <div className="grow fixed inset-0 overflow-y-auto mt-[65px] py-4">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
          <div className="lg:col-span-7">
            <fieldset className="grid grid-cols-1 gap-4 rounded border p-4 lg:p-5">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Basic Information
              </legend>

              <Input
                label="Title"
                type="text"
                placeholder="Enter course title"
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

              <Textarea
                label="Excerpt"
                placeholder="Short description"
                rows={4}
                className="resize-none"
                {...register("excerpt")}
              />

              <Select label="Level" {...register("level")}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>

              <Select label="Access" {...register("access")}>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </Select>

              <Controller
                control={control}
                name="category"
                render={({ field, fieldState: { error } }) => {
                  return (
                    <ReactSelect<Category>
                      label="Category"
                      value={field.value}
                      options={categories}
                      getOptionLabel={(op) => op.name}
                      getOptionValue={(op) => `${op.id}`}
                      onChange={(newValue, action) => {
                        newValue && setValue("category", newValue);
                      }}
                      error={error?.message}
                      isClearable={false}
                    />
                  );
                }}
              />

              {isAdminOrOwner && (
                <Controller
                  control={control}
                  name="authors"
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <ReactSelect<User, true>
                        label="Authors"
                        value={field.value}
                        options={authors}
                        getOptionLabel={(op) => op.nickname}
                        getOptionValue={(op) => `${op.id}`}
                        onChange={(newValue, action) => {
                          if (newValue instanceof Array) {
                            setValue("authors", [...newValue], {
                              shouldValidate: true,
                            });
                            newValue.length > 0 && setStale(true);
                          } else {
                            setValue("authors", [], {
                              shouldValidate: true,
                            });
                          }
                        }}
                        isMulti
                        error={error?.message}
                        isClearable={false}
                      />
                    );
                  }}
                />
              )}

              <div className="flex flex-col">
                <label className="font-medium mb-1">Cover photo</label>
                <div className="aspect-w-3 aspect-h-1 border-2 border-dashed rounded-md bg-gray-50">
                  <div className="flex justify-center p-1">
                    {/* <Image
                      alt="Cover"
                      src={"/images/placeholder.jpeg"}
                      width={0}
                      height={0}
                      sizes="100vw"
                      priority
                      className="object-cover h-full w-auto"
                    /> */}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Button
                      variant="link"
                      className="font-semibold hover:no-underline"
                    >
                      Upload image
                      <Upload className="size-5 ms-2" />
                    </Button>
                    <span className="text-sm text-sliver text-center">
                      PNG or JPG up to 1MB
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-medium mb-1">Description</label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <RichTextEditor
                        id="descriptionInput"
                        placeholder="Enter course description..."
                        minHeight={300}
                        value={field.value ?? ""}
                        onEditorChange={(value) => {
                          setValue("description", value);
                        }}
                      />
                    );
                  }}
                />
              </div>

              <div>
                <Button
                  disabled={isSubmitting || isSaving}
                  onClick={() => {
                    handleSubmit(handleUpdate)();
                  }}
                >
                  {isSubmitting && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update
                </Button>
              </div>
            </fieldset>
          </div>

          <div className="lg:col-span-5">
            <fieldset className="grid grid-cols-1 gap-4 rounded border p-4 lg:p-5">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Curriculum
              </legend>

              <CourseChaptersEdit course={course} />
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}
