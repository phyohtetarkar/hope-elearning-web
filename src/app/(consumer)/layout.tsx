import { API_URL_LOCAL } from "@/lib/constants";
import { User } from "@/lib/models";
import { cookies } from "next/headers";
import Footer from "./footer";
import Header from "./header";

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

export default async function ConsumerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <div className="flex flex-col h-full">
      <Header user={user} />
      <div className="pt-[65px] flex flex-col grow dark:bg-zinc-950">
        <div className="grow">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
