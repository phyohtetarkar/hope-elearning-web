"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function validateResponse(resp: Response) {
  if (resp.status === 401) {
    revalidatePath("/", 'layout');
    redirect("/login");
  }

  if (resp.status === 403) {
    throw Error("FORBIDDEN: Permission denied");
  }

  // if (resp.status === 500) {
  //   throw Error("Internal server error");
  // }

  if (!resp.ok) {
    const json = await resp.json();
    throw Error(json["message"]);
  }
}
