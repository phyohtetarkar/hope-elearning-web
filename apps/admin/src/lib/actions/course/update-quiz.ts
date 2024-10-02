"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { Quiz } from "@elearning/lib/models";

export async function updateQuiz(courseId: number, body: any) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/courses/${courseId}/quizzes`;

  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as Quiz;
}
