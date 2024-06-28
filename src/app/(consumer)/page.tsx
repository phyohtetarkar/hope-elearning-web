import { BlogGridItem } from "@/components/blog";
import { CourseGridItem } from "@/components/course";
import { Button } from "@/components/ui/button";
import { API_URL_LOCAL } from "@/lib/constants";
import { Course, Page, Post } from "@/lib/models";
import { buildQueryParams } from "@/lib/utils";
import Link from "next/link";
import BannerImage from "./banner-image";
import QuoteSwiper from "./quote-swiper";

const getTopCourses = async () => {
  const query = buildQueryParams({ limit: 8, orderBy: "enrollment" });

  const url = `${API_URL_LOCAL}/content/courses${query}`;

  const resp = await fetch(url, {
    cache: "no-store",
  });

  return resp
    .json()
    .then((json) => json as Page<Course>)
    .catch((e) => undefined);
};

const getRecentPosts = async () => {
  const query = buildQueryParams({ limit: 4, orderBy: "publishedAt" });

  const url = `${API_URL_LOCAL}/content/posts${query}`;

  const resp = await fetch(url, {
    cache: "no-store",
  });

  return resp
    .json()
    .then((json) => json as Page<Post>)
    .catch((e) => undefined);
};

export default async function Home() {
  const topCoursesPromise = getTopCourses();
  const recentPostsPromise = getRecentPosts();

  const [topCourses, recentPosts] = await Promise.all([
    topCoursesPromise,
    recentPostsPromise,
  ]);

  const topCoursesUI = (list: Course[]) => {
    if (list.length === 0) {
      return <p className="text-muted-foreground mb-5">No content found</p>;
    }

    return list.map((c) => {
      return <CourseGridItem key={c.id} data={c} />;
    });
  };

  const recentPostsUI = (list: Post[]) => {
    if (list.length === 0) {
      return <p className="text-muted-foreground mb-5">No content found</p>;
    }

    return list.map((p) => {
      return <BlogGridItem key={p.id} data={p} />;
    });
  };

  return (
    <>
      <div className="bg-primary dark:bg-muted/70">
        <div className="container py-5 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center mb-5 lg:mb-0">
              <h1 className="text-primary-foreground dark:text-foreground mb-2">
                Welcome to [sitename]
              </h1>
              <div className="text-primary-foreground/75 dark:text-foreground/75 mb-6">
                Hi, Welcome to [sitename]. Start a new career in the software
                developing industry.
              </div>
              <div className="mb-4">
                <Button
                  variant="secondary"
                  className="w-full lg:w-auto rounded-full px-6 dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground shadow"
                  asChild
                >
                  <Link href="/browse">Browse courses</Link>
                </Button>
              </div>
            </div>
            <div className="">
              <div className="lg:ms-auto lg:max-w-[450px]">
                <div className="aspect-w-3 aspect-h-2 z-0">
                  <BannerImage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 border-b">
        <QuoteSwiper />
      </div>
      <div className="container py-10">
        <h3 className="mb-5">Top courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 bg-transparent">
          {topCoursesUI(topCourses?.contents ?? [])}
        </div>

        <h3 className="mb-5">Recent posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-transparent">
          {recentPostsUI(recentPosts?.contents ?? [])}
        </div>
      </div>
    </>
  );
}
