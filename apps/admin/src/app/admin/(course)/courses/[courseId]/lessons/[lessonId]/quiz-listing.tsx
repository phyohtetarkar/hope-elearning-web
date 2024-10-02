"use client";

import { deleteQuiz, sortQuizzes } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    Checkbox,
    RadioButton,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    useToast,
} from "@elearning/ui";
import { Lesson, Quiz } from "@elearning/lib/models";
import { debounce } from "@elearning/lib/utils";
import { LoaderCircle, Menu, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import QuizCreateButton from "./quiz-create-button";
import QuizUpdateButton from "./quiz-update-button";

const QuizItem = ({
  lesson,
  quiz,
  update,
  remove,
}: {
  lesson: Lesson;
  quiz: Quiz;
  update: (quiz: Quiz) => void;
  remove: () => void;
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: quiz.id, resizeObserverConfig: { disabled: true } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteQuiz(lesson.chapter?.course?.id ?? 0, quiz.id);
      setOpenDelete(false);
      remove();
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const renderAnswers = () => {
    return quiz.answers.map((a) => {
      if (quiz.type === "short_answer") {
        return (
          <span key={a.id} className="text-sm italic mb-1">
            {a.answer}
          </span>
        );
      }
      return (
        <div key={a.id} className="flex items-center space-x-2 mb-1">
          {quiz.type === "multiple_choice" ? (
            <Checkbox checked={a.correct} onCheckedChange={() => {}} />
          ) : (
            <RadioButton checked={a.correct} />
          )}
          <label className="text-sm">{a.answer}</label>
        </div>
      );
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-2 bg-muted/50 border p-2 active:z-10"
    >
      <Menu
        className="size-5 cursor-move outline-none text-gray-500 flex-shrink-0"
        {...attributes}
        {...listeners}
      />
      <div className="flex flex-col">
        <div className="font-medium mb-2 text-base">{quiz.question}</div>
        {renderAnswers()}
      </div>
      <div className="flex-1"></div>

      <TooltipProvider>
        <QuizUpdateButton
          lesson={lesson}
          quiz={quiz}
          index={quiz.sortOrder}
          afterSubmit={update}
        />
        <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="destructive"
                  className="size-8 flex-shrink-0"
                >
                  <Trash2 className="size-4" />
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Delete quiz</TooltipContent>
          </Tooltip>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure to delete quiz: &ldquo;{quiz.question}&ldquo;?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <Button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting && (
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                )}
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TooltipProvider>
    </div>
  );
};

export default function QuizListing({ lesson }: { lesson: Lesson }) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setQuizzes(lesson.quizzes ?? []);
  }, [lesson]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setQuizzes((items) => {
        const oldIndex = items.findIndex((e) => e.id === active.id);
        const newIndex = items.findIndex((e) => e.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        debouncedSortUpdate(newItems);

        return newItems;
      });
    }
  };

  const handleSort = useCallback(
    async (quizzes: Quiz[]) => {
      try {
        await sortQuizzes(
          lesson.chapter?.course?.id ?? 0,
          quizzes.map((c, i) => ({ id: c.id, sortOrder: i })),
          `/admin/courses/${lesson.chapter?.course?.id}/lessons/${lesson.id}`
        );
      } catch (error) {
        toast({
          title: "Error",
          description: parseErrorResponse(error),
          variant: "destructive",
        });
      }
    },
    [lesson, toast]
  );

  const debouncedSortUpdate = useMemo(
    () => debounce(handleSort, 2000),
    [handleSort]
  );

  return (
    <div className="flex flex-col space-y-4">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={quizzes} strategy={verticalListSortingStrategy}>
          {quizzes.map((q, i) => {
            return (
              <QuizItem
                key={q.id}
                lesson={lesson}
                quiz={q}
                update={(quiz) => {
                  const list = [...quizzes];
                  list[i] = quiz;
                  setQuizzes(list);
                }}
                remove={() => {
                  const list = [...quizzes];
                  list.splice(i, 1);
                  setQuizzes(list);
                }}
              />
            );
          })}
        </SortableContext>
      </DndContext>
      <div className="">
        <QuizCreateButton
          lesson={lesson}
          index={lesson.quizzes?.length ?? 0}
          afterSubmit={(quiz) => {
            setQuizzes((old) => [...old, quiz]);
          }}
        />
      </div>
    </div>
  );
}
