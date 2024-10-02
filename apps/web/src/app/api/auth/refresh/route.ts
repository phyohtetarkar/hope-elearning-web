import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  try {
    if (!refreshToken) {
      throw "Refresh token not found";
    }

    const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    const resp = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const json = await resp.json();

    if (!resp.ok) {
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");
      return Response.json(json, { status: 401 });
    }

    const result = {
      accessToken: json["id_token"],
      refreshToken: json["refresh_token"],
    };

    cookieStore.set({
      name: "access_token",
      value: result.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2592000,
    });

    cookieStore.set({
      name: "refresh_token",
      value: result.refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2592000,
    });

    return Response.json(result);
  } catch (error) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return new Response(null, {
      status: 401,
    });
  }
}
