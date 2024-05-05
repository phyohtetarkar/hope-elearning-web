import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Rating from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function CourseReviews() {
  return (
    <div className="container max-w-3xl py-6">
      <h2 className="mb-1">Getting started with docker</h2>
      <Breadcrumb className="mb-5 ms-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/courses/docker`}>Getting started with docker</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-nowrap">Reviews</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-5 py-5">
        <div className="flex items-start gap-3">
          <Image
            src="/images/profile.png"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h6 className="font-semibold mb-1">Naing</h6>
            <span className="text-sm text-gray-500 mb-5">May 5,2024</span>
            <Rating rating={4.5} size="lg" />
            <p className="text-gray-500 mt-5">
              The online platform used for the course was user-friendly and easy
              to navigate, making it convenient to access lectures and
              materials.The assignments were practical and relevant, allowing me
              to apply what I learned in real-world scenarios.
            </p>
            <Separator className="mt-7 mb-7" />
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Image
            src="/images/profile.png"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h6 className="font-semibold mb-1">Hector Gibbons</h6>
            <span className="text-sm text-gray-500 mb-5">May 5,2024</span>
            <Rating rating={4} size="lg" />
            <p className="text-gray-500 mt-5">
              The course content was engaging and kept me interested throughout.
              I never felt bored or disinterested during the lectures.
            </p>
            <Separator className="mt-7 mb-7" />
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Image
            src="/images/profile.png"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h6 className="font-semibold mb-1">Mark Edwards</h6>
            <span className="text-sm text-gray-500 mb-5">May 5,2024</span>
            <Rating rating={5} size="lg" />
            <p className="text-gray-500 mt-5">
              The course provided valuable insights and practical skills that I
              can apply in my personal or professional life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
