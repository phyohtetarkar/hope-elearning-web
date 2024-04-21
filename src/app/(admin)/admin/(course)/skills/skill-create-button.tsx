"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SkillEdit from "./skill-edit";

export default function SkillCreateButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button color="primary">New skill</Button>
      </DialogTrigger>

      <DialogContent
        className="top-[25%]"
        onInteractOutside={(evt) => evt.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Skill</DialogTitle>
        </DialogHeader>
        <SkillEdit />
      </DialogContent>
    </Dialog>
  );
}
