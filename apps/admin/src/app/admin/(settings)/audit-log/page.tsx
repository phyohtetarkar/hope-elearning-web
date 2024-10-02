import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { AuditAction, Page } from "@elearning/lib/models";
import {
  buildQueryParams,
  cn,
  formatRelativeTimestamp,
  uppercaseFirstChar,
} from "@elearning/lib/utils";
import {
  Pagination,
  ProfileAvatar,
  ProfilePlaceholder,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@elearning/ui";
import { CpuIcon, PencilIcon, PencilLineIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import AuditLogFilter from "./audit-log-filter";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const getAuditActions = async ({ searchParams }: Props) => {
  const query = buildQueryParams({ ...searchParams, limit: 10 });

  const url = `${API_URL_LOCAL}/admin/audit-actions${query}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-store",
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<AuditAction>;
};

export default async function AuditLog(props: Props) {
  const data = await getAuditActions(props);

  const avatarUI = (action: AuditAction) => {
    if (action.actorType === "system") {
      return (
        <div
          className={
            "flex items-center justify-center size-[46px] bg-default rounded-full"
          }
        >
          <CpuIcon className={"size-6 text-default-foreground"} />
        </div>
      );
    }

    if (action.actorImage) {
      return (
        <ProfileAvatar
          src={action.actorImage}
          prefix={action.actorName.substring(0, 2)}
          className="size-[46px]"
        />
      );
    }

    return <ProfilePlaceholder className="border" />;
  };

  const eventUI = (action: AuditAction) => {
    const baseClass = cn("px-2 py-1.5 rounded-full inline-flex items-center");
    if (action.event === "created") {
      return (
        <div className={cn([baseClass, "bg-success/20 text-success"])}>
          <PlusIcon className="size-3 me-1"/>
          Create
        </div>
      );
    }

    if (action.event === "updated") {
      return (
        <div className={cn([baseClass, "bg-primary/20 text-primary"])}>
          <PencilLineIcon className="size-3 me-1"/>
          Update
        </div>
      );
    }

    if (action.event === "deleted") {
      return (
        <div className={cn([baseClass, "bg-destructive/20 text-destructive"])}>
          <Trash2Icon className="size-3 me-1"/>
          Delete
        </div>
      );
    }

    return undefined;
  };

  const contextText = (action: AuditAction) => {
    if (!action.context) {
      return "";
    }
    const json = JSON.parse(action.context);
    return json["title"] ?? "";
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-between mb-5">
        <h2 className="text-nowrap">Audit Log</h2>
        <AuditLogFilter />
      </div>

      <Table>
        {data.contents.length === 0 && (
          <TableCaption className="text-start">No audit log</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              Audit
            </TableHead>
            <TableHead className="uppercase min-w-[200px]">Event</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {data.contents.map((a, i) => {
            return (
              <TableRow key={i}>
                <TableCell className="flex items-start space-x-3 min-w-[300px]">
                  <div className="relative flex-shrink-0">{avatarUI(a)}</div>
                  <div className="flex flex-col">
                    <span className="mb-0.5">
                      <span>{`${uppercaseFirstChar(a.resourceType)} ${
                        a.event
                      }: `}</span>
                      <span className="font-semibold">{contextText(a)}</span>
                      {a.count > 1 && <span>{` ${a.count} times `}</span>}
                      <span>{` -- by ${a.actorName}`}</span>
                    </span>
                    <span className="text-muted-foreground font-light">
                      {formatRelativeTimestamp(a.createdAt, true)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs uppercase font-medium">
                  {eventUI(a)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-8 flex justify-end mb-10">
        <Pagination
          totalPage={data.totalPage}
          currentPage={data.currentPage}
          search={buildQueryParams(props.searchParams)}
          LinkComponent={Link}
        />
      </div>
    </>
  );
}
