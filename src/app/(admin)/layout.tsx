import { AuthenticationContextProvider } from "@/components/authentication-context-porvider";
import { API_URL } from "@/lib/constants";
import { User } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLayoutWrapper from "./admin-layout-wrapper";

const getUser = async () => {
  const url = `${API_URL}/profile`;
  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (resp.status === 401) {
    revalidatePath("/", "layout");
    redirect("/login");
  }

  if (!resp.ok) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  return (await resp.json()) as User;
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (user.role === "user") {
    revalidatePath("/", "layout");
    redirect("/");
  }

  return (
    <AuthenticationContextProvider user={user}>
      <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
    </AuthenticationContextProvider>
  );
}
