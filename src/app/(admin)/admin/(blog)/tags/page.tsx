import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TagActionButtons from "./tag-action-buttons";
import TagCreateButton from "./tag-create-button";

export default function Tags() {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Tags</h2>
        <TagCreateButton />
      </div>
      <Table>
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
          <TableRow>
            <TableCell>
              <h6>News</h6>
            </TableCell>
            <TableCell className="text-sliver text-sm">news</TableCell>
            <TableCell className="text-sliver text-sm">10 post</TableCell>
            <TableCell>
              <TagActionButtons />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="mt-8 flex justify-end">
        <Pagination totalPage={10} currentPage={1} />
      </div>
    </>
  );
}
