"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth";
import { redirect } from "next/navigation";
import * as jose from "jose";

export async function sendVerificationEmail() {
  try {
    const session = await getSession();

    if (!session) {
      revalidatePath("/", "layout");
      redirect("/");
    }

    const { accessToken } = session;

    try {
      const payload = jose.decodeJwt(accessToken);
      const emailVerified = payload["email_verified"];

      if (emailVerified) {
        redirect("/");
      }
    } catch (error) {
      redirect("/");
    }

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

    // if (!resp.ok) {
    //   const json = await resp.json();
    //   throw new Error(json["message"]);
    // }

    return resp.ok;
  } catch (e) {
    throw e;
  }
}
