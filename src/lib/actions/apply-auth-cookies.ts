"use server";

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
  cookies().set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    maxAge: 2592000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  cookies().set({
    name: "refresh_token",
    value: refreshToken,
    httpOnly: true,
    maxAge: 2592000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  revalidatePath("/", "layout");
  redirect("/");
}