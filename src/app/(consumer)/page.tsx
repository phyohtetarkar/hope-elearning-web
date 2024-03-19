import Image from "next/image";
import { CSSProperties } from "react";
import QuoteSwiper from "./quote-swiper";
import { CourseGridItem } from "@/components/course";
import Tooltip from "@/components/Tooltip";

export default function Home() {
  return (
    <>
      <div className="bg-primary">
        <div className="container py-4 py-lg-5">
          <div className="row align-items-center py-4">
            <div className="col-12 col-lg-6 mb-5 mb-lg-0">
              <div className="vstack">
                <h1 className="display-3 fw-medium text-light">
                  Welcome to [sitename]
                </h1>
                <div className="text-light mb-4">
                  Hi, Welcome to [sitename]. Start a new career in the software
                  developing industry.
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex justify-content-center">
                <div
                  className="ratio ratio-16x9 ms-lg-auto"
                  style={
                    {
                      width: 500,
                    } as CSSProperties
                  }
                >
                  <Image
                    src="/images/banner.png"
                    alt=""
                    fill
                    sizes="50vh"
                    priority
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white px-3 border-bottom">
        <QuoteSwiper />
      </div>
      <div className="container py-5">
        <h3 className="mb-4">Recommended</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5">
          <div className="col">
            <CourseGridItem />
          </div>
          <div className="col">
            <CourseGridItem />
          </div>
          <div className="col">
            <CourseGridItem />
          </div>
          <div className="col">
            <CourseGridItem />
          </div>
          <div className="col">
            <CourseGridItem />
          </div>
          <div className="col">
            <CourseGridItem />
          </div>
        </div>

        <h3>Articles</h3>
      </div>
    </>
  );
}
