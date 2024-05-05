"use server";

import { getSession } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";

export async function deleteLesson(courseId: string, lessonId: string) {
  const session = await getSession();

  const url = `${API_URL}/admin/courses/${courseId}/lessons/${lessonId}`;

  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: session.cookie,
    },
  });

  await validateResponse(resp);

  revalidatePath(`/(admin)/admin/(course)/courses/[courseId]`, "page");
}
