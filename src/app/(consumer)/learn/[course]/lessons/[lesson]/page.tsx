import { API_URL_LOCAL } from "@/lib/constants";
import ResumeCoursePage from "./resume-course-page";
import { Lesson } from "@/lib/models";
import { redirect } from "next/navigation";

const getLesson = async (course: string, lesson: string) => {
  const url = `${API_URL_LOCAL}/enrollments/${course}/lessons/${lesson}`;

  const resp = await fetch(url);

  if (resp.status === 204) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as Lesson)
    .catch((e) => undefined);
};

export default async function ResumeCourse({
  params,
}: {
  params: { course: string; lesson: string };
}) {

  const lesson = await getLesson(params.course, params.lesson);

  if (!lesson) {
    redirect(`/profile/learnings`)
  }

  return <ResumeCoursePage lesson={lesson} />;
}
