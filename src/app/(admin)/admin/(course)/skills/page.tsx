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
import SkillActionButtons from "./skill-action-buttons";
import SkillCreateButton from "./skill-create-button";
import { API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { validateResponse } from "@/lib/validate-response";
import { Page, Skill } from "@/lib/models";

const getSkills = async () => {
  const url = `${API_URL}/admin/skills`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-store",
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<Skill>;
};

export default async function Skills() {
  const data = await getSkills();

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Skills</h2>
        <SkillCreateButton />
      </div>
      <Table>
        {data.contents.length === 0 && (
          <TableCaption className="text-start">No skills found</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              Skill
            </TableHead>
            <TableHead className="uppercase min-w-[300px]">Slug</TableHead>
            <TableHead className="uppercase min-w-[150px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {data.contents.map((s, i) => {
            return (
              <TableRow key={s.id}>
                <TableCell>
                  <h6>{s.name}</h6>
                </TableCell>
                <TableCell className="text-sliver text-sm">{s.slug}</TableCell>
                <TableCell>
                  <SkillActionButtons skill={s} />
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
