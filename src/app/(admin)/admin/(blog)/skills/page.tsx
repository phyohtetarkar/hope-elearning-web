import Pagination from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkillActionButtons from "./skill-action-buttons";
import SkillCreateButton from "./skill-create-button";

export default function Skills() {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Skills</h2>
        <SkillCreateButton />
      </div>
      <Table>
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
          <TableRow>
            <TableCell>
              <h6>Machine Learning</h6>
            </TableCell>
            <TableCell className="text-sliver text-sm">
              machine-learning
            </TableCell>
            <TableCell>
              <SkillActionButtons />
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
