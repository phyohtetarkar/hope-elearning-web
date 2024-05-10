import { formatAbbreviate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import Rating from "../ui/rating";
import { Separator } from "../ui/separator";

export function CourseGridItem() {
  return (
    <Card className="overflow-hidden shadow-none">
      <CardContent className="p-0">
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src="/images/course.jpg"
            className="bg-primary object-cover"
            alt=""
            priority
            fill
            sizes="33vh"
          />
        </div>
        <div className="flex flex-col p-4">
          <Link
            href="/course/100"
            className="text-foreground font-medium text-lg text-nowrap"
          >
            Introduction to docker
          </Link>
          <div className="flex items-center text-sm mb-2 mt-1">
            <div className="text-sliver">10 Chapters</div>
            <div className="mx-2 text-sliver">&bull;</div>
            <div className="text-primary">Beginner</div>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="px-4 py-3.5 bg-gray-50">
        <Rating rating={4} />
        <div className="flex-grow"></div>
        <div className="text-sm text-sliver font-medium">Free</div>
      </CardFooter>
    </Card>
  );
}
