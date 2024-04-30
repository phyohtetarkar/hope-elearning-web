import { cookies } from "next/headers";
import SignUpPage from "./signup-page";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function SignUp() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    revalidatePath("/", "layout")
    redirect("/");
  }
  return <SignUpPage />;
}
