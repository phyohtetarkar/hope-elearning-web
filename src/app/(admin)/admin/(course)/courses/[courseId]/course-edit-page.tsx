"use client";

import { Input, Select } from "@/components/forms";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CourseChaptersEdit from "./course-chapters-edit";

interface CourseEditPageProps {}

export default function CourseEditPage({}: CourseEditPageProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 fixed inset-x-0 top-0 bg-white px-4 h-[65px] border-b z-10">
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
                Edit Course
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex-1"></div>
        <Button>Publish</Button>
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
              />

              <Input label="Slug" type="text" placeholder="Enter course slug" />

              <Select label="Level">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>

              <Select label="Access">
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </Select>

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
                    <Button variant="link" className="font-semibold">
                      Upload image
                    </Button>
                    <span className="text-sm text-sliver text-center">
                      PNG or JPG up to 300KB
                    </span>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="lg:col-span-5">
            <fieldset className="grid grid-cols-1 gap-4 rounded border p-4 lg:p-5">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Curriculum
              </legend>

              <CourseChaptersEdit />
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}
