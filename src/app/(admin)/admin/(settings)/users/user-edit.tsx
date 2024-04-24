"use client";

import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { User } from "@/lib/models";

function UserEdit({ data }: { data?: User }) {
  return (
    <form>
      <div className="gird grid-cols-1">
        <Input
          label="Username"
          id="username"
          type="text"
          wrapperClass="mb-4"
          placeholder="Enter username"
        />

        <Input
          label="Email"
          id="email"
          type="email"
          wrapperClass="mb-4"
          placeholder="Enter email"
        />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="default" className="mt-2">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="mt-2">
          Save
        </Button>
      </DialogFooter>
    </form>
  );
}

export default UserEdit;
