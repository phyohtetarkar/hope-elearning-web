"use client";

import { Button } from "@elearning/ui";
import { Lesson, Quiz } from "@elearning/lib/models";
import { useState } from "react";
import QuizEditDialog from "./quiz-edit-dialog";

export default function QuizCreateButton({
  lesson,
  index,
  afterSubmit,
}: {
  lesson: Lesson;
  index: number;
  afterSubmit?: (quiz: Quiz) => void;
}) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Add question
      </Button>
      <QuizEditDialog
        lesson={lesson}
        index={index}
        isOpen={isOpen}
        onOpenChange={setOpen}
        afterSubmit={afterSubmit}
      />
    </>
  );
}
