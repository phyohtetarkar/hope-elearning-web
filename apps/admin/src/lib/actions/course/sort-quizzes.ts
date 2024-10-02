"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";

export async function sortQuizzes(
  courseId: number,
  body: any,
  revalidate?: string
) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/courses/${courseId}/sort-quizzes`;

  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  if (revalidate) {
    revalidatePath(revalidate);
  }
}
