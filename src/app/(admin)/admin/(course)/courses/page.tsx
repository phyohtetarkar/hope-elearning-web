import Pagination from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_URL } from "@/lib/constants";
import { Category, Course, CourseStatus, Page } from "@/lib/models";
import { buildQueryParams, formatNumber } from "@/lib/utils";
import { validateResponse } from "@/lib/validate-response";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cookies } from "next/headers";
import CourseActionButtons from "./course-action-buttons";
import CourseCreateButton from "./course-create-button";
import CoursesFilter from "./courses-filter";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const getCourses = async ({ searchParams }: Props) => {
  const query = buildQueryParams({ ...searchParams, limit: 10 });

  const url = `${API_URL}/admin/courses${query}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<Course>;
};

const getCategories = async () => {
  const url = `${API_URL}/admin/categories`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<Category>;
};

export default async function Courses(props: Props) {
  const coursesPromise = getCourses(props);
  const categoriesPromise = getCategories();

  const [courses, categories] = await Promise.all([
    coursesPromise,
    categoriesPromise,
  ]);
  dayjs.extend(relativeTime);

  const statusView = (status: CourseStatus) => {
    if (status === "draft") {
      return <span className="text-primary text-sm">Draft</span>;
    }

    return <span className="text-sliver text-sm">Published</span>;
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Courses</h2>
        <CourseCreateButton categories={categories.contents} />
      </div>
      <CoursesFilter />
      <Table>
        {courses.pageSize === 0 && (
          <TableCaption className="text-start">No courses found</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              Course
            </TableHead>
            <TableHead className="uppercase min-w-[150px]">Enrolled</TableHead>
            <TableHead className="uppercase min-w-[150px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {courses?.contents.map((c, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex flex-col">
                    <h6 className="mb-0.5">{c.title ?? "(Untitled)"}</h6>
                    <span className="text-sliver text-sm mb-1">
                      By&nbsp;{c.authors?.map((u) => u.nickname).join(", ")}
                      &nbsp;-&nbsp;
                      {dayjs(c.audit?.createdAt).fromNow()}
                    </span>
                    {statusView(c.status)}
                  </div>
                </TableCell>
                <TableCell className="text-sliver text-sm">
                  {formatNumber(BigInt(c.meta?.enrolledCount ?? 0))}
                </TableCell>
                <TableCell>
                  <CourseActionButtons course={c} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="mt-8 flex justify-end">
        <Pagination
          totalPage={courses.totalPage}
          currentPage={courses.currentPage}
        />
      </div>
    </>
  );
}
