"use client";

import { Input, Select } from "@/components/forms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

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
                <div className="aspect-w-16 aspect-h-9 border-2 border-dashed rounded-md bg-gray-50">
                  {/* <Image
                  alt="Cover"
                  src={"/images/placeholder.jpeg"}
                  fill
                  sizes="100vh"
                  priority
                  className="object-cover p-1"
                /> */}
                  <div className="flex flex-col items-center justify-center">
                    <Button variant="link" className="font-semibold">
                      Upload image
                    </Button>
                    <span className="text-sm text-sliver">
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

              <Accordion
                type="single"
                className="flex flex-col gap-2 bg-gray-100 rounded-md px-2"
                collapsible
              >
                <AccordionItem value="chapter-1">
                  <AccordionTrigger>
                    <h6 className="text-sm">Chapter 1</h6>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 bg-white rounded p-2">
                      <h6 className="text-sm">Lesson 1</h6>
                      <div className="flex-1"></div>
                      <Button
                        size="icon"
                        variant="default"
                        className="size-8 flex-shrink-0"
                        asChild
                      >
                        <Link href={`/admin/courses/1/lessons/1`}>
                          <Edit className="size-4" />
                        </Link>
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="size-8 flex-shrink-0"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded p-2">
                      <h6 className="text-sm">Lesson 2</h6>
                      <div className="flex-1"></div>
                      <Button
                        size="icon"
                        variant="default"
                        className="size-8 flex-shrink-0"
                        asChild
                      >
                        <Link href={`/admin/courses/1/lessons/1`}>
                          <Edit className="size-4" />
                        </Link>
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="size-8 flex-shrink-0"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="flex-shrink-0"
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="flex-shrink-0"
                      >
                        <Plus className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="flex-shrink-0"
                      >
                        <Trash2 className="size-4 text-danger" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div>
                <Button size="sm">Add chapter</Button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}
