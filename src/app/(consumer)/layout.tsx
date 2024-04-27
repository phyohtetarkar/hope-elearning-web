import { AuthenticationContextProvider } from "@/components/authentication-context-porvider";
import { API_URL } from "@/lib/constants";
import { User } from "@/lib/models";
import { cookies } from "next/headers";
import Footer from "./footer";
import Header from "./header";

const getUser = async () => {
  const url = `${API_URL}/profile`;
  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  return resp.ok ? ((await resp.json()) as User) : undefined;
};

export default async function ConsumerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <AuthenticationContextProvider user={user}>
      <div className="flex h-full">
        <Header user={user} />
        <div className="flex flex-col grow overflow-y-auto mt-[65px]">
          <main className="grow">{children}</main>
          <Footer />
        </div>
      </div>
    </AuthenticationContextProvider>
  );
}
