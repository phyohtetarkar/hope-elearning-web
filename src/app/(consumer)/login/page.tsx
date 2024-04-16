import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginPage from "./login-page";

export default async function Login() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    redirect("/");
  }

  return <LoginPage />;
}
