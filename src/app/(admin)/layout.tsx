import { API_URL_LOCAL } from "@/lib/constants";
import { User } from "@/lib/models";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLayoutWrapper from "./admin-layout-wrapper";

const getUser = async () => {
  const url = `${API_URL_LOCAL}/profile`;
  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
    next: { revalidate: 10 },
  });

  return resp.ok ? ((await resp.json()) as User) : null;
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user || user.role === "user") {
    redirect("/");
  }

  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
