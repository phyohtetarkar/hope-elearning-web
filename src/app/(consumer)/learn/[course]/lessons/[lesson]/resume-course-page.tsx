"use client";

import { ContentRenderer } from "@/components/editor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DrawerContext } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

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
  const { isMenuOpen, toggle } = useContext(DrawerContext);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 h-full">
      <div className="lg:col-span-8 relative">
        <div className="absolute inset-0 lg:overflow-y-auto lg:scrollbar-hide p-4 lg:px-6">
          <Breadcrumb className="mb-5">
            <BreadcrumbList>
              <BreadcrumbItem className="lg:hidden">
                <div
                  role="button"
                  className="flex items-center gap-2 text-primary font-semibold"
                  onClick={toggle}
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
      <div className="lg:col-span-2 relative border-l hidden lg:block">
        <div className="absolute inset-0 lg:overflow-y-auto lg:scrollbar-hide p-4">
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
