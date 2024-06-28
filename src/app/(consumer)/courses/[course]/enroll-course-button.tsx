"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { enrollCourse } from "@/lib/actions";
import { Course } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useState } from "react";

export default function EnrollCourseButton({
  course,
  className,
  revalidate,
  children,
}: {
  course?: Course;
  className?: string;
  revalidate?: string;
  children?: ReactNode;
}) {
  const { user } = useContext(AuthenticationContext);
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleEnrollment = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (course?.access === "premium" && user.expiredAt < new Date().getTime()) {
      router.push("/pricing");
      return;
    }
    try {
      setLoading(true);
      await enrollCourse(course?.id ?? 0, revalidate);
      toast({
        title: "Success",
        description: "Course enrollment success",
        variant: "success",
        // action: (
        //   <ToastAction altText="Start learning course" asChild>
        //     <Link
        //       href={`/learn/${course.slug}/lessons/${enrolledCourse?.resumeLesson?.slug}`}
        //     >
        //       Resume
        //     </Link>
        //   </ToastAction>
        // ),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleEnrollment}
      disabled={isLoading}
      className={className}
    >
      {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
