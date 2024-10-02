import { exchangeAccessToken } from "@elearning/lib";
import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

const isPrivatePath = (pathname: string) => {
  if (pathname.startsWith("/admin") && pathname !== "/admin/logout") {
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

const redirectPath = ({
  pathname,
  url = "/login",
  baseUrl,
  revalidate,
}: {
  pathname: string;
  url?: string;
  baseUrl: string;
  revalidate?: boolean;
}) => {
  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/logout", baseUrl), {
      headers: revalidate
        ? {
            revalidate: "true",
          }
        : undefined,
    });
  }

  return NextResponse.redirect(new URL(url, baseUrl), {
    headers: revalidate
      ? {
          revalidate: "true",
        }
      : undefined,
  });
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const baseUrl = request.url;

  // console.log("path", pathname);
  // console.log("baseUrl", baseUrl);

  const accessToken = request.cookies.get("access_token")?.value;
  const privatePath = isPrivatePath(pathname);

  if (!accessToken && privatePath) {
    return redirectPath({ pathname, baseUrl });
  }

  if (!accessToken) {
    return NextResponse.next();
  }

  let payload: jose.JWTPayload | undefined = undefined;

  try {
    payload = jose.decodeJwt(accessToken);
    // eslint-disable-next-line no-empty
  } catch (error) {}

  if (!payload && privatePath) {
    const resp = redirectPath({ pathname, baseUrl, revalidate: true });
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

  const currentTime = new Date().getTime() / 1000;
  const expiredTime = payload.exp ?? 0;
  const timeLeft = expiredTime - currentTime;
  // console.log(new Date((payload.iat ?? 0) * 1000).toLocaleString());
  // console.log(new Date((payload.exp ?? 0) * 1000).toLocaleString());
  // console.log(timeLeft);

  if (timeLeft <= 300) {
    const rt = request.cookies.get("refresh_token")?.value;
    const refreshResult = await exchangeAccessToken({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      refreshToken: rt,
    });

    if (!refreshResult && privatePath) {
      const resp = redirectPath({ pathname, baseUrl, revalidate: true });
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

    const headers: HeadersInit = {
      Cookie: `access_token=${accessToken};refresh_token=${refreshToken}`,
    }

    const resp = pathname.startsWith("/admin") ? NextResponse.rewrite(`${process.env.ADMIN_URL}${pathname}`, {
      headers,
    }) : NextResponse.next({
      headers,
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
    "/((?!api|_next/static|_next/image|favicon.ico|__nextjs_original-stack-frame|admin-static).*)",
  ],
};
