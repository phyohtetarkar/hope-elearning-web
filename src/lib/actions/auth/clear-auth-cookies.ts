"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function clearAuthCookies() {
  cookies().delete("access_token");
  cookies().delete("refresh_token");
  revalidatePath("/", "layout");
  redirect("/");
}
