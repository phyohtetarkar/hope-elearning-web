import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ForgotPasswordPage from "./forgot-password-page";

export const metadata: Metadata = {
    title: "Forgot Password",
    description: process.env.NEXT_PUBLIC_APP_DESC,
  };

export default function ForgotPassword() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  return <ForgotPasswordPage />;
}
