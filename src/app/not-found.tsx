import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <Image
          src={"/images/undraw_not_found.png"}
          alt="Not Found"
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="w-[600px]"
        />
        <p className="text-center">Could not find requested resource</p>
        <Link href="/" className="text-anchor underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
