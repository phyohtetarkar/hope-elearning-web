import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  try {
    const accessToken = request.cookies.get("access_token")?.value;

    if (!accessToken) {
      const resp = NextResponse.redirect(new URL("/login", request.url));
      resp.cookies.delete("access_token");
      resp.cookies.delete("refresh_token");
      return resp;
    }

    let payload: jose.JWTPayload | undefined = undefined;

    try {
      payload = jose.decodeJwt(accessToken);
    } catch (error) {}

    if (!payload) {
      const resp = NextResponse.redirect(new URL("/login", request.url));
      resp.cookies.delete("access_token");
      resp.cookies.delete("refresh_token");
      return resp;
    }

    console.log(new Date((payload.iat ?? 0) * 1000).toLocaleString());
    console.log(new Date((payload.exp ?? 0) * 1000).toLocaleString());

    const emailVerified = payload["email_verified"];
    if (!emailVerified && !pathname.startsWith("/verify-email")) {
      return NextResponse.redirect(new URL("/verify-email", request.url));
    }

    if (emailVerified && pathname.startsWith("/verify-email")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const currentTime = new Date().getTime() / 1000;
    const expiredTime = payload.exp ?? 0;
    const timeLeft = expiredTime - currentTime;
    console.log(timeLeft);

    if (timeLeft <= 300) {
      const refreshResponse = await fetch(new URL("/api/auth/refresh", request.url), {
        method: "POST",
        headers: request.headers,
      });

      if (!refreshResponse.ok) {
        const resp = NextResponse.redirect(new URL("/login", request.url));
        resp.cookies.delete("access_token");
        resp.cookies.delete("refresh_token");
        return resp;
      }

      const { accessToken, refreshToken } = await refreshResponse.json();

      return NextResponse.next({
        headers: {
          "Set-Cookie": refreshResponse.headers.getSetCookie().join(","),
          Cookie: `access_token=${accessToken};refresh_token=${refreshToken}`,
        },
      });
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/verify-email"],
};
