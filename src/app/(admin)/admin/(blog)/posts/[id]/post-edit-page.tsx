"use client";
import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { NovelEditor } from "@/components/editor";
import {
  Input,
  ReactSelect,
  Select,
  Textarea,
  TitleInput,
} from "@/components/forms";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { deletePost } from "@/lib/actions";
import { useStaffs, useTags } from "@/lib/hooks";
import { Post, PostVisibility, Tag, User } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { cn, debounce, formatTimestamp, setStringToSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Cloud,
  CloudUpload,
  ImagePlus,
  LoaderCircle,
  PanelRight,
  SquareArrowOutUpRight,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  cover: z.string().optional(),
  title: z.string().optional(),
  slug: z.string().min(1, {
    message: "Please enter post slug",
  }),
  excerpt: z.string().optional(),
  visibility: z.custom<PostVisibility>((v) => {
    return typeof v === "string" ? /public|member|paid_member/.test(v) : false;
  }),
  lexical: z.string().optional(),
  wordCount: z.number(),
  authors: z.custom<User>().array().min(1, {
    message: "Required at least one author",
  }),
  publishedAt: z.string().optional(),
  tags: z.custom<Tag>().array(),
});

type PostUpdateForm = z.infer<typeof schema>;

interface PostEditPageProps {
  post: Post;
}

