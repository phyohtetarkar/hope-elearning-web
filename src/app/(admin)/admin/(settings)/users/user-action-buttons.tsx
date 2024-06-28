"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { updateUserRole } from "@/lib/actions";
import { User, UserRole } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { LoaderCircle, MoreHorizontal } from "lucide-react";
import { useContext, useState } from "react";

export default function UserActionButtons({ value }: { value: User }) {
  const { user } = useContext(AuthenticationContext);
  const [openRoleUpdate, setOpenRoleUpdate] = useState(false);
  const [isRoleUpdating, setRoleUpdating] = useState(false);

  const [role, setRole] = useState(value.role);

  const { toast } = useToast();

  const handleRoleUpdate = async () => {
    try {
      setRoleUpdating(true);
      await updateUserRole(value.id, role);
      setOpenRoleUpdate(false);
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setRoleUpdating(false);
    }
  };

  const isDisableRoleUpdate = () => {
    if (user?.id === value.id) {
      return true;
    }

    if (value?.role === "owner") {
      return true;
    }

    if (value.role === "admin" && user?.role !== "owner") {
      return true;
    }

    return false;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="default">
            <MoreHorizontal className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="shadow-xl">
          <DropdownMenuLabel className="font-semibold">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpenRoleUpdate(true);
            }}
          >
            Update role
          </DropdownMenuItem>
          <DropdownMenuItem>View subscriptions</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={openRoleUpdate}
        onOpenChange={(v) => {
          setOpenRoleUpdate(v);

          if (!v) {
            setRole(value.role);
          }
        }}
      >
        <DialogContent onInteractOutside={(evt) => evt.preventDefault()}>
          <DialogHeader className="mb-2">
            <DialogTitle>Update Role</DialogTitle>
          </DialogHeader>

          <RadioGroup
            className="mb-4 space-y-2"
            value={role}
            disabled={isDisableRoleUpdate()}
            onValueChange={(v) => {
              setRole(v as UserRole);
            }}
          >
            <div className="flex items-baseline space-x-2.5">
              <RadioGroupItem
                value="user"
                id="role-user"
                className="flex-shrink-0"
              />
              <div className="flex flex-col">
                <label htmlFor="role-user" className="font-semibold">
                  User
                </label>
                <p className="text-muted-foreground">
                  Just a normal user and cannot access to admin panel.
                </p>
              </div>
            </div>
            <div className="flex items-baseline space-x-2.5">
              <RadioGroupItem
                value="contributor"
                id="role-contributor"
                className="flex-shrink-0"
              />
              <div className="flex flex-col">
                <label htmlFor="role-contributor" className="font-semibold">
                  Contributor
                </label>
                <p className="text-muted-foreground">
                  Can write courses and posts, but cannot publish.
                </p>
              </div>
            </div>
            <div className="flex items-baseline space-x-2.5">
              <RadioGroupItem
                value="author"
                id="role-author"
                className="flex-shrink-0"
              />
              <div className="flex flex-col">
                <label htmlFor="role-author" className="font-semibold">
                  Author
                </label>
                <p className="text-muted-foreground">
                  Can create and publish new courses and posts.
                </p>
              </div>
            </div>
            <div className="flex items-baseline space-x-2.5">
              <RadioGroupItem
                value="admin"
                id="role-admin"
                className="flex-shrink-0"
                disabled={user?.role !== "owner"}
              />
              <div className="flex flex-col">
                <label htmlFor="role-admin" className="font-semibold">
                  Admin
                </label>
                <p className="text-muted-foreground">
                  Have full permissions to edit all data and settings.
                </p>
              </div>
            </div>
          </RadioGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                className="mt-2"
                disabled={isRoleUpdating}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="mt-2"
              disabled={isDisableRoleUpdate() || isRoleUpdating}
              onClick={handleRoleUpdate}
            >
              {isRoleUpdating && (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              )}
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
