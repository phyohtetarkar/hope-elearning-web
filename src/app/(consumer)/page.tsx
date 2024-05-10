import { BlogGridItem } from "@/components/blog";
import { CourseGridItem } from "@/components/course";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import QuoteSwiper from "./quote-swiper";

export default function Home() {
  return (
    <>
      <div className="bg-primary">
        <div className="container py-5 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center mb-5 lg:mb-0">
              <h1 className="text-white mb-2">Welcome to [sitename]</h1>
              <div className="text-white text-opacity-75 mb-6">
                Hi, Welcome to [sitename]. Start a new career in the software
                developing industry.
              </div>
              <div className="mb-4">
                <Button
                  variant="secondary"
                  className="w-full lg:w-auto rounded-full px-6"
                  asChild
                >
                  <Link href="/browse">Browse courses</Link>
                </Button>
              </div>
            </div>
            <div className="">
              <div className="lg:ms-auto lg:max-w-[450px]">
                <div className="aspect-w-3 aspect-h-2">
                  <Image
                    src="/images/undraw_teaching.svg"
                    alt=""
                    fill
                    sizes="50vh"
                    className="drop-shadow-xl object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white px-3 border-b">
        <QuoteSwiper />
      </div>
      <div className="container py-10">
        <h3 className="mb-5">Top courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 bg-transparent">
          <CourseGridItem />
          <CourseGridItem />
          <CourseGridItem />
          <CourseGridItem />
          <CourseGridItem />
          <CourseGridItem />
        </div>

        <h3 className="mb-5">Recent posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-transparent">
          <BlogGridItem />
          <BlogGridItem excerpt />
          <BlogGridItem />
          <BlogGridItem />
        </div>
      </div>
    </>
  );
}
