import { DrawerContextProvider } from "@/components";
import DrawerBackdrop from "@/components/drawer";
import { Header, SideMenu } from "@/components/template/admin";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DrawerContextProvider>
      <div className="flex h-full static">
        <SideMenu />
        <div className="grow flex flex-col overflow-y-auto">
          <Header />
          <main>{children}</main>
          <DrawerBackdrop />
        </div>
      </div>
    </DrawerContextProvider>
  );
}
