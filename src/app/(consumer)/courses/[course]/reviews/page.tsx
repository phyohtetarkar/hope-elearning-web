import { API_URL_LOCAL } from "@/lib/constants";
import { Course, CourseReview, Page } from "@/lib/models";
import { buildQueryParams } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CourseReviewsPage from "./course-reviews-page";

interface Props {
  params: { course: string };
  searchParams: { [key: string]: string | undefined };
}

const getCourse = async (slug: string) => {
  const url = `${API_URL_LOCAL}/content/courses/${slug}`;

  const resp = await fetch(url, {
    next: { revalidate: 10 },
  });

  if (resp.status === 204) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as Course)
    .catch((e) => undefined);
};

const getReviews = async (courseId: number, props: Props) => {
  const query = buildQueryParams({
    page: props.searchParams["page"],
    limit: 10,
  });
  const url = `${API_URL_LOCAL}/content/courses/${courseId}/reviews${query}`;

  const resp = await fetch(url);

  return resp
    .json()
    .then((json) => json as Page<CourseReview>)
    .catch((e) => undefined);
};

const getUserReview = async (courseId: number) => {
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
        description: "Reviews",
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.slug}/reviews`,
          title: course.title,
          description: "Reviews",
          images: [`${course.cover ?? ""}`, ...previousImages],
          type: "website",
        },
        twitter: {
          title: course.title,
          description: "Reviews",
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

export default async function CourseReviews(props: Props) {
  const course = await getCourse(props.params.course);

  if (!course) {
    redirect("/");
  }

  const reviewsPromise = getReviews(course.id, props);
  const userReviewPromise = getUserReview(course.id);

  const [reviews, userReview] = await Promise.all([
    reviewsPromise,
    userReviewPromise,
  ]);

  return (
    <CourseReviewsPage
      course={course}
      reviews={reviews}
      userReview={userReview}
    />
  );
}
