"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { Alert } from "@/components/ui/alert";
import { DrawerBackdrop, DrawerContextProvider } from "@/components/ui/drawer";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";
import Header from "./header";
import SideMenu from "./side-menu";

export default function AdminLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useContext(AuthenticationContext);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user === null || user?.role === "user") {
      router.replace("/");
    }
  }, [user, router]);

  const render = (node: ReactNode) => {
    return (
      <DrawerContextProvider>
        <div className="flex h-full">
          <SideMenu />
          <div className="grow overflow-y-auto mt-[65px]">
            <Header />
            <div className="p-4 lg:p-5">{node}</div>
          </div>
          <DrawerBackdrop />
        </div>
      </DrawerContextProvider>
    );
  };

  const isAdminOrOwner = user?.role === "owner" || user?.role === "admin";

  if (!user) {
    return null;
  }

  if (user.role === "user") {
    return null;
  }

  if (!isAdminOrOwner && pathname.startsWith("/admin/tags")) {
    return render(<Alert variant="destructive">FORBIDDEN</Alert>);
  }

  if (!isAdminOrOwner && pathname.startsWith("/admin/categories")) {
    return render(<Alert variant="destructive">FORBIDDEN</Alert>);
  }

  if (!isAdminOrOwner && pathname.startsWith("/admin/users")) {
    return render(<Alert variant="destructive">FORBIDDEN</Alert>);
  }

  if (!isAdminOrOwner && pathname.startsWith("/admin/settings")) {
    return render(<Alert variant="destructive">FORBIDDEN</Alert>);
  }

  if (!isAdminOrOwner && pathname.startsWith("/admin/subscribers")) {
    return render(<Alert variant="destructive">FORBIDDEN</Alert>);
  }

  if (pathname.match(/^\/admin\/posts\/.+/)) {
    return <>{children}</>;
  }

  if (pathname.match(/^\/admin\/courses\/.+/)) {
    return <>{children}</>;
  }

  return render(children);
}
