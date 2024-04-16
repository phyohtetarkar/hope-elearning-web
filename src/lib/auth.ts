"use server";

import * as jose from "jose";
import { cookies } from "next/headers";

interface SessionType {
  cookie: string;
  accessToken: string;
  refreshToken: string | null | undefined;
}

export async function getSession(): Promise<SessionType | undefined> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return undefined;
  }

  let payload: jose.JWTPayload | undefined = undefined;

  try {
    payload = jose.decodeJwt(accessToken);
  } catch (error) {}

  if (!payload) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return undefined;
  }

  console.log(new Date((payload.iat ?? 0) * 1000).toLocaleString());
  console.log(new Date((payload.exp ?? 0) * 1000).toLocaleString());

  const currentTime = new Date().getTime() / 1000;
  const expiredTime = payload?.exp ?? 0;
  const timeLeft = expiredTime - currentTime;
  console.log(timeLeft);

  if (timeLeft <= 300) {
    const resp = await fetch(new URL("/api/auth/refresh", process.env.NEXT_PUBLIC_BASE_URL), {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!resp.ok) {
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");
      return undefined;
    }

    const { newAccessToken, newRefreshToken } = await resp.json();

    cookieStore.set({
      name: "access_token",
      value: newAccessToken,
      httpOnly: true,
      maxAge: 2592000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    cookieStore.set({
      name: "refresh_token",
      value: newRefreshToken,
      httpOnly: true,
      maxAge: 2592000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return {
      cookie: `access_token=${newAccessToken};refresh_token=${newRefreshToken}`,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  return {
    cookie: `access_token=${accessToken};refresh_token=${refreshToken}`,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}
