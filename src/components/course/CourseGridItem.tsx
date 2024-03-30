import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Tooltip
} from "@nextui-org/react";
import { RiBookmarkLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import Rating from "../rating";

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
          <Link
            href="/course/100"
            className="h5 text-decoration-none link-dark"
          >
            Introduction to docker
          </Link>
          <div className="flex items-center text-small mb-2 mt-1">
            <div className="text-muted">10 Sections</div>
            <div className="mx-2 text-muted">&bull;</div>
            <div className="text-primary">Beginner</div>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex items-center w-full">
          <Rating rating={4} />
          <Tooltip content="Add to bookmark" color="foreground">
            <button className="ms-auto">
              <RiBookmarkLine size={20} className="text-muted" />
            </button>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CourseGridItem;
