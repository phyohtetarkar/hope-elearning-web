import { Pagination, Table } from "@/components";
import { Select } from "@/components/forms";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button, Link, Tooltip } from "@nextui-org/react";

export default function Posts() {
  return (
    <div className="p-4 lg:p-5">
      <div className="flex justify-between mb-4">
        <h2>Posts</h2>
        <Button as={Link} href="/admin/posts/new" color="primary">
          New post
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
        <Table.Header>
          <Table.Column className="uppercase min-w-[300px] w-full">
            Post
          </Table.Column>
          <Table.Column className="uppercase min-w-[100px]">Action</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <div className="flex flex-col">
                <h6 className="mb-0.5">Introduction to NestJS</h6>
                <span className="text-muted text-sm mb-1">
                  By Cartoon - a day ago
                </span>
                <span className="text-primary text-sm">Draft</span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <Tooltip content="Edit post" color="foreground">
                <Button as={Link} href={`/admin/posts/1`} isIconOnly>
                  <PencilSquareIcon width={20} />
                </Button>
              </Tooltip>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <div className="mt-8 flex justify-end">
        <Pagination totalPage={10} currentPage={1} />
      </div>
    </div>
  );
}
