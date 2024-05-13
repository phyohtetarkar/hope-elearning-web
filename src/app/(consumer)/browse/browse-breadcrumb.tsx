"use client";

import { useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function BrowseBreadcrumb() {
  const sp = useSearchParams();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-base text-primary-foreground/70 underline hover:text-primary-foreground"
            asChild
          >
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-primary-foreground/70" />
        {sp.get("q") ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-base text-primary-foreground/70 underline hover:text-primary-foreground"
                asChild
              >
                <Link href="/browse">Courses</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary-foreground/70" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-base text-nowrap text-primary-foreground">
                {sp.get("q")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-base text-nowrap text-primary-foreground">
              All courses
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
