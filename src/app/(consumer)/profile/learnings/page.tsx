import { EnrolledCourseGridItem } from "@/components/course";
import { Alert } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Pagination from "@/components/ui/pagination";
import { API_URL_LOCAL } from "@/lib/constants";
import { EnrolledCourse, Page } from "@/lib/models";
import { buildQueryParams } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const getEnrollments = async ({ searchParams }: Props) => {
  const query = buildQueryParams({ page: searchParams["page"], limit: 15 });

  const url = `${API_URL_LOCAL}/profile/enrollments${query}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  return resp
    .json()
    .then((json) => json as Page<EnrolledCourse>)
    .catch((e) => undefined);
};

export default async function Learnings(props: Props) {
  const enrollments = await getEnrollments(props);

  const content = () => {
    if (!enrollments?.contents.length) {
      return <Alert>No courses enrolled</Alert>;
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrollments.contents.map((ec, i) => {
            return <EnrolledCourseGridItem key={i} data={ec} />;
          })}
        </div>

        <div className="flex justify-center lg:justify-end mt-10 xl:mt-8">
          <Pagination
            totalPage={enrollments.totalPage}
            currentPage={enrollments.currentPage}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/profile">Profile</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-nowrap">Learnings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {content()}
    </>
  );
}
