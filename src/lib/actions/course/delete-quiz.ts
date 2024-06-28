"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";

export async function deleteQuiz(courseId: number, quizId: number) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/courses/${courseId}/quizzes/${quizId}`;

  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: session.cookie,
    },
  });

  await validateResponse(resp);

  // revalidatePath(`/(admin)/admin/(course)/courses/[courseId]`, "page");
  // revalidatePath(`/admin/courses/${courseId}/lesons/${lessonId}`);
}
