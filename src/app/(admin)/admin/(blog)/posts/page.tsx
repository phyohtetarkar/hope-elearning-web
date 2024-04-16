import { Select } from "@/components/forms";
import { Edit } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Posts() {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Posts</h2>
        <Button color="primary" asChild>
          <Link href="/admin/posts/new">New post</Link>
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Select>
          <option>All posts</option>
          <option>Draft posts</option>
          <option>Published posts</option>
        </Select>
        <Select>
          <option>All access</option>
          <option>Public</option>
          <option>Member only</option>
          <option>Paid member only</option>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              Post
            </TableHead>
            <TableHead className="uppercase min-w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          <TableRow>
            <TableCell>
              <div className="flex flex-col">
                <h6 className="mb-0.5">Introduction to NestJS</h6>
                <span className="text-sliver text-sm mb-1">
                  By Cartoon - a day ago
                </span>
                <span className="text-primary text-sm">Draft</span>
              </div>
            </TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger className="ms-auto">
                    <Button variant="default" asChild size="icon">
                      <Link href={`/admin/posts/1`}>
                        <Edit size={20} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit post</TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
