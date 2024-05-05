import { API_URL } from "@/lib/constants";
import { Category, Course, Page, User } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CourseEditPage from "./course-edit-page";

const getCourse = async (courseId: string) => {
  const url = `${API_URL}/admin/courses/${courseId}`;

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

const getCategories = async () => {
  const url = `${API_URL}/admin/categories`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<Category>;
};

const getAuthors = async () => {
  const url = `${API_URL}/admin/users?staffOnly=true`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<User>;
};

export default async function CourseEdit({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await getCourse(params.courseId);

  if (!course) {
    redirect("/admin/courses");
  }

  // const categoriesPromise = getCategories();
  // const authorsPromise = getAuthors();

  // const [categories, authors] = await Promise.all([
  //   categoriesPromise,
  //   authorsPromise,
  // ]);

  return <CourseEditPage course={course} />;
}
