"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skill } from "@/lib/models";
import { Edit, Trash2 } from "lucide-react";
import SkillEdit from "./skill-edit";

export default function SkillActionButtons({ skill }: { skill?: Skill }) {
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
            <TooltipContent>Edit skill</TooltipContent>
          </Tooltip>

          <DialogContent
            className="top-[25%]"
            onInteractOutside={(evt) => evt.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Edit Skill</DialogTitle>
            </DialogHeader>
            <SkillEdit />
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
          <TooltipContent>Delete skill</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
