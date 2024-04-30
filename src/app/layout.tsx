import "./globals.css";
import type { Metadata, Viewport } from "next";
import Providers from "@/components/providers";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="h-full m-0 overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
