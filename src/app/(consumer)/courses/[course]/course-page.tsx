"use client";

import { CourseGridItem } from "@/components/course";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { TabItem, Tabs } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart,
  BookOpen,
  DollarSign,
  FolderClosed,
  LockKeyhole,
  Share2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CourseReviewEdit from "./course-review-edit";

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

export default function CoursePage() {
  return (
    <>
      <div className="bg-primary py-6 lg:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="flex flex-col lg:col-span-8 order-2 lg:order-1">
              <Link
                href={`/categories/dev-ops`}
                className="text-sm text-primary-foreground underline px-1 mb-1"
              >
                DevOps
              </Link>
              <h2 className="text-primary-foreground mb-5">
                Getting started with docker
              </h2>
              <p className="text-primary-foreground font-light mb-5">
                Docker is an open platform for developing, shipping, and running
                applications. Docker enables you to separate your applications
                from your infrastructure so you can deliver software quickly.
                With Docker, you can manage your infrastructure in the same ways
                you manage your applications.
              </p>
              <div className="flex flex-wrap gap-4 text-primary-foreground/80">
                <div className="flex items-center">
                  <Users className="size-4" />
                  <span className="ms-1 text-sm">1,000 Enrolled</span>
                </div>

                <div className="flex items-center">
                  <BarChart className="size-4" />
                  <span className="ms-1 text-sm">Beginner</span>
                </div>

                <div className="flex items-center">
                  <Rating rating={4.5} size="sm" />
                  <Link
                    href={`/courses/docker/reviews`}
                    className="ms-1 text-sm underline"
                  >
                    (1,000 reviews)
                  </Link>
                </div>
              </div>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-white rounded-md lg:col-span-4 order-1 lg:order-2">
              <Image
                src="/images/course.jpg"
                className="object-cover p-1"
                alt="Cover"
                fill
                sizes="100vh"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="bg-white rounded-md border">
              <Tabs defaultTabKey="description">
                <TabItem tabKey="description" title="Description">
                  <div className="p-4">
                    <article
                      className="prose prose-headings:mt-0 max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: `<div>
<h3>Course Descriptions</h3>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac turpis egestas integer eget aliquet. Ultricies tristique nulla aliquet enim. Ut lectus arcu bibendum at varius vel. Tempus egestas sed sed risus pretium quam vulputate dignissim.</p>
<p>Ipsum nunc aliquet bibendum enim facilisis. Ut sem nulla pharetra diam sit amet nisl suscipit. Mauris a diam maecenas sed enim ut sem viverra aliquet. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Vitae turpis massa sed elementum tempus egestas. Sed vulputate odio ut enim blandit volutpat maecenas.</p>
</div>
<h4>What you&rsquo;ll learn</h4>
<ul style="list-style-type: circle;">
<li style="line-height: 1.5;">Recognize the importance of understanding your objectives when addressing an audience.</li>
<li style="line-height: 1.5;">Identify the fundaments of composing a successful close.</li>
<li style="line-height: 1.5;">Explore how to connect with your audience through crafting compelling stories.</li>
<li style="line-height: 1.5;">Examine ways to connect with your audience by personalizing your content.</li>
<li style="line-height: 1.5;">Break down the best ways to exude executive presence.</li>
<li style="line-height: 1.5;">Explore how to communicate the unknown in an impromptu communication.</li>
</ul>
<p>Maecenas viverra condimentum nulla molestie condimentum. Nunc ex libero, feugiat quis lectus vel, ornare euismod ligula. Aenean sit amet arcu nulla.</p>
<p>Duis facilisis ex a urna blandit ultricies. Nullam sagittis ligula non eros semper, nec mattis odio ullamcorper. Phasellus feugiat sit amet leo eget consectetur.</p>`,
                      }}
                    ></article>
                  </div>
                </TabItem>
                <TabItem tabKey="curriculum" title="Curriculum">
                  <Accordion
                    type="multiple"
                    className="p-4 flex flex-col gap-2"
                  >
                    {curriculum.map((c, i) => {
                      return (
                        <AccordionItem key={i} value={`chapter-${i}`}>
                          <AccordionTrigger className="bg-gray-100 rounded-md px-2">
                            <h6>{c.name}</h6>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col divide-y">
                              {c.lessons.map((l, i) => {
                                if (l.trial) {
                                  return (
                                    <div
                                      key={i}
                                      className="flex items-center gap-2 py-3 px-2"
                                    >
                                      <h6 className="text-sm">{l.name}</h6>
                                      <Link
                                        href={`/courses/docker/lessons/lesson-1`}
                                        className="ms-auto text-anchor underline"
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
                                    <h6 className="text-sm">{l.name}</h6>
                                    <LockKeyhole className="text-sliver size-5 ms-auto" />
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
              <CourseReviewEdit />
            </div>
          </div>
          <div className="lg:col-span-4 order-1 lg:order-2">
            <Card className="shadow-none">
              <CardContent className="p-4 flex flex-col">
                <div className="flex gap-2 items-center justify-between mb-4">
                  <h3 className="fw-bold">Free</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="default" size="icon">
                          <Share2 className="text-gray-600 size-5" />
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent>Share this course</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Button className="mb-2">Enroll</Button>
                <Button variant="outline">Bookmark</Button>

                <Separator className="my-5" />

                <h4 className="fw-bold mb-4">Information</h4>
                <div className="flex items-center mb-3">
                  <BookOpen className="size-4 text-primary flex-shrink-0" />
                  <span className="ms-1.5">Chapters</span>
                  <span className="ms-auto text-sliver">10</span>
                </div>
                <div className="flex items-center mb-3">
                  <BarChart className="size-4 text-primary flex-shrink-0" />
                  <span className="ms-1.5">Level</span>
                  <span className="ms-auto text-sliver">Beginner</span>
                </div>
                <div className="flex items-center mb-3">
                  <FolderClosed className="size-4 text-primary flex-shrink-0" />
                  <span className="ms-1.5">Category</span>
                  <Link
                    href={`/categories/dev-ops`}
                    className="ms-auto text-anchor underline"
                  >
                    DevOps
                  </Link>
                </div>
                <div className="flex items-center">
                  <DollarSign className="size-4 text-primary flex-shrink-0" />
                  <span className="ms-1.5">Access</span>
                  <span className="ms-auto text-sliver">Free</span>
                </div>

                <Separator className="my-5" />

                <h4 className="fw-bold mb-4">Authors</h4>
                <div className="flex items-center gap-2">
                  <Image
                    alt="Profile"
                    src={"/images/profile.png"}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <h6>John Doe</h6>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <h3 className="mb-4">Related courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-transparent">
          <CourseGridItem />
          <CourseGridItem />
          <CourseGridItem />
          <CourseGridItem />
        </div>
      </div>
    </>
  );
}
