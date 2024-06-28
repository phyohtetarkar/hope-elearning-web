"use client";

import { removeBookmark } from "@/lib/actions";
import { Course } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { uppercaseFirstChar } from "@/lib/utils";
import { LoaderCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import Rating from "../ui/rating";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
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
        description: "Removed bookmark",
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
        <div className="relative">
          <Link href={`/courses/${data.slug}`}>
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
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={isLoading}
                  variant="destructive"
                  size="icon"
                  onClick={handleRemove}
                  className="shadow-lg absolute top-2 right-2"
                >
                  {isLoading ? (
                    <LoaderCircle className="size-5 animate-spin" />
                  ) : (
                    <Trash2 className="size-5" />
                  )}
                </Button>
              </TooltipTrigger>

              <TooltipContent>Remove bookmark</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col grow p-4">
          <Link
            href={`/courses/${data.slug}`}
            className="text-foreground font-semibold text-lg line-clamp-2"
          >
            {data.title}
          </Link>
          <div className="text-sm text-primary mt-1">
            {uppercaseFirstChar(data.level)}
          </div>
          <div className="flex-grow"></div>
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
