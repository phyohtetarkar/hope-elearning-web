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
import CategoryActionButtons from "./category-action-buttons";
import CategoryCreateButton from "./category-create-button";
import { API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { validateResponse } from "@/lib/validate-response";
import { Category, Page } from "@/lib/models";

const getCategories = async () => {
  const url = `${API_URL}/admin/categories`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-store",
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<Category>;
};

export default async function Categories() {
  const data = await getCategories();

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Categories</h2>
        <CategoryCreateButton />
      </div>
      <Table>
        {data.contents.length === 0 && (
          <TableCaption className="text-start">
            No categories found
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              Category
            </TableHead>
            <TableHead className="uppercase min-w-[300px]">Slug</TableHead>
            <TableHead className="uppercase min-w-[150px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {data.contents.map((c, i) => {
            return (
              <TableRow key={c.id}>
                <TableCell>
                  <h6>{c.name}</h6>
                </TableCell>
                <TableCell className="text-sliver text-sm">{c.slug}</TableCell>
                <TableCell>
                  <CategoryActionButtons category={c} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="mt-8 flex justify-end">
        <Pagination
          totalPage={data.currentPage}
          currentPage={data.currentPage}
        />
      </div>
    </>
  );
}
