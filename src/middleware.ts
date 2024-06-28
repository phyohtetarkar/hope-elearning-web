import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
import { exchangeAccessToken } from "./lib/exchange-access-token";

const isPrivatePath = (pathname: string) => {
  if (pathname.startsWith("/admin")) {
    return true;
  }

  if (pathname.startsWith("/profile")) {
    return true;
  }

  if (pathname.startsWith("/learn")) {
    return true;
  }

  if (pathname.startsWith("/verify-email")) {
    return true;
  }

  return false;
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("access_token")?.value;
  const privatePath = isPrivatePath(pathname);

  if (!accessToken && privatePath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!accessToken) {
    return NextResponse.next();
  }

  let payload: jose.JWTPayload | undefined = undefined;

  try {
    payload = jose.decodeJwt(accessToken);
  } catch (error) {}

  if (!payload && privatePath) {
    const resp = NextResponse.redirect(new URL("/login", request.url), {
      headers: {
        revalidate: "true",
      },
    });
    resp.cookies.delete("access_token");
    resp.cookies.delete("refresh_token");
    return resp;
  }

  if (!payload) {
    const resp = NextResponse.next({
      headers: {
        revalidate: "true",
      },
    });
    resp.cookies.delete("access_token");
    resp.cookies.delete("refresh_token");
    return resp;
  }

  const emailVerified = payload["email_verified"];
  if (!emailVerified && !pathname.startsWith("/verify-email") && privatePath) {
    return NextResponse.redirect(new URL("/verify-email", request.url));
  }

  // if (emailVerified && pathname.startsWith("/verify-email")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  const currentTime = new Date().getTime() / 1000;
  const expiredTime = payload.exp ?? 0;
  const timeLeft = expiredTime - currentTime;
  // console.log(new Date((payload.iat ?? 0) * 1000).toLocaleString());
  // console.log(new Date((payload.exp ?? 0) * 1000).toLocaleString());
  // console.log(timeLeft);

  if (timeLeft <= 300) {
    const rt = request.cookies.get("refresh_token")?.value;
    const refreshResult = await exchangeAccessToken(rt);

    if (!refreshResult && privatePath) {
      const resp = NextResponse.redirect(new URL("/login", request.url), {
        headers: {
          revalidate: "true",
        },
      });
      resp.cookies.delete("access_token");
      resp.cookies.delete("refresh_token");
      return resp;
    }

    if (!refreshResult) {
      const resp = NextResponse.next({
        headers: {
          revalidate: "true",
        },
      });
      resp.cookies.delete("access_token");
      resp.cookies.delete("refresh_token");
      return resp;
    }

    const { accessToken, refreshToken } = refreshResult;

    const resp = NextResponse.next({
      headers: {
        Cookie: `access_token=${accessToken};refresh_token=${refreshToken}`,
      },
    });

    resp.cookies.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      maxAge: 2592000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    resp.cookies.set({
      name: "refresh_token",
      value: refreshToken,
      httpOnly: true,
      maxAge: 2592000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return resp;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|images|tinymce).*)",
  ],
};
