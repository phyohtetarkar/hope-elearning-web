import Image from "next/legacy/image";
import Link from "next/link";

function CourseListItem() {
  return (
    <div className="card lifted-card" onContextMenu={(e) => e.preventDefault()}>
      <div className="row g-0">
        <div className="col-md-3">
          <div className="ratio ratio-4x3 h-100">
            <Image
              src="/images/course.jpg"
              className="rounded-start bg-primary d-none d-md-block"
              alt=""
              layout="fill"
              objectFit="cover"
            />
            <Image
              src="/images/course.jpg"
              className="rounded-top bg-primary d-block d-md-none"
              alt=""
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
        <div className="col-md-9">
          <div className="card-body h-100">
            <div className="d-flex flex-column h-100">
              <Link href="/course/100" className="h5 text-decoration-none link-dark">
                
                  Introduction to docker
                
              </Link>
              <div className="d-flex align-items-center small mb-2">
                <div className="text-muted">10 Sections</div>
                <div className="mx-2 text-muted">&bull;</div>
                <div className="text-primary">Beginner</div>
              </div>
              <div className="flex-grow-1"></div>
              <div className="d-flex align-items-center mt-2 mt-lg-0">
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
                     
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseListItem;
