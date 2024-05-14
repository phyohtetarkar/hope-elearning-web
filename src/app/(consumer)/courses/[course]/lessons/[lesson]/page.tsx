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
import { EnrolledCourse, Lesson } from "@/lib/models";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache } from "react";
import EnrollCourseButton from "../../enroll-course-button";

interface Props {
  params: { course: string; lesson: string };
}

const getLesson = cache(async (slug: string) => {
  const url = `${API_URL_LOCAL}/content/lessons/${slug}/trial`;

  const resp = await fetch(url, {
    cache: "no-store",
  });

  if (resp.status === 204) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as Lesson)
    .catch((e) => undefined);
});

const getEnrolledCourse = async (courseId: string) => {
  const cookieStore = cookies();

  if (!cookieStore.has("access_token")) {
    return undefined;
  }

  const url = `${API_URL_LOCAL}/enrollments/${courseId}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!resp.ok) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as EnrolledCourse)
    .catch(() => undefined);
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

  const enrolledCourse = await getEnrolledCourse(lesson.courseId);

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

        {enrolledCourse ? (
          <Button asChild>
            {enrolledCourse.resumeLesson?.slug ? (
              <Link
                href={`/learn/${enrolledCourse.course.slug}/lessons/${enrolledCourse.resumeLesson.slug}`}
              >
                Resume course
              </Link>
            ) : (
              <Link href={`/learn/${lesson.course?.slug}`}>Resume course</Link>
            )}
          </Button>
        ) : (
          <EnrollCourseButton
            course={lesson.course}
            revalidate={`/courses/${params.course}/lessons/${params.lesson}`}
          >
            Enroll course
          </EnrollCourseButton>
        )}
      </div>
      <Separator className="mt-4 mb-8" />
      <ContentRenderer lexical={lesson.lexical} />
      <div className="h-16"></div>
    </div>
  );
}
