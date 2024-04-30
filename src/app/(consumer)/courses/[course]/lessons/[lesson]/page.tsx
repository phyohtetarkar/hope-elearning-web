import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function Lesson({
  params,
}: {
  params: { course: string; lesson: string };
}) {
  return (
    <div className="container max-w-3xl py-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/courses/docker`}>Getting started with docker</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-nowrap">Preview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="aspect-w-16 aspect-h-9 mb-6">
        <Image
          src="/images/course.jpg"
          className="object-cover rounded-md"
          alt="Cover"
          fill
          sizes="100vh"
          priority
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3>Introduction</h3>

        <Button>Enroll course</Button>
      </div>
      <Separator className="my-4" />
      <div></div>
    </div>
  );
}
