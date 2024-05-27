import { CourseGridItem } from "@/components/course";
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
import { Category, Course, Page } from "@/lib/models";
import { buildQueryParams, pluralize } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}

const getCategory = async (slug: string) => {
  const url = `${API_URL_LOCAL}/content/categories/${slug}`;

  const resp = await fetch(url, {
    next: { revalidate: 10 },
  });

  if (!resp.ok || resp.status === 204) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as Category)
    .catch((e) => undefined);
};

const getCourses = async (category: string, page?: string) => {
  const query = buildQueryParams({
    category: category,
    page: page,
    limit: 15,
  });

  const url = `${API_URL_LOCAL}/content/courses${query}`;

  const resp = await fetch(url, {
    next: { revalidate: 10 },
  });

  return resp
    .json()
    .then((json) => json as Page<Course>)
    .catch((e) => undefined);
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const category = await getCategory(params.slug);

    const previousImages = (await parent).openGraph?.images || [];

    if (category) {
      const title = `Categories | ${category.name}`;
      const desc = process.env.NEXT_PUBLIC_APP_DESC;
      return {
        title: title,
        description: desc,
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category.slug}`,
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
  const category = await getCategory(props.params.slug);

  if (!category) {
    redirect("/categories");
  }

  const courses = await getCourses(category.slug, props.searchParams["page"]);

  const content = () => {
    if (!courses?.contents.length) {
      return <Alert>No courses found</Alert>;
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.contents.map((c) => {
            return <CourseGridItem key={c.id} data={c} />;
          })}
        </div>

        <div className="flex justify-center lg:justify-end mt-10 xl:mt-8">
          <Pagination
            totalPage={courses?.totalPage ?? 0}
            currentPage={courses?.currentPage ?? 0}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="bg-primary dark:bg-muted/70 h-[5rem]">
        <div className="container h-full flex items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-base text-primary-foreground/70 hover:text-primary-foreground dark:text-foreground/70 hover:dark:text-foreground"
                  asChild
                >
                  <Link href="/browse">Browse</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/70 dark:text-foreground/70" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-base text-primary-foreground/70 hover:text-primary-foreground dark:text-foreground/70 hover:dark:text-foreground"
                  asChild
                >
                  <Link href="/categories">Categories</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/70 dark:text-foreground/70" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base text-nowrap text-primary-foreground dark:text-foreground">
                  {category.name}
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
