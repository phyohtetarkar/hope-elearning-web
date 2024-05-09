import { ContentRenderer } from "@/components/editor";
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
import { API_URL_LOCAL } from "@/lib/constants";
import { Lesson } from "@/lib/models";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: { course: string; lesson: string };
}

const getLesson = async (slug: string) => {
  const url = `${API_URL_LOCAL}/content/lessons/${slug}/trial`;

  const resp = await fetch(url);

  if (resp.status === 204) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as Lesson)
    .catch((e) => undefined);
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const lesson = await getLesson(params.lesson);

    const course = lesson?.course;

    const previousImages = (await parent).openGraph?.images || [];

    if (course) {
      return {
        title: course.title,
        description: lesson.title,
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.slug}/${lesson.slug}`,
          title: course.title,
          description: lesson.title,
          images: [`${course.cover ?? ""}`, ...previousImages],
          type: "website",
        },
        twitter: {
          title: course.title,
          description: lesson.title,
          card: "summary_large_image",
          images: [`${course.cover ?? ""}`, ...previousImages],
        },
      };
    }
  } catch (error) {}

  return {
    title: "Lesson not found",
  };
}

export default async function LessonDetail({ params }: Props) {
  const lesson = await getLesson(params.lesson);

  if (!lesson) {
    redirect(`/courses/${params.course}`);
  }

  if (!lesson.trial) {
    redirect(`/courses/${params.course}`);
  }

  return (
    <div className="container max-w-3xl py-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/courses/${lesson.course?.slug}`}>
                {lesson.course?.title}
              </Link>
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
          src={lesson.course?.cover ?? "/images/placeholder.jpeg"}
          className="object-cover rounded-md"
          alt="Cover"
          fill
          sizes="100vh"
          priority
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3>{lesson.title}</h3>

        <Button>Enroll course</Button>
      </div>
      <Separator className="mt-4 mb-8" />
      <ContentRenderer lexical={lesson.lexical} />
      <div className="h-16"></div>
    </div>
  );
}
