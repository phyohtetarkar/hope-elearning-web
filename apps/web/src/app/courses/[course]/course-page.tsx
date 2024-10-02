"use client";

import { CourseGridItem } from "@/components/course";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardContent,
  ProfileAvatar,
  Rating,
  Separator,
  TabItem,
  Tabs,
} from "@elearning/ui";
import { Course, CourseReview, EnrolledCourse } from "@elearning/lib/models";
import { formatNumber, uppercaseFirstChar } from "@elearning/lib/utils";
import {
  BarChart,
  BookOpen,
  DollarSign,
  FolderClosed,
  LockKeyhole,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BookmarkCourseButton from "./bookmark-course-button";
import CourseReviewEdit from "./course-review-edit";
import EnrollCourseButton from "./enroll-course-button";

interface CoursePageProps {
  course: Course;
  enrolledCourse?: EnrolledCourse;
  isBookmarked: boolean;
  review?: CourseReview;
  relatedCourses?: Course[];
}

export default function CoursePage({
  course,
  enrolledCourse,
  isBookmarked,
  review,
  relatedCourses,
}: CoursePageProps) {
  return (
    <>
      <div className="bg-primary dark:bg-muted/70 py-6 lg:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="flex flex-col lg:col-span-8 order-2 lg:order-1">
              {/* <Link
                href={`/categories/${course.category?.slug}`}
                className="text-sm text-primary-foreground/70 underline ps-0.5 mb-1"
              >
                {course.category?.name}
              </Link> */}
              <h2 className="text-primary-foreground dark:text-foreground mb-5">
                {course.title}
              </h2>
              <p className="text-primary-foreground dark:text-foreground font-light mb-5">
                {course.excerpt}
              </p>
              <div className="flex flex-wrap gap-4 text-primary-foreground/75 dark:text-foreground/70">
                <div className="flex items-center">
                  <Users className="size-4" />
                  <span className="ms-1 text-sm">
                    {formatNumber(BigInt(course.meta?.enrolledCount ?? 0))}
                    &nbsp; Enrolled
                  </span>
                </div>

                <div className="flex items-center">
                  <BarChart className="size-4" />
                  <span className="ms-1 text-sm">
                    {uppercaseFirstChar(course.level)}
                  </span>
                </div>

                <div className="flex items-center">
                  <Rating rating={Number(course.meta?.rating ?? 0)} size="sm" />
                  <Link
                    href={`/courses/${course.slug}/reviews`}
                    className="ms-1 text-sm underline"
                  >
                    ({formatNumber(BigInt(course.meta?.ratingCount ?? 0))}
                    &nbsp;reviews)
                  </Link>
                </div>
              </div>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 drop-shadow-xl rounded-md lg:col-span-4 order-1 lg:order-2">
              <Image
                src={course.cover ?? "/images/placeholder.jpeg"}
                className="object-cover p-1"
                alt="Cover"
                fill
                sizes="50vh"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="bg-background rounded-md border">
              <Tabs defaultTabKey="description">
                <TabItem tabKey="description" title="Description">
                  <div className="p-4">
                    <article
                      className="prose dark:prose-invert prose-headings:mt-0 max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: course.description ?? "",
                      }}
                    ></article>
                  </div>
                </TabItem>
                <TabItem tabKey="syllabus" title="Syllabus">
                  <Accordion
                    type="multiple"
                    className="p-4 flex flex-col gap-2"
                  >
                    {course.chapters?.map((c, i) => {
                      return (
                        <AccordionItem key={i} value={`chapter-${i}`}>
                          <AccordionTrigger className="bg-muted dark:bg-muted/50 border rounded-md px-2">
                            <h6>{c.title}</h6>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col divide-y">
                              {c.lessons?.map((l, i) => {
                                if (l.trial) {
                                  return (
                                    <div
                                      key={i}
                                      className="flex items-center gap-2 py-4 px-2"
                                    >
                                      <div className="text-base">{l.title}</div>
                                      <Link
                                        href={`/courses/${course.slug}/lessons/${l.slug}`}
                                        className="ms-auto text-primary underline"
                                      >
                                        Preview
                                      </Link>
                                    </div>
                                  );
                                }
                                return (
                                  <div
                                    key={i}
                                    className="flex items-center gap-2 py-3 px-2"
                                  >
                                    <div className="text-base">{l.title}</div>
                                    <LockKeyhole className="text-muted-foreground size-5 ms-auto" />
                                  </div>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </TabItem>
              </Tabs>
            </div>

            <div className="mt-4">
              <CourseReviewEdit course={course} review={review} />
            </div>
          </div>
          <div className="lg:col-span-4 order-1 lg:order-2">
            <Card className="shadow-none">
              <CardContent className="p-4 flex flex-col">
                <div className="flex gap-2 items-center justify-between mb-7">
                  <h3 className="fw-bold">
                    {uppercaseFirstChar(course.access)}
                  </h3>
                  {/* <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="default" size="icon">
                          <Share2 className="text-gray-600 size-5" />
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent>Share this course</TooltipContent>
                    </Tooltip>
                  </TooltipProvider> */}
                </div>
                {enrolledCourse ? (
                  <Button asChild>
                    {enrolledCourse.resumeLesson?.slug ? (
                      <Link
                        href={`/learn/${course.slug}/lessons/${enrolledCourse.resumeLesson.slug}`}
                      >
                        Resume course
                      </Link>
                    ) : (
                      <Link href={`/learn/${course.slug}`}>Resume course</Link>
                    )}
                  </Button>
                ) : (
                  <EnrollCourseButton
                    course={course}
                    revalidate={`/courses/${course.slug}`}
                  >
                    Enroll
                  </EnrollCourseButton>
                )}

                <BookmarkCourseButton
                  course={course}
                  isBookmarked={isBookmarked}
                  revalidate={`/courses/${course.slug}`}
                  className="mt-2"
                />

                <Separator className="my-5" />

                <h4 className="fw-bold mb-4">Information</h4>
                <div className="flex items-center mb-3">
                  <BookOpen className="size-4 text-primary flex-shrink-0" />
                  <span className="ms-1.5">Chapters</span>
                  <span className="ms-auto text-muted-foreground">
                    {course.chapters?.length ?? 0}
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  <BarChart className="size-4 text-primary flex-shrink-0" />
                  <span className="ms-1.5">Level</span>
                  <span className="ms-auto text-muted-foreground">
                    {uppercaseFirstChar(course.level)}
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  <FolderClosed className="size-4 text-primary flex-shrink-0" />
                  <span className="ms-1.5">Category</span>
                  <Link
                    href={`/categories/${course.category?.slug}`}
                    className="ms-auto text-primary underline"
                  >
                    {course.category?.name}
                  </Link>
                </div>
                <div className="flex items-center">
                  <DollarSign className="size-4 text-primary flex-shrink-0" />
                  <span className="ms-1.5">Access</span>
                  <span className="ms-auto text-muted-foreground">
                    {uppercaseFirstChar(course.access)}
                  </span>
                </div>

                <Separator className="my-5" />

                <h4 className="fw-bold mb-4">Creators</h4>
                <div className="flex flex-col space-y-3">
                  {course.authors?.map((a, i) => {
                    return (
                      <div key={i} className="flex items-center space-x-3">
                        <ProfileAvatar
                          src={a?.image}
                          prefix={a?.nickname.substring(0, 2)}
                          className="size-[54px]"
                        />
                        <h6>{a.nickname}</h6>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <h3 className="mb-4">Related courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-transparent">
          {relatedCourses?.map((c) => {
            return <CourseGridItem key={c.id} data={c} />;
          })}
        </div>
      </div>
    </>
  );
}
