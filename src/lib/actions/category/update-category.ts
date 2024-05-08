"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";

export async function updateCategory(body: object) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/categories`;

  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  revalidatePath("/admin/categories");

  return (await resp.json()) as number;
}
