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
import { AuditAction, Page } from "@/lib/models";
import {
  buildQueryParams,
  formatTimestamp,
  uppercaseFirstChar,
} from "@/lib/utils";
import { validateResponse } from "@/lib/validate-response";
import { BotIcon, CpuIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
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
            "flex items-center justify-center size-[46px] bg-gray-200 rounded-full"
          }
        >
          <CpuIcon className={"size-6 text-gray-600"} />
        </div>
      );
    }

    if (action.actorImage) {
      return (
        <Image
          alt="Profile"
          src={action.actorImage}
          width={0}
          height={0}
          sizes="33vh"
          className="rounded-full border size-[46px] bg-gray-200"
        />
      );
    }

    return <ProfilePlaceholder className="border" />;
  };

  const eventIcon = (action: AuditAction) => {
    if (action.event === "created") {
      return <PlusIcon className="size-3.5" />;
    }

    if (action.event === "updated") {
      return <PencilIcon className="size-3.5" />;
    }

    if (action.event === "deleted") {
      return <Trash2Icon className="size-3.5" />;
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
        <TableHeader className="hidden">
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              Audit
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {data.contents.map((a, i) => {
            return (
              <TableRow key={i}>
                <TableCell className="flex items-start space-x-3 min-w-[300px]">
                  <div className="relative flex-shrink-0">
                    {avatarUI(a)}
                    <div className="absolute right-[-2px] bottom-[-2px] size-[1.4rem] bg-white rounded-full shadow flex items-center justify-center">
                      {eventIcon(a)}
                    </div>
                  </div>
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
                      {formatTimestamp(a.createdAt, true)}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-8 flex justify-end mb-10">
        <Pagination totalPage={data.totalPage} currentPage={data.currentPage} />
      </div>
    </>
  );
}
