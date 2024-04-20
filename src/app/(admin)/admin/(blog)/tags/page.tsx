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
import { Page, Tag } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import TagActionButtons from "./tag-action-buttons";
import TagCreateButton from "./tag-create-button";

const getTags = async () => {
  const url = `${API_URL}/admin/tags`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-store",
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<Tag>;
};

export default async function Tags() {
  const data = await getTags();

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Tags</h2>
        <TagCreateButton />
      </div>
      <Table>
        {data.contents.length === 0 && (
          <TableCaption className="text-start">No tags found</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              Tag
            </TableHead>
            <TableHead className="uppercase min-w-[150px]">Slug</TableHead>
            <TableHead className="uppercase min-w-[150px]">
              No.of posts
            </TableHead>
            <TableHead className="uppercase min-w-[150px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {data.contents.map((t, i) => {
            return (
              <TableRow key={t.id}>
                <TableCell>
                  <h6>{t.name}</h6>
                </TableCell>
                <TableCell className="text-sliver text-sm">{t.slug}</TableCell>
                <TableCell className="text-sliver text-sm">10 post</TableCell>
                <TableCell>
                  <TagActionButtons tag={t} />
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
