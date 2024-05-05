import "./globals.css";
import "../styles/codeblock.scss";

import type { Metadata, Viewport } from "next";
import Providers from "@/components/providers";
import { API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { User } from "@/lib/models";
import { AuthenticationContextProvider } from "@/components/authentication-context-porvider";

export const viewport: Viewport = {
  themeColor: {
    media: "(prefers-color-scheme: light)",
    color: "#ffffff",
  },
  initialScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "E-Learning",
  description: "Start a new career in the software developing industry.",
};

const getUser = async () => {
  const url = `${API_URL}/profile`;
  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  return resp.ok ? ((await resp.json()) as User) : null;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="h-full m-0 overflow-hidden">
        <AuthenticationContextProvider user={user}>
          <Providers>{children}</Providers>
        </AuthenticationContextProvider>
      </body>
    </html>
  );
}
