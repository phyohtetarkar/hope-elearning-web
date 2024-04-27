import CourseEditPage from "./course-edit-page";

export default function CourseEdit({ params }: { params: { courseId: string } }) {
  const courseId = parseInt(params.courseId);

  return <CourseEditPage />;
}
