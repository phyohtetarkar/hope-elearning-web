"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function ProfilePage() {
  const { user } = useContext(AuthenticationContext);

  return (
    <Card className="shadow-none mb-3">
      <CardContent className="px-6 py-4">
        <div className="flex gap-3 items-center">
          <div className="flex-shrink-0">
            <Image
              src={user?.image ?? "/images/profile.png"}
              width={0}
              height={0}
              alt="User image"
              sizes="50vh"
              className="rounded-full object-cover size-[60px] border bg-gray-200"
            />
          </div>
          <div className="truncate">
            <h6 className="mb-0">{user?.nickname}</h6>
            <span className="text-sliver text-sm">{user?.email}</span>
          </div>
          <div className="ms-auto">
            <Button variant="outline" className="border-primary" asChild>
              <Link href="/profile/setting" className="text-primary">
                Edit
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-3" />
        <div className="text-sliver mt-3 mb-3">Overview</div>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-0">
          <div className="flex-1 bg-default-100 border border-default-300 rounded lg:rounded-e-none lg:border-e-0">
            <div className="p-2">
              <h4 className="">0</h4>
              <span>Learnings</span>
            </div>
          </div>
          <div className="flex-1 bg-default-100 border border-default-300 rounded lg:rounded-s-none">
            <div className="p-2">
              <h4 className="">0</h4>
              <span>Bookmarks</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
