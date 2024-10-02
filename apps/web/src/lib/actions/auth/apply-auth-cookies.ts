"use server";

import * as jose from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function applyAuthCookies({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const payload = jose.decodeJwt(accessToken);

  cookies().set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    maxAge: 2592000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  cookies().set({
    name: "refresh_token",
    value: refreshToken,
    httpOnly: true,
    maxAge: 2592000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  if (!payload["email_verified"]) {
    revalidatePath("/", "layout");
    redirect("/verify-email");
  }

  revalidatePath("/", "layout");
}
