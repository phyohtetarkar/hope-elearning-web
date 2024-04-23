"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { deleteSkill } from "@/lib/actions";
import { Skill } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { Edit, LoaderCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import SkillEdit from "./skill-edit";

export default function SkillActionButtons({ skill }: { skill: Skill }) {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteSkill(skill.id);
      toast.success("Skill deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error(parseErrorResponse(error));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex justify-start gap-2">
      <TooltipProvider>
        <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
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
            <SkillEdit data={skill} close={() => setEditOpen(false)} />
          </DialogContent>
        </Dialog>

        <AlertDialog open={isAlertOpen} onOpenChange={setAlertOpen}>
          <Tooltip delayDuration={300}>
            <TooltipTrigger>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" asChild>
                  <span>
                    <Trash2 size={20} />
                  </span>
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Delete skill</TooltipContent>
          </Tooltip>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure to delete skill: &ldquo;{skill.name}&ldquo;?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <Button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TooltipProvider>
    </div>
  );
}
