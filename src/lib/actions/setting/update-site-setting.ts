"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";

export async function updateSiteSetting(
  value: string,
  path: string,
  revalidate?: string
) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/content/site-settings/${path}`;

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ value }),
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
