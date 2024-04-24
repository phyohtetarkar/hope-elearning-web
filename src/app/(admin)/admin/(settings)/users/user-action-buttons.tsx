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
import { User } from "@/lib/models";
import { Edit, Trash2 } from "lucide-react";
import UserEdit from "./user-edit";

export default function UserActionButtons({ user }: { user?: User }) {
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
            <TooltipContent>Edit user</TooltipContent>
          </Tooltip>

          <DialogContent onInteractOutside={(evt) => evt.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <UserEdit data={user} />
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
          <TooltipContent>Delete user</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
