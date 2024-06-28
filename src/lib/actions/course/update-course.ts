"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";

export async function updateCourse(body: any) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/courses`;

  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  // revalidatePath("/(admin)/admin/(course)/courses/[courseId]", "page");
  revalidatePath(`/admin/courses/${body.id}`);
}
