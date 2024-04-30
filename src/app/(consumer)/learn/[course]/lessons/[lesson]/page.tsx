import ResumeCoursePage from "./resume-course-page";

export default function ResumeCourse({
  params,
}: {
  params: { course: string; lesson: string };
}) {
  return <ResumeCoursePage />;
}
