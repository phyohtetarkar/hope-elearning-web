import { RiSearchLine } from "@remixicon/react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed-top">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white border-bottom"
        style={{ height: 70 }}
      >
        <div className="container">
          <Link href="/" className="navbar-brand">
            <div className="d-flex align-items-center">
              <div
                className="rounded bg-primary"
                style={{ width: 40, height: 40 }}
              ></div>
              <h4 className="mb-0 fw-semibold text-dark ms-2h">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </h4>
            </div>
          </Link>

          <div className="collapse navbar-collapse me-2">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href={"/courses"} className="nav-link">
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"/blogs"} className="nav-link">
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"/about-us"} className="nav-link">
                  About us
                </Link>
              </li>
            </ul>

            <div className="flex-grow-1"></div>

            <div className="navbar-nav hstack gap-2h">
              <div className="nav-item">
                <div
                  className="nav-link hstack"
                  role="button"
                  style={{ fontSize: 20 }}
                >
                  {/* <MagnifyingGlassIcon width={20} /> */}

                  <RiSearchLine size={20} />
                </div>
              </div>

              <div className="vr my-2"></div>

              <div className="nav-item">
                <Link href="/login" className="fw-medium nav-link">
                  Log In
                </Link>
              </div>
              <div className="nav-item">
                <Link href="/sign-up" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
