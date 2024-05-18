import { cookies } from "next/headers";
import SignUpPage from "./signup-page";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

export default function SignUp() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    revalidatePath("/", "layout")
    redirect("/");
  }
  return <SignUpPage />;
}
