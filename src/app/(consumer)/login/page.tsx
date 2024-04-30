import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginPage from "./login-page";
import { revalidatePath } from "next/cache";

export default async function Login() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    revalidatePath("/", "layout")
    redirect("/");
  }

  return <LoginPage />;
}
