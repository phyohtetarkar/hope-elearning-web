"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@elearning/ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BrowseBreadcrumb() {
  const sp = useSearchParams();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-base text-primary-foreground/70 hover:text-primary-foreground dark:text-foreground/70 hover:dark:text-foreground"
            asChild
          >
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-primary-foreground/70 dark:text-foreground/70" />
        {sp.get("q") ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-base text-primary-foreground/70 hover:text-primary-foreground dark:text-foreground/70 hover:dark:text-foreground"
                asChild
              >
                <Link href="/browse">Courses</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary-foreground/70 dark:text-foreground/70" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-base text-nowrap text-primary-foreground dark:text-foreground">
                <span>Search results for:</span>
                <span className="ms-1">{`"${sp.get("q")}"`}</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-base text-nowrap text-primary-foreground dark:text-foreground">
              Courses
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