export default function PostEditPage({ post }: PostEditPageProps) {
  const { user } = useContext(AuthenticationContext);
  const { toast } = useToast();

  const [isOpenSettings, setOpenSettings] = useState(false);
  const [isStale, setStale] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const { tags, isLoading: tagLoading } = useTags();
  const { users, isLoading: userLoading } = useStaffs();

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<PostUpdateForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: post.id,
      cover: post.cover,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      visibility: post.visibility,
      lexical: post.lexical,
      wordCount: post.wordCount,
      publishedAt: post.publishedAt,
      authors: post.authors ?? [],
      tags: post.tags ?? [],
    },
  });

  const handleUpdate = async () => {
    if (isSaving) {
      setStale(true);
      return;
    }

    try {
      setSaving(true);
      setStale(false);
      const { slug, authors, tags, ...body } = getValues();

      // const result = await updatePost({
      //   ...body,
      //   slug: !slug.trim() ? post.slug : slug,
      //   authors: authors.length > 0 ? authors.map((v) => v.id) : undefined,
      //   tags: tags.map((v) => v.id),
      //   updatedAt: post.audit?.updatedAt,
      // });
      console.log("update post");
      await new Promise((resolve) => setTimeout(() => resolve(true), 3000));
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
      setStale(true);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deletePost(post.id, true);
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

  // const coverImageView = () => {
  //   if (!post.cover) {
  //     return (
  //       <Button variant="outline" size="sm" className="mb-8 rounded-full">
  //         <ImagePlus size={20} className="mr-2" />
  //         Add Cover
  //       </Button>
  //     );
  //   }
  //   return (
  //     <div className="relative mb-8">
  //       <Image
  //         src={post.cover ?? "/images/course.jpg"}
  //         alt="Cover"
  //         width={0}
  //         height={0}
  //         sizes="100vw"
  //         priority
  //         style={{
  //           objectFit: "cover",
  //           width: "100%",
  //           height: "auto",
  //         }}
  //       />
  //       <Button variant="light" size="icon" className="absolute top-4 right-4">
  //         <Trash2 size={20} />
  //       </Button>
  //     </div>
  //   );
  // };

  if (!user) {
    return null;
  }

  const isAdminOrOwner = user.role === "admin" || user.role === "owner";
  const isContributor = user.role === "contributor";

  return (
    <>
      <div className="flex flex-col">
        <nav className="flex gap-3 items-center fixed top-0 inset-x-0 bg-white px-4 h-[65px] border-b z-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/posts">Posts</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-nowrap font-medium">
                  {post.status === "published" ? (
                    <Link
                      href={`/blogs/${post.slug}`}
                      target="_blank"
                      className="hover:underline"
                    >
                      Published
                      <SquareArrowOutUpRight className="size-4" />
                    </Link>
                  ) : (
                    `${post.status[0].toUpperCase()}${post.status.substring(1)}`
                  )}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex-1"></div>
          {saveStateView()}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isSaving} className="ms-2">
                Publish
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure to&nbsp;
                  {post.status === "draft" ? "publish" : "unpublish"} post?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isSaving}>
                  Cancel
                </AlertDialogCancel>
                <Button disabled={isSaving}>
                  {isSaving && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {post.status === "draft" ? "Publish" : "Unpublish"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger className="ms-auto">
                <Button
                  variant="default"
                  asChild
                  size="icon"
                  onClick={() => setOpenSettings((old) => !old)}
                >
                  <span>
                    <PanelRight size={22} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Post settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <div className="grow fixed inset-0 overflow-y-auto mt-[65px]">
          <div className="container max-w-3xl mt-7 mb-10">
            <Controller
              control={control}
              name="cover"
              render={({ field }) => {
                if (field.value) {
                  return (
                    <div className="relative mb-8">
                      <Image
                        src={field.value}
                        alt="Cover"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "auto",
                        }}
                      />
                      <Button
                        variant="light"
                        size="icon"
                        className="absolute top-4 right-4"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  );
                }
                return (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mb-8 rounded-full"
                  >
                    <ImagePlus size={20} className="mr-2" />
                    Add Cover
                  </Button>
                );
              }}
            />
            <div className="mb-6">
              <Controller
                control={control}
                name="title"
                render={({ field }) => {
                  return (
                    <TitleInput
                      placeholder="Post title"
                      className="text-gray-800"
                      value={field.value ?? ""}
                      spellCheck={false}
                      maxLength={2000}
                      onChange={(evt) => {
                        field.onChange(evt);
                        const value = evt.target.value;
                        const slug = setStringToSlug(value);
                        setValue("slug", slug);
                        if (post.status === "draft") {
                          debouncedUpdate(undefined);
                        }
                      }}
                    />
                  );
                }}
              />
            </div>
            <NovelEditor
              content={post.lexical ? JSON.parse(post.lexical) : undefined}
              onChange={(json, wordCount) => {
                setValue("lexical", JSON.stringify(json));
                setValue("wordCount", wordCount);
                if (post.status === "draft") {
                  handleUpdate();
                }
              }}
            />
          </div>
        </div>
        <div
          onClick={(evt) => {
            setOpenSettings(false);
            if (isStale && post.status === "draft") {
              handleUpdate();
            }
          }}
          className={cn(
            "bg-black fixed inset-0 z-40",
            `transition-opacity ease-out`,
            `${
              isOpenSettings
                ? "opacity-70 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`
          )}
        ></div>
      </div>
      <div
        className={cn(
          "flex flex-col fixed bg-white inset-y-0 right-0 w-full min-w-[100px] max-w-[400px] z-40",
          `transition-transform ease-out`,
          `${isOpenSettings ? "translate-x-0" : "translate-x-[400px]"}`
        )}
      >
        <div className="flex items-center gap-2 px-4 h-[65px] border-b">
          <h4 className="text-nowrap">Post settings</h4>
          <button
            className="ms-auto"
            onClick={() => {
              setOpenSettings(false);
              if (isStale && post.status === "draft") {
                handleUpdate();
              }
            }}
          >
            <X className="text-sliver" />
          </button>
        </div>
        <div className="grow overflow-y-auto scrollbar-custom">
          <div className="flex flex-col h-full p-4 pb-0">
            <Controller
              control={control}
              name="slug"
              render={({ field, fieldState: { error } }) => {
                return (
                  <Input
                    label="Slug"
                    type="text"
                    wrapperClass="mb-4"
                    placeholder="Enter post slug"
                    value={field.value}
                    onChange={(evt) => {
                      const slug = setStringToSlug(evt.target.value);
                      setValue("slug", slug, {
                        shouldValidate: true,
                      });
                      setStale(true);
                    }}
                    error={error?.message}
                  />
                );
              }}
            />
            {isAdminOrOwner && (
              <Select
                label="Visibility"
                wrapperClass="mb-4"
                {...register("visibility", {
                  onChange: (evt) => {
                    setStale(true);
                  },
                })}
                error={errors.visibility?.message}
              >
                <option value="public">Public</option>
                <option value="member">Member only</option>
                <option value="paid_member">Paid member only</option>
              </Select>
            )}

            <div className="flex flex-col mb-4">
              <label className="font-medium mb-1">Publish date</label>
              <Controller
                control={control}
                name="publishedAt"
                render={({ field }) => {
                  const date = field.value ? new Date(field.value) : new Date();
                  date.setMilliseconds(0);
                  const h = date.getHours();
                  const m = date.getMinutes();
                  return (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 size-4" />
                          {formatTimestamp(date.getTime(), true)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 flex flex-col"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={new Date(field.value ?? 0)}
                          onSelect={(v) => {
                            if (v) {
                              date.setDate(v.getDate());
                              setValue("publishedAt", date?.toISOString());
                            }
                          }}
                          initialFocus
                        />
                        <Separator />
                        <div className="flex w-[280px] items-center p-3">
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="00"
                              className="w-full"
                              value={h > 0 ? h : ""}
                              onChange={(evt) => {
                                const hour = parseInt(evt.target.value);
                                if (!isNaN(hour)) {
                                  date.setHours(hour);
                                  setValue("publishedAt", date?.toISOString());
                                } else {
                                  date.setHours(0);
                                  setValue("publishedAt", date?.toISOString());
                                }
                                setStale(true);
                              }}
                            />
                            <span className="text-sliver absolute right-2 inset-y-0 flex items-center">
                              HH
                            </span>
                          </div>
                          <span className="mx-1">:</span>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="00"
                              className="w-full"
                              value={m > 0 ? m : ""}
                              onChange={(evt) => {
                                const minute = parseInt(evt.target.value);
                                if (!isNaN(minute)) {
                                  date.setMinutes(minute);
                                  setValue("publishedAt", date?.toISOString());
                                } else {
                                  date.setMinutes(0);
                                  setValue("publishedAt", date?.toISOString());
                                }
                                setStale(true);
                              }}
                            />
                            <div className="text-sliver absolute right-2 inset-y-0 flex items-center">
                              mm
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
            </div>

            <Textarea
              label="Excerpt"
              wrapperClass="mb-4"
              className="resize-none"
              placeholder="Short description"
              rows={3}
              {...register("excerpt", {
                onChange: (evt) => {
                  setStale(true);
                },
              })}
            />
            <Controller
              control={control}
              name="tags"
              render={({ field, fieldState: { error } }) => {
                return (
                  <ReactSelect<Tag, true>
                    label="Tags"
                    wrapperClass="mb-4"
                    value={field.value}
                    options={tags?.contents}
                    getOptionLabel={(op) => op.name}
                    getOptionValue={(op) => `${op.id}`}
                    onChange={(newValue, action) => {
                      if (newValue instanceof Array) {
                        setValue("tags", [...newValue]);
                      } else {
                        setValue("tags", []);
                      }
                      setStale(true);
                    }}
                    isMulti
                    error={error?.message}
                    isClearable={false}
                    isLoading={tagLoading}
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
                      isLoading={userLoading}
                    />
                  );
                }}
              />
            )}

            <div className="grow mt-6"></div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete post</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure to delete post: &ldquo;
                    {post.title ?? "(Untitled)"}
                    &ldquo;?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>
                    Cancel
                  </AlertDialogCancel>
                  <Button onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting && (
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Proceed
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="pb-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}
