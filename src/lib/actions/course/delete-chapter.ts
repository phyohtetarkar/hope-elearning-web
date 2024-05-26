"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";

export async function deleteChapter(courseId: number, chapterId: number) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/courses/${courseId}/chapters/${chapterId}`;

  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: session.cookie,
    },
  });

  await validateResponse(resp);

  // revalidatePath(`/(admin)/admin/(course)/courses/[courseId]`, "page");
  revalidatePath(`/admin/courses/${courseId}`);
}
