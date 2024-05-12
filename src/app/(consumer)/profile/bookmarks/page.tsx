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
import { Course, Page } from "@/lib/models";
import { buildQueryParams } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const getBookmarks = async ({ searchParams }: Props) => {
  const query = buildQueryParams({ page: searchParams["page"], limit: 15 });

  const url = `${API_URL_LOCAL}/profile/bookmarks${query}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  return resp
    .json()
    .then((json) => json as Page<Course>)
    .catch((e) => undefined);
};

export default async function BookMarks(props: Props) {
  const bookmarks = await getBookmarks(props);

  const content = () => {
    if (!bookmarks?.contents.length) {
      return <Alert>No courses bookmarked</Alert>;
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.contents.map((bm, i) => {
            //return <BookmarkCourseGridItem key={i} data={bm} />;
            return <></>;
          })}
        </div>

        <div className="flex justify-center lg:justify-end mt-10 xl:mt-8">
          <Pagination
            totalPage={bookmarks.totalPage}
            currentPage={bookmarks.currentPage}
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
            <BreadcrumbPage className="text-nowrap">Bookmarks</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {content()}
    </>
  );
}
