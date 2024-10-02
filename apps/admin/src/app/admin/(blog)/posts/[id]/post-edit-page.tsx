"use client";

import { updatePost, uploadImage } from "@/lib/actions";
import { BASE_URL } from "@/lib/constants";
import { useStaffs, useTags } from "@/lib/hooks";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { BlockEditor, TiptapEditor } from "@elearning/block-editor";
import { useAppSelector } from "@elearning/global-store";
import { selectUser } from "@elearning/global-store/slices";
import { Audit, Post, PostVisibility, Tag, User } from "@elearning/lib/models";
import {
  cn,
  debounce,
  formatTimestamp,
  setStringToSlug,
  uppercaseFirstChar,
} from "@elearning/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
} from "@elearning/ui";
import {
  Input,
  ReactSelect,
  Select,
  Textarea,
  TitleInput,
} from "@elearning/ui/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Cloud,
  CloudUpload,
  ExternalLink,
  ImagePlus,
  LoaderCircle,
  PanelRight,
  Trash2,
  X,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import PostDeleteButton from "./post-delete-button";
import PostPublishButton from "./post-publish-button";

const schema = z.object({
  id: z.number(),
  cover: z.string().optional().nullable(),
  title: z.string().optional(),
  slug: z.string().min(1, {
    message: "Please enter post slug",
  }),
  excerpt: z.string().optional(),
  visibility: z.custom<PostVisibility>((v) => {
    return typeof v === "string" ? /public|member|paid_member/.test(v) : false;
  }),
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
  const user = useAppSelector(selectUser);
  const { toast } = useToast();
  const auditRef = useRef<Audit>();
  const editorRef = useRef<TiptapEditor>();

  const [data, setData] = useState(post);

  const [isOpenSettings, setOpenSettings] = useState(false);

  const [isStale, setStale] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isUploading, setUploading] = useState(false);

  const coverFileRef = useRef<HTMLInputElement>(null);
  const staleRef = useRef(false);
  const savingRef = useRef(false);

  const { tags, isLoading: tagLoading } = useTags();
  const { users, isLoading: userLoading } = useStaffs();

  useEffect(() => {
    auditRef.current = post.audit;
  }, [post]);

  useEffect(() => {
    staleRef.current = isStale;
  }, [isStale]);

  useEffect(() => {
    savingRef.current = isSaving;
  }, [isSaving]);

  const {
    control,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<PostUpdateForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data.id,
      cover: data.cover,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      visibility: data.visibility,
      authors: data.authors ?? [],
      tags: data.tags ?? [],
    },
    values: {
      id: data.id,
      cover: data.cover,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      visibility: data.visibility,
      publishedAt: data.publishedAt,
      authors: data.authors ?? [],
      tags: data.tags ?? [],
    },
  });

  const handleUpdate = async () => {
    if (savingRef.current) {
      setStale(true);
      return;
    }

    try {
      setSaving(true);
      setStale(false);
      const { slug, authors, tags, ...values } = getValues();

      const audit = auditRef.current;

      const editor = editorRef.current;

      const json = editor?.getJSON();
      const wordCount = editor?.storage.characterCount.words() ?? 0;
      const html = editor?.getHTML();

      const body = {
        ...values,
        slug: !slug.trim() ? post.slug : slug,
        authors: authors.length > 0 ? authors.map((v) => v.id) : undefined,
        tags: tags.map((v) => v.id),
        lexical: json ? JSON.stringify(json) : undefined,
        html: html,
        wordCount: wordCount,
        updatedAt: audit?.updatedAt,
      };

      const result = await updatePost(body);
      setValue("slug", body["slug"], { shouldValidate: true });
      auditRef.current = result.audit;
      setData(result);

      // await new Promise((resolve) => setTimeout(() => resolve(true), 3000));
      if (post.status === "published") {
        toast({
          title: "Success",
          description: "Post updated",
          variant: "success",
        });
      }

      setSaving(false);
      savingRef.current = false;
      if (staleRef.current) {
        handleUpdate();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
      setSaving(false);
      setStale(true);
    }
  };

  const debouncedUpdate = debounce(handleUpdate, 2000);

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
        setValue("cover", url);
        setStale(true);
        if (post.status === "draft") {
          handleUpdate();
        }
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

  const saveStateView = () => {
    if (post.status === "published") {
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

  if (!user) {
    return null;
  }

  const isAdminOrOwner = user.role === "admin" || user.role === "owner";
  const isContributor = user.role === "contributor";

  return (
    <>
      <div className="flex flex-col">
        <nav className="flex gap-3 items-center fixed top-0 inset-x-0 bg-background px-4 h-[65px] border-b z-10">
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
                    <a
                      href={`/posts/${post.slug}`}
                      target="_blank"
                      className="hover:underline flex items-center space-x-1"
                    >
                      <span>Published</span>
                      <ExternalLink className="size-4" />
                    </a>
                  ) : (
                    `${uppercaseFirstChar(post.status)}`
                  )}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex-1"></div>
          {saveStateView()}

          {!isContributor && (
            <PostPublishButton
              post={post}
              disabled={isSaving}
              beforeUpdate={async () => {
                if (isStale) {
                  await handleUpdate();
                }
              }}
            />
          )}

          {post.status === "published" && (
            <Button disabled={isSaving} onClick={() => handleUpdate()}>
              {isSaving && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update
            </Button>
          )}

          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
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
        <div className="grow mt-[65px]">
          <div className="container max-w-3xl 2xl:max-w-4xl mt-7 mb-16">
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
                        className="object-cover w-full h-auto border rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-4 right-4"
                        onClick={() => {
                          setValue("cover", null);
                          if (post.status === "draft") {
                            handleUpdate();
                          }
                        }}
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  );
                }
                return (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mb-8 rounded-full"
                      disabled={isUploading}
                      onClick={() => coverFileRef.current?.click()}
                    >
                      {isUploading ? (
                        <LoaderCircle className="mr-2 size-4 animate-spin" />
                      ) : (
                        <ImagePlus className="size-5 mr-2" />
                      )}
                      Add Cover
                    </Button>
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
            <div className="mb-6">
              <Controller
                control={control}
                name="title"
                render={({ field }) => {
                  return (
                    <TitleInput
                      placeholder="Post title"
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
            <BlockEditor
              content={post.lexical ? JSON.parse(post.lexical) : undefined}
              aiProvider={{
                url: `${BASE_URL}/api/completion`,
              }}
              onCreate={(editor) => {
                editorRef.current = editor;
              }}
              onUpdate={(editor) => {
                // const json = editor.getJSON();
                // const wordCount = editor.storage.characterCount.words();
                // const html = editor.getHTML();
                // setValue("lexical", JSON.stringify(json));
                // setValue("html", html);
                // setValue("wordCount", wordCount);
                editorRef.current = editor;
                if (post.status === "draft") {
                  debouncedUpdate(undefined);
                }
              }}
            />
          </div>
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
      <div
        className={cn(
          "flex flex-col fixed bg-background border-l inset-y-0 right-0 w-full min-w-[100px] max-w-[400px] z-50",
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
            <X className="text-muted-foreground" />
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

                      if (post.status === "draft") {
                        setStale(true);
                      }
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
                    if (post.status === "draft") {
                      setStale(true);
                    }
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
                  const currentDate = new Date();
                  const date = field.value
                    ? new Date(field.value)
                    : currentDate;
                  date.setMilliseconds(0);
                  const h = date.getHours();
                  const m = date.getMinutes();
                  return (
                    <Popover>
                      <div className="relative flex">
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-start text-left font-normal grow"
                          >
                            <CalendarIcon className="mr-2 size-4" />
                            {formatTimestamp(date.getTime(), true)}
                          </Button>
                        </PopoverTrigger>
                        {field.value && (
                          <div
                            role="button"
                            className="absolute right-2 top-[50%] translate-y-[-50%]"
                            onClick={() => {
                              setValue("publishedAt", undefined);
                              if (post.status === "draft") {
                                setStale(true);
                              }
                            }}
                          >
                            <XIcon className="size-4 text-gray-400 hover:text-gray-600" />
                          </div>
                        )}
                      </div>
                      <PopoverContent
                        className="w-auto p-0 flex flex-col"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          disabled={(d) => d > currentDate}
                          onSelect={(v) => {
                            if (v) {
                              date.setDate(v.getDate());
                              if (date > currentDate) {
                                setValue(
                                  "publishedAt",
                                  currentDate?.toISOString()
                                );
                              } else {
                                setValue("publishedAt", date?.toISOString());
                              }
                              if (post.status === "draft") {
                                setStale(true);
                              }
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
                                if (!isNaN(hour) && hour < 24) {
                                  date.setHours(hour);
                                  if (date > currentDate) {
                                    return;
                                  }
                                  setValue("publishedAt", date?.toISOString());
                                } else {
                                  date.setHours(0);
                                  setValue("publishedAt", date?.toISOString());
                                }
                                if (post.status === "draft") {
                                  setStale(true);
                                }
                              }}
                            />
                            <span className="text-muted-foreground absolute right-2 inset-y-0 flex items-center">
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
                                if (!isNaN(minute) && minute < 60) {
                                  date.setMinutes(minute);
                                  if (date > currentDate) {
                                    return;
                                  }
                                  setValue("publishedAt", date?.toISOString());
                                } else {
                                  date.setMinutes(0);
                                  setValue("publishedAt", date?.toISOString());
                                }
                                if (post.status === "draft") {
                                  setStale(true);
                                }
                              }}
                            />
                            <div className="text-muted-foreground absolute right-2 inset-y-0 flex items-center">
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
              maxLength={1000}
              {...register("excerpt", {
                onChange: (evt) => {
                  if (post.status === "draft") {
                    setStale(true);
                  }
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
                      if (post.status === "draft") {
                        setStale(true);
                      }
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
                          if (post.status === "draft" && newValue.length > 0) {
                            setStale(true);
                          }
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

            <PostDeleteButton post={post} />

            <div className="pb-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}
