import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { API_URL_LOCAL } from "@/lib/constants";
import { Page, Post, Tag } from "@/lib/models";
import {
  buildQueryParams,
  formatAbbreviate,
  formatRelativeTimestamp,
  wordPerMinute,
} from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export const metadata: Metadata = {
  title: "Blog",
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

const getPosts = async ({ searchParams }: Props) => {
  const query = buildQueryParams({ page: searchParams["page"], limit: 10 });

  const url = `${API_URL_LOCAL}/content/posts${query}`;

  const resp = await fetch(url, {
    cache: "no-store",
  });

  return resp
    .json()
    .then((json) => json as Page<Post>)
    .catch((e) => undefined);
};

const getTags = async () => {
  const url = `${API_URL_LOCAL}/content/tags`;

  const resp = await fetch(url, {
    cache: "no-store",
  });

  return resp
    .json()
    .then((json) => json as Page<Tag>)
    .catch((e) => undefined);
};

export default async function Blogs(props: Props) {
  const blogsPromise = getPosts(props);
  const tagsPromise = getTags();

  const [blogs, tags] = await Promise.all([blogsPromise, tagsPromise]);

  const content = () => {
    if (!blogs || blogs.contents.length === 0) {
      return <Alert>No posts found</Alert>;
    }

    return blogs?.contents.map((b) => {
      return (
        <div key={b.id}>
          <div className="flex flex-col lg:flex-row gap-4">
            <Link href={`/posts/${b.slug}`}>
              <div className="aspect-w-16 aspect-h-9 w-full lg:w-[200px]">
                <Image
                  src={b.cover ?? `/images/placeholder.jpeg`}
                  alt="Cover"
                  fill
                  priority
                  sizes="50vw"
                  className="object-cover border rounded-md"
                />
              </div>
            </Link>
            <div className="flex flex-col grow">
              <Link
                href={`/posts/${b.slug}`}
                className="font-semibold text-xl line-clamp-2"
              >
                {b.title ?? "(Untitled)"}
              </Link>
              <div className="text-sm mt-1 text-muted-foreground">
                {formatRelativeTimestamp(b.publishedAt)}
                <span className="mx-2">&bull;</span>
                {`${wordPerMinute(b.wordCount)} min read`}
              </div>
              <p className="font-light mt-1">{b.excerpt}</p>
              <div className="flex-1"></div>
              <div className="flex flex-wrap gap-2 mt-4">
                {/* {b.tags?.map((t) => {
                  return (
                    <Link
                      key={t.id}
                      href={`/tags/${t.slug}`}
                      className="bg-muted rounded-full text-sm px-3 py-1"
                    >
                      {t.name}
                    </Link>
                  );
                })} */}
                <div className="bg-primary/15 text-primary rounded-full text-sm px-3 py-1">
                    {formatAbbreviate(BigInt(b.meta?.viewCount ?? 0))} views
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-5 hidden lg:block" />
        </div>
      );
    });
  };

  return (
    <>
      <div className="bg-primary dark:bg-muted/70 h-[8rem]">
        <div className="container h-full flex items-center">
          <h2 className="text-primary-foreground dark:text-foreground">
            Explore blogs
          </h2>
        </div>
      </div>
      <div className="container py-7 mb-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          <div className="xl:col-span-8 order-2 xl:order-1">
            <div className="grid grid-cols-1 gap-6">{content()}</div>
            <div className="flex justify-center mt-10 xl:mt-4">
              <Pagination
                totalPage={blogs?.totalPage ?? 0}
                currentPage={blogs?.currentPage ?? 0}
              />
            </div>
          </div>
          <div className="xl:col-span-4 order-1 xl:order-2">
            <Card>
              <CardContent className="p-4">
                <h6 className="mb-4">Tags</h6>

                <div className="flex lg:flex-wrap gap-2 overflow-x-auto scrollbar-hide">
                  {tags?.contents.map((t) => {
                    return (
                      <Link
                        key={t.id}
                        href={`/blogs/${t.slug}`}
                        className="bg-muted rounded-md text-sm px-3 py-2 text-nowrap"
                      >
                        {t.name}
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
