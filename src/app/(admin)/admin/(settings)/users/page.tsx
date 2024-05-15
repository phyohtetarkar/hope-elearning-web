import Pagination from "@/components/ui/pagination";
import { ProfilePlaceholder } from "@/components/ui/profile-placeholder";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_URL_LOCAL } from "@/lib/constants";
import { Page, User } from "@/lib/models";
import { buildQueryParams, uppercaseFirstChar } from "@/lib/utils";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import Image from "next/image";
import UserActionButtons from "./user-action-buttons";
import UserFilter from "./users-filter";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const getUsers = async ({ searchParams }: Props) => {
  const query = buildQueryParams({ ...searchParams, limit: 10 });

  const url = `${API_URL_LOCAL}/admin/users${query}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-store",
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<User>;
};

export default async function Users(props: Props) {
  const data = await getUsers(props);

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Users</h2>
      </div>
      <UserFilter />
      <Table>
        {data.contents.length === 0 && (
          <TableCaption className="text-start">No users found</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              User
            </TableHead>
            <TableHead className="uppercase min-w-[300px]">Email</TableHead>
            <TableHead className="uppercase min-w-[150px]">Role</TableHead>
            <TableHead className="uppercase min-w-[150px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {data.contents.map((u, i) => {
            return (
              <TableRow key={u.id}>
                <TableCell className="flex items-center space-x-3">
                  {u.image ? (
                    <Image
                      alt="Profile"
                      src={u.image}
                      width={46}
                      height={46}
                      className="rounded-full border"
                    />
                  ) : (
                    <ProfilePlaceholder className="border" />
                  )}
                  <h6>{u.nickname}</h6>
                </TableCell>
                <TableCell className="text-sliver text-sm">{u.email}</TableCell>
                <TableCell className="text-sliver text-sm">
                  {uppercaseFirstChar(u.role)}
                </TableCell>
                <TableCell>
                  <UserActionButtons value={u} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-8 flex justify-end">
        <Pagination totalPage={data.totalPage} currentPage={data.currentPage} />
      </div>
    </>
  );
}
