import {
    Card,
    CardContent,
    CardFooter,
    Rating,
    Separator,
} from "@elearning/ui";
import { Course } from "@elearning/lib/models";
import { formatAbbreviate, uppercaseFirstChar } from "@elearning/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function CourseGridItem({ data }: { data: Course }) {
  return (
    <Card className="overflow-hidden shadow-none flex flex-col">
      <CardContent className="p-0 flex flex-col grow">
        <Link href={`/courses/${data.slug}`}>
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src={data.cover ?? require("@elearning/assets/images/placeholder.jpg")}
              className="bg-primary object-cover"
              alt=""
              priority
              fill
              sizes="33vh"
            />
          </div>
        </Link>
        <div className="flex flex-col p-4">
          <Link
            href={`/courses/${data.slug}`}
            className="text-foreground font-semibold text-lg line-clamp-2"
          >
            {data.title}
          </Link>
          <div className="flex items-center text-sm mb-2 mt-1">
            <div className="text-muted-foreground">
              {formatAbbreviate(BigInt(data.meta?.enrolledCount ?? 0))} enrolled
            </div>
            <div className="mx-2 text-muted-foreground">&bull;</div>
            <div className="text-primary">{uppercaseFirstChar(data.level)}</div>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="px-4 py-3.5 bg-muted/50">
        <Rating rating={Number(data.meta?.rating ?? 0)} />
        <div className="flex-grow"></div>
        <div className="text-sm text-muted-foreground font-medium">
          {uppercaseFirstChar(data.access)}
        </div>
      </CardFooter>
    </Card>
  );
}
