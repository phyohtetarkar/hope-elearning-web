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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 border-t py-7">
          <div className="flex order-2 lg:order-1 justify-center lg:justify-start">
            <div className="text-nowrap text-sm text-muted-foreground">
              {copyRight}
            </div>
          </div>
          <div className="flex order-3 lg:order-2 justify-center">
            <div className="text-nowrap text-sm text-muted-foreground">
              Made with &#9829; by&nbsp;
              <a
                href="https://phyohtetarkar.github.io/"
                className="text-primary underline font-medium"
                target="_blank"
              >
                Phyo Htet Arkar
              </a>
            </div>
          </div>
          <div className="flex order-1 lg:order-3 justify-center lg:justify-end text-sm text-muted-foreground space-x-4">
            <Link
              href="/privacy-policy"
              className="underline hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="underline hover:text-foreground"
            >
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
