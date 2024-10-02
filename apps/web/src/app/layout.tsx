import "./globals.css";

import Providers from "@/components/providers";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { API_URL_LOCAL } from "@/lib/constants";
import { User } from "@elearning/lib/models";
import type { Metadata, Viewport } from "next";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

export const viewport: Viewport = {
  themeColor: {
    media: "(prefers-color-scheme: light)",
    color: "#ffffff",
  },
  initialScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "Hope E-Learning",
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

const getUser = async () => {
  const url = `${API_URL_LOCAL}/profile`;
  try {
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (headers().get("revalidate") === "true") {
    revalidatePath("/", "layout");
  }

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="h-full m-0">
        <Providers>
          <div className="flex flex-col h-full">
            <Header user={user} />
            <div className="pt-[4rem] flex flex-col grow dark:bg-zinc-950">
              <div className="grow">{children}</div>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
