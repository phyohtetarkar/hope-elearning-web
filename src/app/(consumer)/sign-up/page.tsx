import { cookies } from "next/headers";
import SignUpPage from "./signup-page";
import { redirect } from "next/navigation";

export default function SignUp() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    redirect("/");
  }
  return <SignUpPage />;
}
