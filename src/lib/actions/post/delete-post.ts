"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(id: number, needRedirect?: boolean) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/posts/${id}`;

  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: session.cookie,
    },
  });

  await validateResponse(resp);

  revalidatePath("/admin/posts");

  if (needRedirect) {
    redirect("/admin/posts");
  }
}
