import { BlogGridItem } from "@/components/blog";
import { Alert } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Pagination from "@/components/ui/pagination";
import { API_URL_LOCAL } from "@/lib/constants";
import { Page, Post, Tag } from "@/lib/models";
import { buildQueryParams, pluralize } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}

const getTag = async (slug: string) => {
  const url = `${API_URL_LOCAL}/content/tags/${slug}`;

  const resp = await fetch(url, {
    next: { revalidate: 10 },
  });

  if (!resp.ok || resp.status === 204) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as Tag)
    .catch((e) => undefined);
};

const getPosts = async (tagId: number, page?: string) => {
  const query = buildQueryParams({
    tag: tagId,
    page: page,
    limit: 15,
  });

  const url = `${API_URL_LOCAL}/content/posts${query}`;

  const resp = await fetch(url, {
    next: { revalidate: 10 },
  });

  return resp
    .json()
    .then((json) => json as Page<Post>)
    .catch((e) => undefined);
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const tag = await getTag(params.slug);

    const previousImages = (await parent).openGraph?.images || [];

    if (tag) {
      const title = `Tags | ${tag.name}`;
      const desc = pluralize(Number(tag.postCount ?? 0), "post");
      return {
        title: title,
        description: desc,
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/tags/${tag.slug}`,
          title: title,
          description: desc,
          images: [...previousImages],
          type: "website",
        },
        twitter: {
          title: title,
          description: desc,
          card: "summary_large_image",
          images: [...previousImages],
        },
      };
    }
  } catch (error) {}

  return {
    title: "Category not found",
  };
}

export default async function Topic(props: Props) {
  const tag = await getTag(props.params.slug);

  if (!tag) {
    redirect("/blogs");
  }

  const posts = await getPosts(tag.id, props.searchParams["page"]);

  const content = () => {
    if (!posts?.contents.length) {
      return <Alert>No posts found</Alert>;
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.contents.map((p) => {
            return <BlogGridItem key={p.id} data={p} />;
          })}
        </div>

        <div className="flex justify-center lg:justify-end mt-10 xl:mt-8">
          <Pagination
            totalPage={posts?.totalPage ?? 0}
            currentPage={posts?.currentPage ?? 0}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="bg-primary h-[5rem]">
        <div className="container h-full flex items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-base text-primary-foreground/70 hover:text-primary-foreground"
                  asChild
                >
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/70" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-base text-primary-foreground/70 hover:text-primary-foreground"
                  asChild
                >
                  <Link href="/blogs">Blogs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/70" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base text-nowrap text-primary-foreground">
                  {tag.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="container py-5 mb-10">{content()}</div>
    </>
  );
}
