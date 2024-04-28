"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@/lib/models";
import { Edit, Trash2 } from "lucide-react";

export default function UserActionButtons({ user }: { user?: User }) {
  return (
    <div className="flex justify-start gap-2">
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger>
            <Button variant="default" size="icon" asChild>
              <span>
                <Edit size={20} />
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit user</TooltipContent>
        </Tooltip>

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
