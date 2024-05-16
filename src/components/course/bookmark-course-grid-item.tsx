"use client";

import { removeBookmark } from "@/lib/actions";
import { Course } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { uppercaseFirstChar } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import Rating from "../ui/rating";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";

export function BookmarkCourseGridItem({ data }: { data: Course }) {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRemove = async () => {
    try {
      setLoading(true);
      await removeBookmark(data.id, "/profile/bookmarks");
      toast({
        title: "Success",
        description: "Removed from bookmark",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden shadow-none flex flex-col">
      <CardContent className="p-0 grow flex flex-col">
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
        <div className="flex flex-col grow p-4">
          <Link
            href={`/courses/${data.slug}`}
            className="text-foreground font-medium text-lg line-clamp-2"
          >
            {data.title}
          </Link>
          <div className="mt-1 mb-5">
            <Rating rating={Number(data.meta?.rating ?? 0)} size="sm" />
          </div>
          <div className="flex-grow"></div>
          <Button
            disabled={isLoading}
            variant="destructive"
            onClick={handleRemove}
          >
            {isLoading && (
              <LoaderCircle className="mr-2 size-4 animate-spin" />
            )}
            Remove
          </Button>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="px-4 py-3.5 bg-gray-50">
        <div className="text-sm text-primary">
          {uppercaseFirstChar(data.level)}
        </div>
        <div className="flex-grow"></div>
        <div className="text-sm text-sliver font-medium">
          {uppercaseFirstChar(data.access)}
        </div>
      </CardFooter>
    </Card>
  );
}
