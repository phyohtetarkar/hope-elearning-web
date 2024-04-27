import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default function Courses(props: Props) {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Courses</h2>
        <Button asChild>
          <Link href="/admin/courses/new">New course</Link>
        </Button>
      </div>
    </>
  );
}
