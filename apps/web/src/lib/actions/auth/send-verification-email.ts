"use server";

import { getSession } from "@/lib/auth";
import * as jose from "jose";
import { redirect } from "next/navigation";

export async function sendVerificationEmail() {
  const session = await getSession();

  const { accessToken } = session;

  // const payload = jose.decodeJwt(accessToken);
  // const emailVerified = payload["email_verified"];

  // if (emailVerified) {
  //   redirect("/verify-email");
  // }

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;
  const body = {
    requestType: "VERIFY_EMAIL",
    idToken: accessToken,
  };

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!resp.ok) {
    const json = await resp.json();
    throw new Error(json["error"]["message"]);
  }

  return resp.ok;
}
