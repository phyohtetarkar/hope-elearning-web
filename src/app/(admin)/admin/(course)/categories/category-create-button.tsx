"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategoryEdit from "./category-edit";

export default function CategoryCreateButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button color="primary">New category</Button>
      </DialogTrigger>

      <DialogContent
        className="top-[25%]"
        onInteractOutside={(evt) => evt.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <CategoryEdit />
      </DialogContent>
    </Dialog>
  );
}
