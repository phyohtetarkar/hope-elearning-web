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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteSkill } from "@/lib/actions";
import { toast } from "react-toastify";
import { parseErrorResponse } from "@/lib/parse-error-response";

export default function SkillActionButtons({ skill }: { skill: Skill }) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const success = await deleteSkill(skill.id);
      if (success) {
        router.refresh();
        toast.success("Skill deleted successfully");
      } else {
        toast.error("Failed to delete skill");
      }
    } catch (error) {
      toast.error(parseErrorResponse(error));
    }
  };

  return (
    <div className="flex justify-start gap-2">
      <TooltipProvider>
        <Dialog open={isOpen} onOpenChange={setOpen}>
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
            <SkillEdit data={skill} close={() => setOpen(false)} />
          </DialogContent>
        </Dialog>

        <Tooltip delayDuration={300}>
          <TooltipTrigger>
            <Button
              variant="destructive"
              size="icon"
              asChild
              onClick={handleDelete}
            >
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
