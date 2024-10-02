"use client";

import RichTextEditor from "@/components/ui/rich-text-editor";
import { updateCourse, uploadImage } from "@/lib/actions";
import { useCategories, useStaffs } from "@/lib/hooks";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { useAppSelector } from "@elearning/global-store";
import { selectUser } from "@elearning/global-store/slices";
import {
  Audit,
  Category,
  Course,
  CourseAccess,
  CourseLevel,
  User,
} from "@elearning/lib/models";
import { setStringToSlug, uppercaseFirstChar } from "@elearning/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  Separator,
  useToast,
} from "@elearning/ui";
import { Input, ReactSelect, Select, Textarea } from "@elearning/ui/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink, LoaderCircle, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import CourseChaptersEdit from "./course-chapters-edit";
import CourseDeleteButton from "./course-delete-button";
import CoursePublishButton from "./course-publish-button";

interface CourseEditPageProps {
  course: Course;
}

const schema = z.object({
  id: z.number(),
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
  }),
});

type CourseForm = z.infer<typeof schema>;

export default function CourseEditPage({ course }: CourseEditPageProps) {
  const user = useAppSelector(selectUser);
  const [isUploading, setUploading] = useState(false);

  const coverFileRef = useRef<HTMLInputElement>(null);

  const auditRef = useRef<Audit>();

  const { toast } = useToast();

  const { categories, isLoading: categoryLoading } = useCategories();
  const { users, isLoading: userLoading } = useStaffs();

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<CourseForm>({
    resolver: zodResolver(schema),
    defaultValues: {},
    values: {
      id: course.id,
      cover: course.cover,
      title: course.title,
      slug: course.slug,
      excerpt: course.excerpt,
      description: course.description,
      level: course.level,
      access: course.access,
      category: course.category!,
      authors: course.authors ?? [],
    },
  });

  useEffect(() => {
    auditRef.current = course.audit;
  }, [course]);

  const handleUpdate = async (values: CourseForm) => {
    try {
      const { slug, authors, category, ...body } = values;
      const audit = auditRef.current;
      await updateCourse({
        ...body,
        slug: !slug ? course.slug : slug,
        categoryId: category.id,
        authors: authors.map((a) => a.id),
        updatedAt: audit?.updatedAt,
      });
      toast({
        title: "Success",
        description: "Course updated",
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

  const handleCoverUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0]!;
        const fileSize = file.size / (1024 * 1024);

        if (fileSize > 1) {
          throw "File size too big (max 1MB).";
        }

        setUploading(true);
        const form = new FormData();
        form.append("file", file);
        const url = await uploadImage(form);
        if (course.status === "draft") {
          const audit = auditRef.current;
          const { id, title, slug, category } = course;
          await updateCourse({
            id: id,
            title: title,
            slug: slug,
            cover: url,
            categoryId: category?.id,
            updatedAt: audit?.updatedAt,
          });
        }
        setValue("cover", url);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      event.target.value = "";
      setUploading(false);
    }
  };

  if (!user) {
    return null;
  }

  const isAdminOrOwner = user.role === "admin" || user.role === "owner";
  const isContributor = user.role === "contributor";

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-3 fixed inset-x-0 top-0 bg-background px-4 h-[65px] border-b z-10">
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
                  <a
                    href={`/courses/${course.slug}`}
                    target="_blank"
                    className="flex items-center space-x-1"
                  >
                    <span>Published</span>
                    <ExternalLink className="size-4" />
                  </a>
                ) : (
                  `${uppercaseFirstChar(course.status)}`
                )}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex-1"></div>

        {!isContributor && (
          <CoursePublishButton course={course} disabled={isSubmitting} />
        )}
        <CourseDeleteButton course={course} disabled={isSubmitting} />
      </div>
      <div className="grow mt-[65px] py-4">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
          <div className="lg:col-span-7">
            <Card className="shadow-none">
              <div className="flex items-center gap-2 px-5 h-16 ">
                <h4 className="text-ellipsis text-nowrap overflow-hidden">
                  Basic Information
                </h4>

                <Button
                  className="ms-auto"
                  disabled={isSubmitting}
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
              <Separator />
              <CardContent className="p-5">
                <div className="grid grid-cols-1 gap-4">
                  {/* <legend className="-ml-1 px-1 text-sm font-medium">
                    Basic Information
                  </legend> */}

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
                            const slug =
                              setStringToSlug(evt.target.value) ?? "";
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
                    maxLength={1000}
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
                          options={categories?.contents}
                          getOptionLabel={(op) => op.name}
                          getOptionValue={(op) => `${op.id}`}
                          onChange={(newValue, action) => {
                            newValue && setValue("category", newValue);
                          }}
                          error={error?.message}
                          isClearable={false}
                          isLoading={categoryLoading}
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
                            options={users?.contents}
                            getOptionLabel={(op) => op.nickname}
                            getOptionValue={(op) => `${op.id}`}
                            onChange={(newValue, action) => {
                              if (newValue instanceof Array) {
                                setValue("authors", [...newValue], {
                                  shouldValidate: true,
                                });
                              } else {
                                setValue("authors", [], {
                                  shouldValidate: true,
                                });
                              }
                            }}
                            isMulti
                            error={error?.message}
                            isClearable={false}
                            isLoading={userLoading}
                          />
                        );
                      }}
                    />
                  )}

                  <div className="flex flex-col">
                    <label className="font-medium mb-1">Cover photo</label>
                    <div className="aspect-w-5 aspect-h-2 border-2 border-border border-dashed rounded-md bg-muted/50">
                      <Controller
                        control={control}
                        name="cover"
                        render={({ field }) => {
                          if (field.value) {
                            return (
                              <>
                                <Image
                                  alt="Cover"
                                  src={field.value}
                                  fill
                                  sizes="50vw"
                                  priority
                                  className="object-contain"
                                />

                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-4 right-4 left-auto bottom-auto"
                                  onClick={() => setValue("cover", undefined)}
                                >
                                  <Trash2 size={20} />
                                </Button>
                              </>
                            );
                          }
                          return (
                            <>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <Button
                                  variant="link"
                                  className="font-semibold hover:no-underline"
                                  disabled={isUploading}
                                  onClick={() => coverFileRef.current?.click()}
                                >
                                  Upload image
                                  {isUploading ? (
                                    <LoaderCircle className="ms-2 size-4 animate-spin" />
                                  ) : (
                                    <Upload className="size-5 ms-2" />
                                  )}
                                </Button>
                                <span className="text-sm text-muted-foreground text-center">
                                  PNG or JPG up to 1MB
                                </span>
                              </div>
                              <input
                                ref={coverFileRef}
                                type="file"
                                accept="image/x-png,image/jpeg"
                                className="hidden"
                                onChange={handleCoverUpload}
                              />
                            </>
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
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
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="shadow-none">
              <div className="flex items-center gap-2 px-5 h-16">
                <h4>Syllabus</h4>
              </div>
              <Separator />
              <CardContent className="p-5">
                <div className="grid grid-cols-1">
                  <CourseChaptersEdit course={course} />
                </div>
              </CardContent>
            </Card>

            {/* <fieldset className="grid grid-cols-1 gap-4 rounded border p-4 lg:p-5">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Curriculum
              </legend>
            </fieldset> */}
          </div>
        </div>
      </div>
    </div>
  );
}
