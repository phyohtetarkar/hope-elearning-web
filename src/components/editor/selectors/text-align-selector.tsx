import { AlignCenter, AlignLeft, AlignRight, ChevronDown } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TextAlignSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TextAlignSelector = ({
  open,
  onOpenChange,
}: TextAlignSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button className="gap-2 rounded-none" variant="ghost">
          <AlignCenter className="size-4" />
          <ChevronDown className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl "
        align="start"
      >
        <div className="flex flex-col">
          <EditorBubbleItem
            onSelect={() => {
              editor.chain().focus().setTextAlign("left").run();
            }}
            className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <AlignLeft className="size-4" />
              <span>Left</span>
            </div>
          </EditorBubbleItem>
          <EditorBubbleItem
            onSelect={() => {
              editor.chain().focus().setTextAlign("center").run();
            }}
            className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <AlignCenter className="size-4" />
              <span>Center</span>
            </div>
          </EditorBubbleItem>
          <EditorBubbleItem
            onSelect={() => {
              editor.chain().focus().setTextAlign("right").run();
            }}
            className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <AlignRight className="size-4" />
              <span>Right</span>
            </div>
          </EditorBubbleItem>
        </div>
      </PopoverContent>
    </Popover>
  );
};
