import { CourseFilter } from "@/components/course";
import BrowseBreadcrumb from "./browse-breadcrumb";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default function BrowseCourses(props: Props) {
  const sp = props.searchParams;

  return (
    <>
      <div className="bg-primary h-[5rem]">
        <div className="container h-full flex items-center">
          <BrowseBreadcrumb />
        </div>
      </div>
      <div className="container py-5">
        <div className="grid grid-cols-1 lg:grid-cols-11">
          <div className="lg:col-span-3">
            <CourseFilter />
          </div>
          <div className="lg:col-span-8"></div>
        </div>
      </div>
    </>
  );
}
