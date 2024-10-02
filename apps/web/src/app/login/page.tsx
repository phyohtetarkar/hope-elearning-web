import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginPage from "./login-page";

export const metadata: Metadata = {
  title: "Login",
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

export default async function Login() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    revalidatePath("/", "layout")
    redirect("/");
  }

  return <LoginPage />;
}
