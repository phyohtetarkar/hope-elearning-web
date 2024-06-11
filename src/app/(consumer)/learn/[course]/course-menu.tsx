"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DrawerContext } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { Course, EnrolledCourse, Lesson } from "@/lib/models";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext } from "react";

export default function CourseMenu({
  course,
  enrolledCourse,
}: {
  course: Course;
  enrolledCourse: EnrolledCourse;
}) {
  const { isMenuOpen, toggle } = useContext(DrawerContext);

  const params = useParams<{ course: string; lesson: string }>();

  const isCompleted = (lesson: Lesson) => {
    return (
      enrolledCourse.completedLessons?.some((v) => v === lesson.id) ?? false
    );
  };

  return (
    <div
      className={`${
        isMenuOpen ? "translate-x-0" : `-translate-x-[360px]`
      } transition-transform ease-out min-w-[200px] max-w-[360px] lg:max-w-[320px] fixed lg:static inset-y-0 w-full z-50 flex flex-col lg:translate-x-0`}
    >
      <div className="flex flex-col grow py-4 overflow-y-auto scrollbar-custom bg-muted mr-[40px] lg:mr-0 border-r">
        <h5 className="mb-5 px-4">{course.title}</h5>

        <div className="text-sm text-muted-foreground mb-1 px-4">
          {enrolledCourse.progress}% completed
        </div>
        <div className="px-4">
          <Progress
            value={enrolledCourse.progress}
            max={100}
            className="h-3 mb-8 flex-shrink-0"
            indicatorClass="bg-success"
          />
        </div>

        <Accordion
          type="multiple"
          className="flex flex-col gap-2"
          defaultValue={["chapter-0", "chapter-1", "chapter-2"]}
        >
          {course.chapters?.map((c, i) => {
            return (
              <AccordionItem key={i} value={`chapter-${i}`}>
                <AccordionTrigger className="py-2 px-4">
                  <h6>{c.title}</h6>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col">
                    {c.lessons?.map((l, i) => {
                      return (
                        <div
                          key={i}
                          className={cn(
                            "flex items-center space-x-2 py-3 px-4",
                            params.lesson === l.slug
                              ? "bg-primary/15"
                              : undefined
                          )}
                        >
                          {isCompleted(l) ? (
                            <CheckCircle className="text-success size-5 flex-shrink-0" />
                          ) : (
                            <Circle className="text-muted-foreground/50 size-5 flex-shrink-0" />
                          )}
                          <Link
                            href={`/learn/${course.slug}/lessons/${l.slug}`}
                            className={cn(
                              "hover:text-primary grow",
                              params.lesson === l.slug
                                ? "text-primary"
                                : undefined
                            )}
                            onClick={(evt) => {
                              isMenuOpen && toggle?.();
                            }}
                          >
                            {l.title}
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
        <X className="text-muted-foreground hover:text-white m-auto" />
      </button>
    </div>
  );
}
