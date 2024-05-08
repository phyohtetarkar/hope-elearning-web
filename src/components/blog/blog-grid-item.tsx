import { formatAbbreviate, formatTimestamp, wordPerMinute } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";

export function BlogGridItem({ excerpt }: { excerpt?: boolean }) {
  return (
    <Card className="overflow-hidden shadow-none flex flex-col">
      <CardContent className="p-0 flex flex-col grow">
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
        <div className="flex flex-col p-4 grow">
          <Link
            href={`/blogs/100`}
            className="text-foreground font-semibold text-lg text-nowrap"
          >
            Introduction to docker
          </Link>

          <div className="text-sm text-sliver">
            {formatTimestamp(new Date().getTime())}
          </div>

          <p className="font-light line-clamp-2 mt-2">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="px-4 py-3.5 bg-gray-50">
        <div className="text-sm text-sliver">{wordPerMinute(200)} min read</div>
        <div className="flex-grow"></div>
        <div className="text-sm text-sliver">
          {formatAbbreviate(2000)} views
        </div>
      </CardFooter>
    </Card>
  );
}
