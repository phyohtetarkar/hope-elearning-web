"use client";

import {
  DrawerBackdrop,
  DrawerContextProvider,
} from "@/components/ui/drawer";
import { ReactNode, useEffect } from "react";
import SideMenu from "./side-menu";
import Header from "./header";
import { usePathname } from "next/navigation";

export default function AdminLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.match(/^\/admin\/posts\/.+/)) {
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
