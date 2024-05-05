"use client";

import { ContentRenderer } from "@/components/editor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Menu } from "lucide-react";
import Link from "next/link";

const curriculum = [
  {
    name: "Chapter 1",
    lessons: [
      {
        name: "Lessons 1",
        trial: true,
      },
      {
        name: "Lessons 2",
        trial: false,
      },
      {
        name: "Lessons 3",
        trial: false,
      },
    ],
  },
  {
    name: "Chapter 2",
    lessons: [
      {
        name: "Lessons 1",
        trial: true,
      },
      {
        name: "Lessons 2",
        trial: false,
      },
      {
        name: "Lessons 3",
        trial: false,
      },
    ],
  },
  {
    name: "Chapter 3",
    lessons: [
      {
        name: "Lessons 1",
        trial: true,
      },
      {
        name: "Lessons 2",
        trial: false,
      },
      {
        name: "Lessons 3",
        trial: false,
      },
    ],
  },
];

export default function ResumeCoursePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:h-full">
      <div className="lg:col-span-3 2xl:col-span-2 border-r relative">
        <div className="absolute inset-0 bg-gray-50 hidden lg:block overflow-y-auto scrollbar-custom">
          <div className="flex flex-col p-4">
            <h5 className="mb-5">Getting started with docker</h5>

            <div className="text-sm text-sliver mb-1">50% completed</div>
            <Progress
              value={50}
              max={100}
              className="h-3 mb-6"
              indicatorClass="bg-success"
            />

            <Accordion
              type="multiple"
              className="flex flex-col gap-2"
              defaultValue={["chapter-0", "chapter-1", "chapter-2"]}
            >
              {curriculum.map((c, i) => {
                return (
                  <AccordionItem key={i} value={`chapter-${i}`}>
                    <AccordionTrigger className="py-2">
                      <h6>{c.name}</h6>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col divide-y">
                        {c.lessons.map((l, i) => {
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-2 py-3"
                            >
                              <CheckCircle className="text-success size-5" />
                              <Link
                                href={`/courses/docker/lessons/lesson-1`}
                                className="hover:text-primary"
                              >
                                {l.name}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 2xl:col-span-8 relative">
        <div className="absolute inset-0 lg:overflow-y-auto lg:scrollbar-hide p-4 lg:px-6">
          <Breadcrumb className="mb-5">
            <BreadcrumbList>
              <BreadcrumbItem className="lg:hidden">
                <div
                  role="button"
                  className="flex items-center gap-2 text-primary font-semibold"
                >
                  <Menu />
                  Menu
                </div>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="lg:hidden" />
              <BreadcrumbItem>Chapter 1</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Introduction</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <ContentRenderer />

          <Separator className="mt-16 mb-4" />

          <div className="flex items-center space-x-2 mb-6">
            <Checkbox id="completed-check" className="rounded" />
            <label
              htmlFor="completed-check"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mark as completed
            </label>
          </div>
          <div className="flex justify-between pb-10">
            <Button variant="default" asChild>
              <Link href={`/learn`}>Previous</Link>
            </Button>
            <Button asChild>
              <Link href={`/learn`}>Next</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 relative border-l">
        <div className="absolute inset-0 lg:overflow-y-auto lg:scrollbar-hide p-4 hidden lg:block">
          <h6 className="text-sm">On this lesson</h6>
          <Separator className="my-3" />
          <ul>
            <li>
              <a
                href="#getting-started"
                className="text-sliver hover:text-black text-sm"
              >
                Getting started
              </a>
            </li>
            <li>
              <a
                href="#installation"
                className="text-sliver hover:text-black text-sm"
              >
                Installation
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
