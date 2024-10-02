import AdminLayoutWrapper from "@/components/ui/admin-layout-wrapper";
import { API_URL_LOCAL } from "@/lib/constants";
import { User } from "@elearning/lib/models";
import { cookies } from "next/headers";

const getUser = async () => {
  try {
    const url = `${API_URL_LOCAL}/profile`;
    const resp = await fetch(url, {
      headers: {
        Cookie: cookies().toString(),
      },
    });

    return resp.ok ? ((await resp.json()) as User) : null;
    // eslint-disable-next-line no-empty
  } catch (error) {}
  return null;
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return <AdminLayoutWrapper user={user}>{children}</AdminLayoutWrapper>;
}
