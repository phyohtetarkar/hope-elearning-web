"use client";
import { RiBookmarkLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "react-aria-components";
import Tooltip from "../Tooltip";
import Rating from "../Rating";

function CourseGridItem() {
  return (
    <div className="card h-100">
      <Link href="/course/100" className="ratio ratio-4x3">
        <Image
          src="/images/course.jpg"
          className="card-img-top bg-primary"
          alt=""
          priority
          fill
          sizes="33vh"
          style={{
            objectFit: "cover",
          }}
        />
      </Link>
      <div className="card-body">
        <Link href="/course/100" className="h5 text-decoration-none link-dark">
          Introduction to docker
        </Link>
        <div className="d-flex align-items-center small mb-2 mt-1">
          <div className="text-muted">10 Sections</div>
          <div className="mx-2 text-muted">&bull;</div>
          <div className="text-primary">Beginner</div>
        </div>
        {/* <p className="mb-0 fw-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p> */}
      </div>
      <div className="card-footer">
        <div className="d-flex align-items-center py-1">
          <Rating rating={4} />
          <div className="ms-auto d-flex gap-3 align-items-center">
            <Tooltip title="Add to bookmarks">
              <Button className="btn btn-link p-0">
                <RiBookmarkLine size={20} className="text-muted" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseGridItem;
