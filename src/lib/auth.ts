"use server";

import * as jose from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { exchangeAccessToken } from "./exchange-access-token";

interface SessionType {
  userId: string;
  cookie: string;
  accessToken: string;
  refreshToken: string | null | undefined;
}

export async function getSession(): Promise<SessionType> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    revalidatePath("/", "layout");
    redirect("/login");
  }

  let payload: jose.JWTPayload | undefined = undefined;

  try {
    payload = jose.decodeJwt(accessToken);
  } catch (error) {}

  if (!payload) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    revalidatePath("/", "layout");
    redirect("/login");
  }

  // console.log(new Date((payload.iat ?? 0) * 1000).toLocaleString());
  // console.log(new Date((payload.exp ?? 0) * 1000).toLocaleString());

  const currentTime = new Date().getTime() / 1000;
  const expiredTime = payload?.exp ?? 0;
  const timeLeft = expiredTime - currentTime;
  // console.log(timeLeft);

  if (timeLeft <= 300) {
    const rt = cookieStore.get("refresh_token")?.value;
    const refreshResult = await exchangeAccessToken(rt);

    if (!refreshResult) {
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");
      revalidatePath("/", "layout");
      redirect("/login");
    }

    const { accessToken, refreshToken } = refreshResult;

    cookieStore.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      maxAge: 2592000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    cookieStore.set({
      name: "refresh_token",
      value: refreshToken,
      httpOnly: true,
      maxAge: 2592000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return {
      userId: payload.sub ?? "",
      cookie: `access_token=${accessToken};refresh_token=${refreshToken}`,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  return {
    userId: payload.sub ?? "",
    cookie: `access_token=${accessToken};refresh_token=${refreshToken}`,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}
