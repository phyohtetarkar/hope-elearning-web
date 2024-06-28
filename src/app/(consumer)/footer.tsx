"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.match(/^\/learn\/.+\/lessons\/.+/)) {
    return null;
  }

  const copyRight = `© ${new Date().getFullYear()} ${
    process.env.NEXT_PUBLIC_APP_NAME
  }`;

  return (
    <footer className="">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t py-6">
          <div className="flex order-2 md:order-1 justify-center md:justify-start">
            <div className="text-nowrap text-sm text-muted-foreground">{copyRight}</div>
          </div>
          <div className="flex order-1 md:order-2 justify-center md:justify-end text-sm text-muted-foreground space-x-4">
            <Link href="/privacy-policy" className="underline hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="underline hover:text-foreground">
              Terms
            </Link>
            <Link href="/about-us" className="underline hover:text-foreground">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
