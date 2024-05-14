import { Post } from "@/lib/models";
import {
  formatAbbreviate,
  formatRelativeTimestamp,
  wordPerMinute,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";

export function BlogGridItem({ data }: { data: Post }) {
  return (
    <Card className="overflow-hidden shadow-none flex flex-col">
      <CardContent className="p-0 flex flex-col grow">
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src={data.cover ?? "/images/placeholder.jpeg"}
            className="bg-primary object-cover"
            alt=""
            priority
            fill
            sizes="33vh"
          />
        </div>
        {/* <Separator /> */}
        <div className="flex flex-col p-4 grow">
          <Link
            href={`/blogs/${data.slug}`}
            className="text-foreground font-semibold text-lg line-clamp-2"
          >
            {data.title}
          </Link>

          <div className="text-sm text-sliver mt-1">
            {formatRelativeTimestamp(data.publishedAt)}
          </div>

          <p className="font-light line-clamp-2 mt-2">{data.excerpt}</p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="px-4 py-3.5 bg-gray-50">
        <div className="text-sm text-sliver">
          {wordPerMinute(data.wordCount)} min read
        </div>
        <div className="flex-grow"></div>
        <div className="text-sm text-sliver">
          {formatAbbreviate(BigInt(data.meta?.viewCount ?? 0))} views
        </div>
      </CardFooter>
    </Card>
  );
}
