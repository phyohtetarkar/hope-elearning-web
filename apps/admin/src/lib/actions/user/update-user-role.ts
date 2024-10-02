"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { UserRole } from "@elearning/lib/models";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, role: UserRole) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/admin/users/${userId}/role`;

  const body = {
    role: role,
  };

  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  revalidatePath("/admin/users");
}
