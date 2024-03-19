import Link from "next/link";

export default function Footer() {
  const copyRight = `© ${new Date().getFullYear()} ${
    process.env.NEXT_PUBLIC_APP_NAME
  }`;

  return (
    <>
      <footer className="">
        <div className="container py-4 border-top">
          <div className="row align-items-center gap-2">
            <div className="col-12 col-lg-auto order-3 order-lg-1">
              <div className="text-nowrap text-muted text-opacity-50 my-auto small text-center">
                {copyRight}
              </div>
            </div>
            <div className="col order-2 order-lg-2"></div>
            <div className="col-12 col-lg-auto order-1 order-lg-3">
              <div className="hstack gap-4 justify-content-center small">
                <Link
                  href="/privacy-policy"
                  className="link-dark"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="link-dark"
                >
                  Terms
                </Link>
                <Link
                  href="/about-us"
                  className="link-dark"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
