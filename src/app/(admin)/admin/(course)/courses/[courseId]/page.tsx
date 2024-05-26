import { API_URL_LOCAL } from "@/lib/constants";
import { Course } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import CourseEditPage from "./course-edit-page";

const getCourse = async (courseId: string) => {
  const url = `${API_URL_LOCAL}/admin/courses/${courseId}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  if (resp.status === 204) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as Course)
    .catch((e) => undefined);
};

export default async function CourseEdit({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await getCourse(params.courseId);

  if (!course) {
    notFound();
  }

  // const categoriesPromise = getCategories();
  // const authorsPromise = getAuthors();

  // const [categories, authors] = await Promise.all([
  //   categoriesPromise,
  //   authorsPromise,
  // ]);

  return <CourseEditPage course={course} />;
}
