import {
    Card,
    CardContent,
    CardFooter,
    Separator,
} from "@elearning/ui";
import { Post } from "@elearning/lib/models";
import {
    formatAbbreviate,
    formatRelativeTimestamp,
    wordPerMinute,
} from "@elearning/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function BlogGridItem({ data }: { data: Post }) {
  return (
    <Card className="overflow-hidden shadow-none flex flex-col">
      <CardContent className="p-0 flex flex-col grow">
        <Link href={`/posts/${data.slug}`}>
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
        {/* <Separator /> */}
        <div className="flex flex-col p-4 grow">
          <Link
            href={`/posts/${data.slug}`}
            className="text-foreground font-semibold text-lg line-clamp-2"
          >
            {data.title ?? "(Untitled)"}
          </Link>

          <div className="text-sm text-muted-foreground mt-1">
            {formatRelativeTimestamp(data.publishedAt)}
          </div>

          <p className="font-light line-clamp-2 mt-2">{data.excerpt}</p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="px-4 py-3.5 bg-muted/50">
        <div className="text-sm text-muted-foreground">
          {wordPerMinute(data.wordCount)} min read
        </div>
        <div className="flex-grow"></div>
        <div className="text-sm text-muted-foreground">
          {formatAbbreviate(BigInt(data.meta?.viewCount ?? 0))} views
        </div>
      </CardFooter>
    </Card>
  );
}
