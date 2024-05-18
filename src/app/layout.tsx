import "../styles/codeblock.scss";
import "./globals.css";

import { AuthenticationContextProvider } from "@/components/authentication-context-porvider";
import Providers from "@/components/providers";
import { API_URL_LOCAL } from "@/lib/constants";
import { User } from "@/lib/models";
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
  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
    next: { revalidate: 10 },
  });

  return resp.ok ? ((await resp.json()) as User) : null;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (headers().get("revalidate") === "true") {
    revalidatePath("/", "layout");
    console.log("revalidated");
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="h-full m-0">
        <AuthenticationContextProvider user={user}>
          <Providers>{children}</Providers>
        </AuthenticationContextProvider>
      </body>
    </html>
  );
}
