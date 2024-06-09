"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { Quiz } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";

export async function createQuiz(courseId: number, body: any) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/courses/${courseId}/quizzes`;

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as Quiz;
}
