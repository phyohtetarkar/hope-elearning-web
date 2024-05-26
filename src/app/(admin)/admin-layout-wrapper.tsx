"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { Alert } from "@/components/ui/alert";
import { DrawerBackdrop, DrawerContextProvider } from "@/components/ui/drawer";
import { usePathname } from "next/navigation";
import { ReactNode, useContext } from "react";
import Header from "./header";
import SideMenu from "./side-menu";

const isAdminPath = (pathname: string) => {
  if (pathname.startsWith("/admin/tags")) {
    return true;
  }

  if (pathname.startsWith("/admin/categories")) {
    return true;
  }

  if (pathname.startsWith("/admin/users")) {
    return true;
  }

  if (pathname.startsWith("/admin/settings")) {
    return true;
  }

  if (pathname.startsWith("/admin/subscribers")) {
    return true;
  }

  if (pathname.startsWith("/admin/audit-log")) {
    return true;
  }

  if (pathname.startsWith("/admin/about-us")) {
    return true;
  }

  if (pathname.startsWith("/admin/privacy-policy")) {
    return true;
  }

  if (pathname.startsWith("/admin/terms-and-conditions")) {
    return true;
  }

  return false;
};

export default function AdminLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useContext(AuthenticationContext);

  const pathname = usePathname();

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

  if (!isAdminOrOwner && isAdminPath(pathname)) {
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
