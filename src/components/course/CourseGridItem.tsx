import { Card, CardBody, CardFooter } from "@nextui-org/card";
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

function CourseGridItem() {
  return (
    <Card shadow="none" className="border">
      <CardBody className="p-0">
        <div className="aspect-w-4 aspect-h-3">
          <Image
            src="/images/course.jpg"
            className="bg-primary"
            alt=""
            priority
            fill
            sizes="33vh"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className="flex flex-col p-4">
          <Link href="/course/100" className="text-black font-medium text-lg">
            Introduction to docker
          </Link>
          <div className="flex items-center text-small mb-2 mt-1">
            <div className="text-sliver">10 Sections</div>
            <div className="mx-2 text-sliver">&bull;</div>
            <div className="text-primary">Beginner</div>
          </div>
        </div>
      </CardBody>
      <Separator />
      <CardFooter>
        <div className="flex items-center w-full">
          <Rating rating={4} />
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger className="ms-auto">
                <Bookmark size={20} className="text-sliver" />
              </TooltipTrigger>
              <TooltipContent>Add to bookmark</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CourseGridItem;
