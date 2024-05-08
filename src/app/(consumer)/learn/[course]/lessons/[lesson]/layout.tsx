import { DrawerBackdrop, DrawerContextProvider } from "@/components/ui/drawer";
import CourseMenu from "./course-menu";

export default async function ResumeCourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DrawerContextProvider>
      <div className="flex h-full">
        <CourseMenu />
        <div className="grow">{children}</div>
        <DrawerBackdrop />
      </div>
    </DrawerContextProvider>
  );
}
