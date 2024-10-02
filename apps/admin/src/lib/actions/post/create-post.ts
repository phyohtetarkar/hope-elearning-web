"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(body: any) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/posts`;

  // const body = {
  //   slug: "untitled",
  //   authors: [session.userId],
  // };

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  const postId = (await resp.json()) as string;

  revalidatePath("/admin/posts");
  redirect(`/admin/posts/${postId}`);
}
