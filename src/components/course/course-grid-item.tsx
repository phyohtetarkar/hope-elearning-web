import Image from "next/image";
import Link from "next/link";
import Rating from "../ui/rating";
import { Bookmark } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Card, CardContent, CardFooter } from "../ui/card";

function CourseGridItem() {
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
            className="text-black font-medium text-lg text-nowrap"
          >
            Introduction to docker
          </Link>
          <div className="flex items-center text-small mb-2 mt-1">
            <div className="text-sliver">10 Sections</div>
            <div className="mx-2 text-sliver">&bull;</div>
            <div className="text-primary">Beginner</div>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="px-4 py-3.5">
        <Rating rating={4} />
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger className="ms-auto">
              <Bookmark size={20} className="text-sliver" />
            </TooltipTrigger>
            <TooltipContent>Add to bookmark</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}

export default CourseGridItem;
