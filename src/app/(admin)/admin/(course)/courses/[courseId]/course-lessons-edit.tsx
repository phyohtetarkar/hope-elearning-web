"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { deleteLesson, sortLessons } from "@/lib/actions";
import { Chapter, Course, Lesson } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { debounce } from "@/lib/utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, LoaderCircle, Menu, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const LessonItem = ({ course, value }: { course: Course; value: Lesson }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: value.id, resizeObserverConfig: { disabled: true } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteLesson(course.id, value.id);
      setOpenDelete(false);
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center space-x-2 bg-background border rounded-md p-2 active:z-10"
    >
      <Menu
        className="size-5 cursor-move outline-none text-gray-500 flex-shrink-0"
        {...attributes}
        {...listeners}
      />
      <div className="text-sm">
        <span className="font-semibold line-clamp-1">{value.title}</span>
        {value.trial && <span className="text-muted-foreground">Trial</span>}
      </div>
      <div className="flex-1"></div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="default"
              className="size-8 flex-shrink-0"
              asChild
            >
              <Link href={`/admin/courses/${course.id}/lessons/${value.id}`}>
                <Edit className="size-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit lesson</TooltipContent>
        </Tooltip>

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
            <TooltipContent>Delete lesson</TooltipContent>
          </Tooltip>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure to delete lesson: &ldquo;{value.title}&ldquo;?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <Button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
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

export default function CourseLessonsEdit({
  course,
  chapter,
}: {
  course: Course;
  chapter: Chapter;
}) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setLessons(chapter.lessons ?? []);
  }, [chapter]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLessons((items) => {
        const oldIndex = items.findIndex((e) => e.id === active.id);
        const newIndex = items.findIndex((e) => e.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        debouncedSortUpdate(newItems);

        return newItems;
      });
    }
  };

  const handleSort = useCallback(
    async (lessons: Lesson[]) => {
      try {
        await sortLessons(
          course.id,
          lessons.map((l, i) => ({ id: l.id, sortOrder: i }))
        );
      } catch (error) {
        toast({
          title: "Error",
          description: parseErrorResponse(error),
          variant: "destructive",
        });
      }
    },
    [course.id, toast]
  );

  const debouncedSortUpdate = useMemo(
    () => debounce(handleSort, 2000),
    [handleSort]
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={lessons} strategy={verticalListSortingStrategy}>
        {lessons.map((l, i) => {
          return <LessonItem key={l.id} course={course} value={l} />;
        })}
      </SortableContext>
    </DndContext>
  );
}
