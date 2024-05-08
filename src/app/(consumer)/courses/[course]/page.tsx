import { Alert } from "@/components/ui/alert";
import { API_URL_LOCAL } from "@/lib/constants";
import { Course } from "@/lib/models";
import { Metadata, ResolvingMetadata } from "next";
import CoursePage from "./course-page";

interface Props {
  params: { course: string };
}

const getCourse = async (slug: string) => {
  const url = `${API_URL_LOCAL}/content/courses/${slug}`;

  const resp = await fetch(url);

  if (resp.status === 204) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as Course)
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
  return <CoursePage course={course} />;
}
