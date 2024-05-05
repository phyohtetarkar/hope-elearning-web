"use client";

import { DrawerBackdrop, DrawerContextProvider } from "@/components/ui/drawer";
import { ReactNode, useContext, useEffect } from "react";
import SideMenu from "./side-menu";
import Header from "./header";
import { usePathname, useRouter } from "next/navigation";
import { AuthenticationContext } from "@/components/authentication-context-porvider";

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

  if (!user) {
    return null;
  }

  if (user.role === "user") {
    return null;
  }

  if (pathname.match(/^\/admin\/posts\/.+/)) {
    return <>{children}</>;
  }

  if (pathname.match(/^\/admin\/courses\/.+/)) {
    return <>{children}</>;
  }

  return (
    <DrawerContextProvider>
      <div className="flex h-full">
        <SideMenu />
        <div className="grow overflow-y-auto mt-[65px]">
          <Header />
          <div className="p-4 lg:p-5">{children}</div>
        </div>
        <DrawerBackdrop />
      </div>
    </DrawerContextProvider>
  );
}
