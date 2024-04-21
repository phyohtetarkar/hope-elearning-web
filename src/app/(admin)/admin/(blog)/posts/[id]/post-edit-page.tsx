"use client";
import { NovelEditor } from "@/components/editor";
import { Input, Select, Textarea, TitleInput } from "@/components/forms";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PostAccess, Tag, User } from "@/lib/models";
import { cn, debounce, setStringToSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CloudUpload,
  FileCheck2,
  ImagePlus,
  LoaderCircle,
  PanelRight,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  cover: z.string().optional(),
  title: z.string().optional(),
  slug: z.string().min(1, {
    message: "Please enter post slug",
  }),
  excerpt: z.string().optional(),
  access: z.custom<PostAccess>((v) => {
    return typeof v === "string" ? /public|member|paid_member/.test(v) : false;
  }),
  lexical: z.string().optional(),
  updatedAt: z.string().datetime(),
  authors: z.custom<User>().array().nonempty({
    message: "Required at least one author",
  }),
  tags: z.custom<Tag>().array(),
});

type PostUpdateForm = z.infer<typeof schema>;

export default function PostEditPage() {
  const [isOpenSettings, setOpenSettings] = useState(false);
  const [isStale, setStale] = useState(false);
  const [isSaving, setSaving] = useState(false);

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
      authors: [],
    },
  });

  const handleUpdatePost = (values: PostUpdateForm) => {
    console.log(values);
    setStale(false);
  };

  const debouncedUpdate = useMemo(() => {
    return debounce(handleUpdatePost, 1000);
  }, []);

  const saveStateView = () => {
    if (isSaving) {
      return (
        <LoaderCircle className="flex-shrink-0 animate-spin text-sliver" />
      );
    }

    if (isStale) {
      return <CloudUpload className="flex-shrink-0 text-sliver" />;
    }

    return <FileCheck2 className="flex-shrink-0 text-success" />;
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-3 items-center fixed top-0 inset-x-0 bg-white px-4 h-[65px] border-b z-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/posts">Posts</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-nowrap">
                  Post Edit
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex-1"></div>
          {saveStateView()}
          <Button>Publish</Button>
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
        </div>
        <div className="grow fixed inset-0 overflow-y-auto mt-[65px]">
          <div className="container max-w-3xl mt-7 mb-10">
            <Button variant="outline" size="sm" className="mb-8 rounded-full">
              <ImagePlus size={20} className="mr-2" />
              Add Cover
            </Button>
            <div className="mb-6">
              <Controller
                control={control}
                name="title"
                render={({ field }) => {
                  return (
                    <TitleInput
                      placeholder="Post title"
                      className="text-gray-800"
                      onChange={(evt) => {
                        const value = evt.target.value;
                        setValue("title", value);
                        const slug = setStringToSlug(value);
                        if (slug) {
                          setValue("slug", slug);
                        }
                        if (!isStale) {
                          setStale(true);
                        }
                        debouncedUpdate(getValues());
                      }}
                    />
                  );
                }}
              />
            </div>
            <NovelEditor
              onChange={(json) => {
                setValue("lexical", JSON.stringify(json));
                if (!isStale) {
                  setStale(true);
                }
                debouncedUpdate(getValues());
              }}
            />
          </div>
        </div>
        <div
          onClick={(evt) => {
            setOpenSettings(false);
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
          <button className="ms-auto" onClick={() => setOpenSettings(false)}>
            <X className="text-sliver" />
          </button>
        </div>
        <div className="grow overflow-y-auto scrollbar-custom">
          <div className="flex flex-col h-full p-4 pb-0">
            <Input
              label="Slug"
              type="text"
              wrapperClass="mb-4"
              placeholder="Enter post slug"
              {...register("slug")}
              error={errors.slug?.message}
            />
            <Select
              label="Access"
              wrapperClass="mb-4"
              {...register("access")}
              error={errors.access?.message}
            >
              <option value="public">Public</option>
              <option value="member">Member only</option>
              <option value="paid_member">Paid member only</option>
            </Select>
            <Textarea
              label="Excerpt"
              wrapperClass="mb-4"
              className="resize-none"
              placeholder=""
              rows={4}
              {...register("excerpt")}
            />
            <div className="grow"></div>
            <Button variant="destructive" className="mt-auto">
              Delete post
            </Button>
            <div className="pb-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}
