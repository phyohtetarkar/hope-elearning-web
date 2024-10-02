import { BookmarkCourseGridItem } from "@/components/course";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Pagination,
} from "@elearning/ui";
import { Course, Page } from "@elearning/lib/models";
import { buildQueryParams } from "@elearning/lib/utils";
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

  validateResponse(resp);

  return resp
    .json()
    .then((json) => json as Page<Course>)
    .catch((e) => undefined);
};

export default async function Bookmarks(props: Props) {
  const bookmarks = await getBookmarks(props);

  const content = () => {
    if (!bookmarks?.contents.length) {
      return <Alert>No courses bookmarked</Alert>;
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.contents.map((bm, i) => {
            return <BookmarkCourseGridItem key={i} data={bm} />;
          })}
        </div>

        <div className="flex justify-center lg:justify-end mt-10 xl:mt-8">
          <Pagination
            totalPage={bookmarks.totalPage}
            currentPage={bookmarks.currentPage}
            LinkComponent={Link}
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
