import { API_URL_LOCAL } from "@/lib/constants";
import { Course, EnrolledCourse } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

const getEnrolledCourse = async (courseId: string) => {
  const cookieStore = cookies();
  const url = `${API_URL_LOCAL}/enrollments/${courseId}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  validateResponse(resp);

  return resp
    .json()
    .then((json) => json as EnrolledCourse)
    .catch(() => undefined);
};

export default async function EnrolledCourse({
  params,
}: {
  params: { course: string };
}) {
  const course = await getCourse(params.course);

  if (!course) {
    redirect("/profile/learnings");
  }

  const enrolledCourse = await getEnrolledCourse(course.id);

  if (!enrolledCourse) {
    redirect("/profile/learnings");
  }

  if (enrolledCourse.resumeLesson) {
    redirect(
      `/learn/${params.course}/lessons/${enrolledCourse.resumeLesson.slug}`
    );
  }

  const firstLesson = course.chapters?.[0].lessons?.[0];

  if (!firstLesson) {
    redirect("/profile/learnings");
  }

  redirect(`/learn/${params.course}/lessons/${firstLesson.slug}`);
}
