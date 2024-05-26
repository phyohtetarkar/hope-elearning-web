"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";

export async function createLesson(courseId: number, body: any) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/courses/${courseId}/lessons`;

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  // revalidatePath(`/(admin)/admin/(course)/courses/[courseId]`, "page");
  revalidatePath(`/admin/courses/${courseId}`);
}
