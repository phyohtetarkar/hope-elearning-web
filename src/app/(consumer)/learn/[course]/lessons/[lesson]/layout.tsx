import { DrawerBackdrop, DrawerContextProvider } from "@/components/ui/drawer";
import { API_URL_LOCAL } from "@/lib/constants";
import { Course, EnrolledCourse } from "@/lib/models";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CourseMenu from "./course-menu";

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

const getEnrolledCourse = async (courseId: string) => {
  const cookieStore = cookies();
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

interface Props {
  params: { course: string };
  children: React.ReactNode;
}

export default async function ResumeCourseLayout({ params, children }: Props) {
  const course = await getCourse(params.course);

  if (!course) {
    redirect("/profile/learnings");
  }

  const enrolledCourse = await getEnrolledCourse(course.id);

  if (!enrolledCourse) {
    redirect("/profile/learnings");
  }

  return (
    <DrawerContextProvider>
      <div className="flex h-full">
        <CourseMenu course={course} enrolledCourse={enrolledCourse} />
        <div className="grow">{children}</div>
        <DrawerBackdrop />
      </div>
    </DrawerContextProvider>
  );
}