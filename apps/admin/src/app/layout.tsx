import "./globals.css";

import Providers from "@/components/providers";
import type { Metadata, Viewport } from "next";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const viewport: Viewport = {
  themeColor: {
    media: "(prefers-color-scheme: light)",
    color: "#ffffff",
  },
  initialScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "Hope E-Learning Dashboard",
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (headers().get("revalidate") === "true") {
    revalidatePath("/admin", "layout");
  }

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="h-full m-0">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
