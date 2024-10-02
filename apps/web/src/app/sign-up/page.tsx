import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignUpPage from "./signup-page";

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
