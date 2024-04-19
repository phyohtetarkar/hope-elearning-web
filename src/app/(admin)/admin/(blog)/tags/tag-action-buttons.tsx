"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tag } from "@/lib/models";
import { Edit, Trash2 } from "lucide-react";
import TagEdit from "./tag-edit";

export default function TagActionButtons({ tag }: { tag?: Tag }) {
  return (
    <div className="flex justify-start gap-2">
      <TooltipProvider>
        <Dialog>
          <Tooltip delayDuration={300}>
            <TooltipTrigger>
              <DialogTrigger asChild>
                <Button variant="default" size="icon" asChild>
                  <span>
                    <Edit size={20} />
                  </span>
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Edit tag</TooltipContent>
          </Tooltip>

          <DialogContent className="top-[25%]" onInteractOutside={evt => evt.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Edit Tag</DialogTitle>
            </DialogHeader>
            <TagEdit/>
          </DialogContent>
        </Dialog>

        <Tooltip delayDuration={300}>
          <TooltipTrigger>
            <Button variant="destructive" size="icon" asChild>
              <span>
                <Trash2 size={20} />
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete tag</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
