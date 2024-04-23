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
import { useState } from "react";

export default function SkillCreateButton() {
  const [isOpen, setOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button color="primary">New skill</Button>
      </DialogTrigger>

      <DialogContent onInteractOutside={(evt) => evt.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Skill</DialogTitle>
        </DialogHeader>
        <SkillEdit close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
