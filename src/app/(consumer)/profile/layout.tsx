import { ReactNode } from "react";
import ProfileLayoutWrapper from "./profile-layout-wrapper";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <ProfileLayoutWrapper>{children}</ProfileLayoutWrapper>;
}
