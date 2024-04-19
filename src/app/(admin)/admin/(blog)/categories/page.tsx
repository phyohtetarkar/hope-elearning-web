import Pagination from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryActionButtons from "./category-action-buttons";
import CategoryCreateButton from "./category-create-button";

export default function Categories() {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Categories</h2>
        <CategoryCreateButton />
      </div>
      <Table>
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
          <TableRow>
            <TableCell>
              <h6>Data Analysis</h6>
            </TableCell>
            <TableCell className="text-sliver text-sm">data-analysis</TableCell>
            <TableCell>
              <CategoryActionButtons />
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
