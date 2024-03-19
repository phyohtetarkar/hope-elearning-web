import Image from "next/legacy/image";
import Link from "next/link";
import Tooltip from "../Tooltip";
import { RiShareFill } from "@remixicon/react";

function LearningCourseGridItem() {
  return (
    <div className="card h-100" onContextMenu={(e) => e.preventDefault()}>
      <Link href="/course/100" className="ratio ratio-4x3">

        <Image
          src="/images/course.jpg"
          className="card-img-top bg-primary"
          alt=""
          layout="fill"
          objectFit="cover"
          priority
        />

      </Link>
      <div className="card-body">
        <Link href="/course/100" className="h5 text-decoration-none link-dark mb-1">
          
            Introduction to docker
          
        </Link>
        <div className="d-flex align-items-center small mb-3">
          <div className="text-muted">10 Sections</div>
          <div className="mx-2 text-muted">&bull;</div>
          <div className="text-primary">Beginner</div>
        </div>
        <Link href="/course/100/100" className="btn btn-primary">
          Continue learning
        </Link>
      </div>
      <div className="card-footer">
        <div className="vstack gap-2">
          <div className="d-flex align-items-center py-1">
            <Link
              href="/profile/100"
              className="d-flex align-items-center text-decoration-none link-dark">

              <Image
                src="/images/profile.png"
                width="30"
                height="30"
                alt=""
              />
              <div className="ms-2">Instructor</div>

            </Link>
            <div className="ms-auto d-flex gap-3 align-items-center">
              <div role="button">
                <Tooltip title="Share this course">
                  <RiShareFill size={18} className="text-muted" />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="progress mb-2" style={{ height: 6 }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{
                width: "50%",
              }}
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningCourseGridItem;
