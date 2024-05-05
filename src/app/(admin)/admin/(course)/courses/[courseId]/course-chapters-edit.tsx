"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { deleteChapter, sortChapters } from "@/lib/actions";
import { Chapter, Course } from "@/lib/models";
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
import { Edit, LoaderCircle, Menu, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChapterEdit from "./chapter-edit";
import CourseLessonsEdit from "./course-lessons-edit";
import LessonEdit from "./lesson-edit";

const ChapterItem = ({
  course,
  value,
  index,
}: {
  course: Course;
  value: Chapter;
  index: number;
}) => {
  const [openChapterEdit, setOpenChapterEdit] = useState(false);
  const [openLessonEdit, setOpenLessonEdit] = useState(false);
  const [openChapterDelete, setOpenChapterDelete] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const { toast } = useToast();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: value.id, resizeObserverConfig: { disabled: true } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteChapter(course.id, value.id);
      setOpenChapterDelete(false);
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
    <AccordionItem
      value={`chapter-${value.id}`}
      className="bg-gray-100 rounded-md px-2 active:z-10"
      ref={setNodeRef}
      style={style}
    >
      <AccordionTrigger>
        <div className="flex items-start gap-2">
          <Menu
            className="size-5 cursor-move outline-none text-gray-500 flex-shrink-0"
            {...attributes}
            {...listeners}
          />
          <h6 className="text-sm">{value.title}</h6>
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2">
        <CourseLessonsEdit course={course} chapter={value} />
        <TooltipProvider>
          <div className="flex gap-2 mt-2">
            <Dialog open={openChapterEdit} onOpenChange={setOpenChapterEdit}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="flex-shrink-0"
                    >
                      <Edit className="size-4" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Edit chapter</TooltipContent>
              </Tooltip>

              <DialogContent onInteractOutside={(evt) => evt.preventDefault()}>
                <DialogHeader>
                  <DialogTitle>Edit Chapter</DialogTitle>
                </DialogHeader>
                <ChapterEdit
                  course={course}
                  data={value}
                  index={index}
                  close={() => setOpenChapterEdit(false)}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={openLessonEdit} onOpenChange={setOpenLessonEdit}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="flex-shrink-0"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Add lesson</TooltipContent>
              </Tooltip>

              <DialogContent onInteractOutside={(evt) => evt.preventDefault()}>
                <DialogHeader>
                  <DialogTitle>Create Lesson</DialogTitle>
                </DialogHeader>
                <LessonEdit
                  course={course}
                  chapter={value}
                  close={() => setOpenLessonEdit(false)}
                />
              </DialogContent>
            </Dialog>

            <AlertDialog
              open={openChapterDelete}
              onOpenChange={setOpenChapterDelete}
            >
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="flex-shrink-0"
                    >
                      <Trash2 className="size-4 text-danger" />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Delete chapter</TooltipContent>
              </Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure to delete chapter: &ldquo;{value.title}&ldquo;?
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
                    Continue
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TooltipProvider>
      </AccordionContent>
    </AccordionItem>
  );
};

export default function CourseChaptersEdit({ course }: { course: Course }) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isOpen, setOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setChapters(course.chapters ?? []);
  }, [course]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setChapters((items) => {
        const oldIndex = items.findIndex((e) => e.id === active.id);
        const newIndex = items.findIndex((e) => e.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        debouncedSortUpdate(newItems);

        return newItems;
      });
    }
  };

  const handleSort = useCallback(
    async (chapters: Chapter[]) => {
      try {
        await sortChapters(
          course.id,
          chapters.map((c, i) => ({ id: c.id, sortOrder: i }))
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
    <>
      <Accordion type="multiple" className="flex flex-col gap-2">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={chapters}
            strategy={verticalListSortingStrategy}
          >
            {chapters.map((c, i) => {
              return (
                <ChapterItem key={c.id} course={course} value={c} index={i} />
              );
            })}
          </SortableContext>
        </DndContext>
      </Accordion>

      <div>
        <Dialog open={isOpen} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Add chapter</Button>
          </DialogTrigger>

          <DialogContent onInteractOutside={(evt) => evt.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Create Chapter</DialogTitle>
            </DialogHeader>
            <ChapterEdit
              course={course}
              index={chapters.length}
              close={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
