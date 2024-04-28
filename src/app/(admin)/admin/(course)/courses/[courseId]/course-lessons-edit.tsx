"use client";
import { Button } from "@/components/ui/button";
import { Edit, Menu, Trash2 } from "lucide-react";
import Link from "next/link";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LessonItem = ({ value }: { value: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: value, resizeObserverConfig: { disabled: true } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-white rounded p-2 active:z-10"
    >
      <div className="flex items-center gap-2">
        <Menu
          className="size-5 cursor-move outline-none text-gray-500"
          {...attributes}
          {...listeners}
        />
        <h6 className="text-sm">Lesson {value}</h6>
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
              <Link href={`/admin/courses/1/lessons/1`}>
                <Edit className="size-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit lesson</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="destructive"
              className="size-8 flex-shrink-0"
            >
              <Trash2 className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete lesson</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default function CourseLessonsEdit() {
  const [lessons, setLessons] = useState([1, 2, 3]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLessons((items) => {
        const oldIndex = items.findIndex((e) => e === active.id);
        const newIndex = items.findIndex((e) => e === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        return newItems;
      });
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={lessons} strategy={verticalListSortingStrategy}>
        {lessons.map((l) => {
          return <LessonItem key={l} value={l} />;
        })}
      </SortableContext>
    </DndContext>
  );
}
