"use client";
import { ContentEditor } from "@/components/editor";
import { TitleInput } from "@/components/forms";
import {
  ArrowLeftStartOnRectangleIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Tooltip,
} from "@nextui-org/react";

export default function PostEdit() {
  return (
    <div className="flex flex-col">
      <div className="flex gap-3 items-center fixed top-0 inset-x-0 bg-white px-4 h-[65px] border-b z-10">
        <Breadcrumbs underline="hover">
          <BreadcrumbItem href="/admin/posts">Posts</BreadcrumbItem>
          <BreadcrumbItem>Post Edit</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex-1"></div>
        <Button isDisabled color="primary">
          Publish
        </Button>
        <Tooltip content="Post settings" color="foreground">
          <Button isIconOnly>
            <ArrowLeftStartOnRectangleIcon width={24} />
          </Button>
        </Tooltip>
      </div>
      <div className="container max-w-3xl p-0 mt-[85px] mb-10">
        <Button
          radius="full"
          size="sm"
          className="mb-8"
          startContent={<PhotoIcon width={24} />}
        >
          Add Cover
        </Button>
        <div className="mb-4">
          <TitleInput placeholder="Post Title" className="text-gray-800" />
        </div>
        <ContentEditor holderId="post-editor" />
      </div>
      {/* <div className="fixed bg-black top-0 right-0 bottom-0 min-w-[250px] z-40">

      </div> */}
    </div>
  );
}
