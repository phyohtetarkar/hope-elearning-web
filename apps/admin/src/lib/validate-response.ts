"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function validateResponse(resp: Response, skipAuth?: boolean) {
  if (resp.status === 401 && !skipAuth) {
    revalidatePath("/admin", "layout");
    redirect("/admin/logout");
  }

  if (resp.status === 403) {
    throw new Error("FORBIDDEN: Permission denied");
  }

  if (resp.status === 404) {
    throw new Error("Resource not found");
  }

  if (!resp.ok) {
    const json = await resp.json();
    throw new Error(json["message"]);
  }
}
