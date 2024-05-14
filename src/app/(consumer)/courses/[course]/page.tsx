import { Alert } from "@/components/ui/alert";
import { API_URL_LOCAL } from "@/lib/constants";
import { Course, CourseReview, EnrolledCourse } from "@/lib/models";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { cache } from "react";
import CoursePage from "./course-page";

interface Props {
  params: { course: string };
}

const getCourse = cache(async (slug: string) => {
  const url = `${API_URL_LOCAL}/content/courses/${slug}`;

  const resp = await fetch(url, {
    cache: "no-store",
  });

  if (resp.status === 204) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as Course)
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

const checkBookmarked = async (courseId: string) => {
  const cookieStore = cookies();

  if (!cookieStore.has("access_token")) {
    return false;
  }

  const url = `${API_URL_LOCAL}/bookmarks/${courseId}/check`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!resp.ok) {
    return false;
  }

  return resp
    .json()
    .then((json) => json as boolean)
    .catch(() => false);
};

const getUserReview = async (courseId: string) => {
  const cookieStore = cookies();

  if (!cookieStore.has("access_token")) {
    return undefined;
  }

  const url = `${API_URL_LOCAL}/profile/reviews/${courseId}/me`;

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
    .then((json) => json as CourseReview)
    .catch((e) => undefined);
};

const getRelatedCourses = async (slug: string) => {
  const url = `${API_URL_LOCAL}/content/courses/${slug}/related`;

  const resp = await fetch(url);

  return resp
    .json()
    .then((json) => json as Course[])
    .catch((e) => undefined);
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const course = await getCourse(params.course);

    const previousImages = (await parent).openGraph?.images || [];

    if (course) {
      return {
        title: course.title,
        description: course.excerpt,
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.slug}`,
          title: course.title,
          description: course.excerpt,
          images: [`${course.cover ?? ""}`, ...previousImages],
          type: "website",
        },
        twitter: {
          title: course.title,
          description: course.excerpt,
          card: "summary_large_image",
          images: [`${course.cover ?? ""}`, ...previousImages],
        },
      };
    }
  } catch (error) {}

  return {
    title: "Course not found",
  };
}

export default async function CourseDetail({ params }: Props) {
  const course = await getCourse(params.course);

  if (!course) {
    return (
      <div className="container py-5">
        <Alert>Course not found</Alert>
      </div>
    );
  }

  const enrolledCoursePromise = getEnrolledCourse(course.id);
  const checkBookmarkedPromise = checkBookmarked(course.id);
  const userReviewPromise = getUserReview(course.id);
  const relatedCoursesPromise = getRelatedCourses(params.course);

  const [enrolledCourse, isBookmarked, userReview, relatedCourses] =
    await Promise.all([
      enrolledCoursePromise,
      checkBookmarkedPromise,
      userReviewPromise,
      relatedCoursesPromise,
    ]);

  return (
    <CoursePage
      course={course}
      enrolledCourse={enrolledCourse}
      isBookmarked={isBookmarked}
      review={userReview}
      relatedCourses={relatedCourses}
    />
  );
}
