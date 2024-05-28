import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="font-bold text-9xl mb-8">404</h1>
        <p className="text-center">Could not find requested resource</p>
        <Link href="/" className="text-primary underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
