"use client";

import {
    Button, Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@elearning/ui";
import { useState } from "react";
import TagEdit from "./tag-edit";

export default function TagCreateButton() {
  const [isOpen, setOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button color="primary">New tag</Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(evt) => evt.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Tag</DialogTitle>
        </DialogHeader>
        <TagEdit close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
