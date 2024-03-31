import {
  DrawerBackdrop,
  DrawerContextProvider,
  Header,
  SideMenu,
} from "@/components/template/admin";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DrawerContextProvider>
      <div className="flex h-full static">
        <SideMenu />
        <div className="flex-grow">
          <Header />
          {children}
          <DrawerBackdrop />
        </div>
      </div>
    </DrawerContextProvider>
  );
}
