"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <Card className="shadow-none mb-3">
      <CardContent className="p-4">
        <div className="flex gap-3 items-center">
          <div className="relative flex-shrink-0">
            <Image
              src="/images/profile.png"
              width={60}
              height={60}
              alt=""
              sizes="50vh"
              className="rounded-full object-cover"
            />
          </div>
          <div className="truncate">
            <h6 className="mb-0">Naing</h6>
            <span className="text-gray-500 text-sm">
              theinmwenaing@gmail.com
            </span>
          </div>
          <div className="ms-auto">
            <div className="flex">
              <Link
                href={"/profile/setting"}
                className=" border-2 border-primary px-3 py-2 rounded-lg text-primary"
              >
                Edit
              </Link>
            </div>
          </div>
          {/* <div className="block lg:hidden">
            <Button variant="primary" size="icon" asChild>
              <span>
                <Edit size={20} />
              </span>
            </Button>
          </div> */}
        </div>
        <Separator className="mt-3" />
        <div className="text-gray-500 mt-3 mb-3">Overview</div>
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
