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
import { cn } from "@/lib/utils";
import { ImagePlus, PanelRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PostEdit() {
  const [isOpenSettings, setOpenSettings] = useState(false);

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
              <TitleInput placeholder="Post title" className="text-gray-800" />
            </div>
            <NovelEditor />
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
            />
            <Select label="Access" wrapperClass="mb-4">
              <option>Public</option>
              <option>Member only</option>
              <option>Paid member only</option>
            </Select>
            <Textarea
              label="Excerpt"
              wrapperClass="mb-4"
              className="resize-none"
              placeholder=""
              rows={4}
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
