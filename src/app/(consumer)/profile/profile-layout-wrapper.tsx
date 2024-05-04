"use client";

import { ReactNode } from "react";
import ProfileMenu from "./profile-menu";

export default function ProfileLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="container py-3 mb-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-4 xl:col-span-3">
          <ProfileMenu />
        </div>
        <div className="lg:col-span-8 xl:col-span-9">{children}</div>
      </div>
    </div>
  );
}
