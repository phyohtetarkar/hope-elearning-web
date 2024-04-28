"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, Menu, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import CourseLessonsEdit from "./course-lessons-edit";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ChapterItem = ({ value }: { value: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: value, resizeObserverConfig: { disabled: true } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <AccordionItem
      value={`chapter-${value}`}
      className="bg-gray-100 rounded-md px-2 active:z-10"
      ref={setNodeRef}
      style={style}
    >
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <Menu
            className="size-5 cursor-move outline-none text-gray-500"
            {...attributes}
            {...listeners}
          />
          <h6 className="text-sm">Chapter {value}</h6>
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2">
        <CourseLessonsEdit />
        <TooltipProvider>
          <div className="flex gap-2 mt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" className="flex-shrink-0">
                  <Edit className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit chapter</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" className="flex-shrink-0">
                  <Plus className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add lesson</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" className="flex-shrink-0">
                  <Trash2 className="size-4 text-danger" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete chapter</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </AccordionContent>
    </AccordionItem>
  );
};

export default function CourseChaptersEdit() {
  const [chapters, setChapters] = useState([1, 2, 3]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setChapters((items) => {
        const oldIndex = items.findIndex((e) => e === active.id);
        const newIndex = items.findIndex((e) => e === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        return newItems;
      });
    }
  };

  return (
    <>
      <Accordion type="single" className="flex flex-col gap-2" collapsible>
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={chapters}
            strategy={verticalListSortingStrategy}
          >
            {chapters.map((c) => {
              return <ChapterItem key={c} value={c} />;
            })}
          </SortableContext>
        </DndContext>
      </Accordion>

      <div>
        <Button size="sm">Add chapter</Button>
      </div>
    </>
  );
}
