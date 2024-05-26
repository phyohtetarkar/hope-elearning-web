"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteLesson(
  courseId: number,
  lessonId: number,
  needRedirect?: boolean
) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/courses/${courseId}/lessons/${lessonId}`;

  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: session.cookie,
    },
  });

  await validateResponse(resp);

  // revalidatePath(`/(admin)/admin/(course)/courses/[courseId]`, "page");
  revalidatePath(`/admin/courses/${courseId}`);

  if (needRedirect) {
    redirect(`/admin/courses/${courseId}`);
  }
}
