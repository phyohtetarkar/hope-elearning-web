import { DrawerBackdrop, DrawerContextProvider } from "@/components/ui/drawer";
import { API_URL_LOCAL } from "@/lib/constants";
import { Course, EnrolledCourse } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CourseMenu from "./course-menu";

interface Props {
  params: { course: string };
  children: React.ReactNode;
}

const getCourse = async (slug: string) => {
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
};

const getEnrolledCourse = async (courseId: number) => {
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
      <div className="lg:fixed lg:inset-0 lg:top-[65px] flex z-50">
        <CourseMenu course={course} enrolledCourse={enrolledCourse} />
        <div className="grow">{children}</div>
        <DrawerBackdrop />
      </div>
    </DrawerContextProvider>
  );
}
