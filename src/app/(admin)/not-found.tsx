import { Alert } from "@/components/ui/alert";
import { DrawerBackdrop, DrawerContextProvider } from "@/components/ui/drawer";
import Header from "./header";
import SideMenu from "./side-menu";

export default function NotFound() {
  return (
    <DrawerContextProvider>
      <div className="flex h-full">
        <SideMenu />
        <div className="grow overflow-y-auto mt-[65px]">
          <Header />
          <div className="p-4 lg:p-5">
            <Alert>No content found</Alert>
          </div>
        </div>
        <DrawerBackdrop />
      </div>
    </DrawerContextProvider>
  );
}
