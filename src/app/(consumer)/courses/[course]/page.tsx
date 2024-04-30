import { Metadata } from "next";
import CoursePage from "./course-page";

export const metadata: Metadata = {
  title: "Getting started with docker",
  description: "Start a new career in the software developing industry.",
};

export default function Course({ params }: { params: { course: string } }) {
  return <CoursePage />;
}
