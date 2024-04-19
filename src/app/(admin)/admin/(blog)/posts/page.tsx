import { Button } from "@/components/ui/button";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { API_URL } from "@/lib/constants";
import { Page, Post, PostStatus } from "@/lib/models";
import { buildQueryParams } from "@/lib/utils";
import { validateResponse } from "@/lib/validate-response";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Edit } from "lucide-react";
import Link from "next/link";
import PostFilter from "./posts-filter";
import { cookies } from "next/headers";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const getPosts = async ({ searchParams }: Props) => {
  const { status, access } = searchParams;
  const query = buildQueryParams({
    status: status,
    access: access,
  });

  const url = `${API_URL}/admin/posts${query}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: 'no-store',
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<Post>;
};

export default async function Posts(props: Props) {
  const data = await getPosts(props);
  dayjs.extend(relativeTime);

  const statusView = (status: PostStatus) => {
    if (status === "draft") {
      return <span className="text-primary text-sm">Draft</span>;
    }

    if (status === "disabled") {
      return <span className="text-danger text-sm">Disabled</span>;
    }

    return <span className="text-sliver text-sm">Published</span>;
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Posts</h2>
        <Button color="primary" asChild>
          <Link href="/admin/posts/new">New post</Link>
        </Button>
      </div>
      <PostFilter/>
      <Table>
        {data.contents.length === 0 && (
          <TableCaption className="text-start">No posts found</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              Post
            </TableHead>
            <TableHead className="uppercase min-w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {data.contents.map((p, i) => {
            return (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <h6 className="mb-0.5">{p.title}</h6>
                    <span className="text-sliver text-sm mb-1">
                      By&nbsp;{p.authors.map((u) => u.nickname).join(", ")}
                      &nbsp;-&nbsp;
                      {dayjs(p.audit?.createdAt).fromNow()}
                    </span>
                    {statusView(p.status)}
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
