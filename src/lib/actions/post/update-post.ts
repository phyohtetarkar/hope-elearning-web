"use server";

import { getSession } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import { Post } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";

export async function updatePost(body: object) {
  const session = await getSession();

  const url = `${API_URL}/admin/posts`;

  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  // revalidatePath("/(admin)/admin/(blog)/posts/[id]", "page");

  return (await resp.json()) as Post;
}
