import LessonEditPage from "./lesson-edit-page";

export default function LessonEdit({
  params,
}: {
  params: { lessonId: string };
}) {
  const lessonId = parseInt(params.lessonId);
  return <LessonEditPage />;
}
