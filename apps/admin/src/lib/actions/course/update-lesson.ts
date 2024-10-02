"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { Lesson } from "@elearning/lib/models";

export async function updateLesson(courseId: number, body: any) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/courses/${courseId}/lessons`;

  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  // revalidatePath(`/(admin)/admin/(course)/courses/[courseId]/lessons/[lessonId]`, "page");
  // revalidatePath(`/admin/courses/${courseId}/lessons/${body.id}`);

  return (await resp.json()) as Lesson;
}
