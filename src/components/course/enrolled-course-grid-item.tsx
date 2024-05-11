import { EnrolledCourse } from "@/lib/models";
import { uppercaseFirstChar } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

export function EnrolledCourseGridItem({ data }: { data: EnrolledCourse }) {
  return (
    <Card className="overflow-hidden shadow-none">
      <CardContent className="p-0">
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src={data.course.cover ?? "/images/placeholder.jpeg"}
            className="bg-primary object-cover"
            alt=""
            priority
            fill
            sizes="33vh"
          />
        </div>
        <div className="flex flex-col p-4">
          <Link
            href={`/courses/${data.course.slug}`}
            className="text-foreground font-medium text-lg line-clamp-2"
          >
            {data.course.title}
          </Link>
          <div className="flex items-center text-sm mb-4 mt-1">
            <div className="text-sliver">
              {uppercaseFirstChar(data.course.access)}
            </div>
            <div className="mx-2 text-sliver">&bull;</div>
            <div className="text-primary">
              {uppercaseFirstChar(data.course.level)}
            </div>
          </div>

          <Button asChild>
            {data.resumeLesson ? (
              <Link
                href={`/learn/${data.course.slug}/lessons/${data.resumeLesson.slug}`}
              >
                Resume course
              </Link>
            ) : (
              <Link href={`/learn/${data.course.slug}`}>Resume course</Link>
            )}
          </Button>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-4 bg-gray-50">
        <Progress
          className="h-3"
          indicatorClass="bg-success"
          value={data.progress}
        />
      </CardFooter>
    </Card>
  );
}
