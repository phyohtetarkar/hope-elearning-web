import { cookies } from "next/headers";
import AdminLayoutWrapper from "./admin-layout-wrapper";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // console.log(cookies().get("access_token"));
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
