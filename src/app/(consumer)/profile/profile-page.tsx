"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProfilePlaceholder } from "@/components/ui/profile-placeholder";
import { Separator } from "@/components/ui/separator";
import { UserMeta } from "@/lib/models";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function ProfilePage({ meta }: { meta?: UserMeta }) {
  const { user } = useContext(AuthenticationContext);

  return (
    <Card className="shadow-none mb-3">
      <CardContent className="p-4">
        <div className="flex gap-3 items-center">
          <div className="flex-shrink-0">
            {user?.image ? <Image
              src={user?.image}
              width={0}
              height={0}
              alt="User image"
              sizes="50vh"
              className="rounded-full object-cover size-[60px] border bg-gray-200"
            /> : <ProfilePlaceholder className="size-[60px]" iconClass="size-8" />}
          </div>
          <div className="truncate">
            <h6 className="mb-0">{user?.nickname}</h6>
            <span className="text-muted-foreground text-sm">{user?.email}</span>
          </div>
          <div className="ms-auto">
            <Button variant="outline" className="border-primary text-primary hover:text-primary" asChild>
              <Link href="/profile/setting">
                Edit
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-3" />
        <div className="mt-3 mb-3">Overview</div>
        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0">
          <div className="flex-1 bg-default-100 border border-default-300 rounded lg:rounded-e-none lg:border-e-0">
            <div className="p-4">
              <h4 className="mb-1">{formatNumber(meta?.enrollmentCount ?? 0)}</h4>
              <span>Learnings</span>
            </div>
          </div>
          <div className="flex-1 bg-default-100 border border-default-300 rounded lg:rounded-s-none">
            <div className="p-4">
              <h4 className="mb-1">{formatNumber(meta?.bookmarkCount ?? 0)}</h4>
              <span>Bookmarks</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
