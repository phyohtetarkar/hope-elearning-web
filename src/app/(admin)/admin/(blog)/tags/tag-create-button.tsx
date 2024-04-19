"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TagEdit from "./tag-edit";

export default function TagCreateButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button color="primary">New tag</Button>
      </DialogTrigger>

      <DialogContent
        className="top-[25%]"
        onInteractOutside={(evt) => evt.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Tag</DialogTitle>
        </DialogHeader>
        <TagEdit />
      </DialogContent>
    </Dialog>
  );
}
