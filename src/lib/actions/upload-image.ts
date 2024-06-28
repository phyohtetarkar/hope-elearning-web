"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";

export async function uploadImage(formData: FormData) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/storage/upload`;

  const resp = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Cookie: session.cookie,
    },
  });

  await validateResponse(resp);

  return await resp.text();
}
