"use client";

import { useAppDispatch } from "@elearning/global-store";
import { setUser } from "@elearning/global-store/slices";
import { User } from "@elearning/lib/models";
import { Alert, DrawerBackdrop, DrawerContextProvider } from "@elearning/ui";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Header from "./header";
import SideMenu from "./side-menu";

const isAdminPath = (pathname: string) => {
  if (pathname.startsWith("/tags")) {
    return true;
  }

  if (pathname.startsWith("/categories")) {
    return true;
  }

  if (pathname.startsWith("/users")) {
    return true;
  }

  if (pathname.startsWith("/settings")) {
    return true;
  }

  if (pathname.startsWith("/subscribers")) {
    return true;
  }

  if (pathname.startsWith("/audit-log")) {
    return true;
  }

  if (pathname.startsWith("/about-us")) {
    return true;
  }

  if (pathname.startsWith("/privacy-policy")) {
    return true;
  }

  if (pathname.startsWith("/terms-and-conditions")) {
    return true;
  }

  return false;
};

export default function AdminLayoutWrapper({
  user,
  children,
}: {
  user?: User | null;
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  const pathname = usePathname();

  const render = (node: ReactNode) => {
    return (
      <DrawerContextProvider>
        <div className="relative h-full">
          <SideMenu />
          <div className="grow flex flex-col mt-[65px] lg:ml-[300px]">
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
    return (
      <div className="container py-5">
        <Alert variant="primary">
          You have been logged out. Please return to&nbsp;
          <a href={`/login`} className="font-medium underline">
            Login
          </a>
          .
        </Alert>
      </div>
    );
  }

  if (user.role === "user") {
    return (
      <div className="container py-5">
        <Alert variant="destructive">
          FORBIDDEN: You don't have permission to access this resource.
        </Alert>
      </div>
    );
  }

  if (!user.emailVerified) {
    return (
      <div className="container py-5">
        <Alert variant="primary">
          Your email did not verified. Please return to&nbsp;
          <a href={`/verify-email`} className="font-medium underline">
            Verify email
          </a>
          .
        </Alert>
      </div>
    );
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

  if (pathname === "/admin/logout") {
    return <>{children}</>;
  }

  return render(children);
}
