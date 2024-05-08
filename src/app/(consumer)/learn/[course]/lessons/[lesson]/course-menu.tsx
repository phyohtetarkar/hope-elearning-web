"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DrawerContext } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, X } from "lucide-react";
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

export default function CourseMenu() {
  const { isMenuOpen, toggle } = useContext(DrawerContext);

  return (
    <div
      className={`${
        isMenuOpen ? "translate-x-0" : `-translate-x-[360px]`
      } transition-transform ease-out min-w-[200px] max-w-[360px] lg:max-w-[320px] fixed lg:static inset-y-0 w-full z-50 flex flex-col lg:translate-x-0`}
    >
      <div className="flex flex-col grow p-4 overflow-y-auto scrollbar-custom bg-white mr-[40px] lg:mr-0 border-r">
        <h5 className="mb-5">Getting started with docker</h5>

        <div className="text-sm text-sliver mb-1">50% completed</div>
        <Progress
          value={50}
          max={100}
          className="h-3 mb-8 flex-shrink-0"
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
                        <div key={i} className="flex items-center gap-2 py-3">
                          <CheckCircle className="text-success size-5" />
                          <Link
                            href={`/learn/docker/lessons/lesson-1`}
                            className="hover:text-primary"
                            onClick={(evt) => {
                              isMenuOpen && toggle?.();
                            }}
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

      <button
        className="fixed top-0 right-0 size-[40px] lg:hidden"
        onClick={toggle}
      >
        <X className="text-sliver hover:text-white m-auto" />
      </button>
    </div>
  );
}
