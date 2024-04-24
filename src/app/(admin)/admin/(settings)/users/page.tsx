import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserActionButtons from "./user-action-buttons";
import Pagination from "@/components/ui/pagination";

export default function Users() {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Users</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              User
            </TableHead>
            <TableHead className="uppercase min-w-[300px]">Email</TableHead>
            <TableHead className="uppercase min-w-[150px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          <TableRow>
            <TableCell>
              <h6>NNaing</h6>
            </TableCell>
            <TableCell className="text-sliver text-sm">
              theinmwenaing22@gmail.com
            </TableCell>
            <TableCell>
              <UserActionButtons />
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
