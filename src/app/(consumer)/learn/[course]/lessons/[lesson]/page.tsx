import { API_URL_LOCAL } from "@/lib/constants";
import { Lesson, QuizResponse } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResumeCoursePage from "./resume-course-page";

const getLesson = async (slug: string) => {
  const url = `${API_URL_LOCAL}/enrollments/${slug}/lesson`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  validateResponse(resp);

  if (resp.status === 204) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as Lesson)
    .catch((e) => undefined);
};

const getQuizResponses = async (lessonId: number) => {
  const url = `${API_URL_LOCAL}/enrollments/${lessonId}/quiz-responses`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  validateResponse(resp);

  if (resp.status === 204) {
    return undefined;
  }

  return resp
    .json()
    .then((json) => json as QuizResponse[])
    .catch((e) => undefined);
};

export default async function ResumeCourse({
  params,
}: {
  params: { course: string; lesson: string };
}) {
  const lesson = await getLesson(params.lesson);

  if (!lesson) {
    redirect(`/profile/learnings`);
  }

  const responses =
    lesson.type === "quiz" ? await getQuizResponses(lesson.id) : undefined;

  return <ResumeCoursePage lesson={lesson} responses={responses} />;
}
