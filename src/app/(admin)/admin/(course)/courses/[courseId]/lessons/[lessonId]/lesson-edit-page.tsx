"use client";

import { NovelEditor } from "@/components/editor";
import { TitleInput } from "@/components/forms";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function LessonEditPage() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 fixed inset-x-0 top-0 bg-white px-4 h-[65px] border-b z-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/admin/courses/1`}>Course</Link>
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
        <Button>Save</Button>
      </div>
      <div className="grow fixed inset-0 overflow-y-auto mt-[65px]">
        <div className="container max-w-3xl mt-7 mb-10">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                The Complete ReactJs Course - Basics to Advanced [2024]
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Chapter 1</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="mb-6">
            <TitleInput
              placeholder="Lesson title"
              className="text-gray-800"
              spellCheck={false}
              maxLength={2000}
            />
          </div>
          <NovelEditor />
        </div>
      </div>
    </div>
  );
}
