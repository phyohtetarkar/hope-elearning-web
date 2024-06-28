"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";

export async function resetQuizResponse(lessonId: number) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/enrollments/${lessonId}/quiz-responses`;

  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: session.cookie,
    },
  });

  await validateResponse(resp);
}
