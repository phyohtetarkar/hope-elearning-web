import { cn } from "@/lib/utils";
import { FloatingMenu } from "@tiptap/react";
import {
  Columns,
  MoreHorizontal,
  RectangleHorizontal,
  Rows,
} from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function TableFloatingMenu() {
  const { editor } = useEditor();

  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{
        placement: "top-end",
        appendTo: "parent",
        duration: 100,
        zIndex: 0,
        offset: [0, 8],
        getReferenceClientRect: () => {
          const { ranges } = editor.state.selection;
          const from = Math.min(...ranges.map((range) => range.$from.pos));
          const to = Math.max(...ranges.map((range) => range.$to.pos));

          let nodePos: number | undefined = undefined;

          editor.state.doc.nodesBetween(from, to, (node, p) => {
            nodePos = p;
            return false;
          });

          if (nodePos) {
            const node = editor.view.nodeDOM(nodePos) as HTMLElement;

            if (node) {
              return node.getBoundingClientRect();
            }
          }

          return editor.view.dom.getBoundingClientRect();
        },
      }}
      className={cn("flex w-fit max-w-[90vw] space-x-0.5")}
      shouldShow={({ editor }) => {
        return editor.isActive("table");
      }}
    >
      <TooltipProvider delayDuration={300}>
        <Popover>
          <Tooltip>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  className="drop-shadow-lg"
                  variant="outline"
                  size="icon"
                >
                  <Columns className="size-5" />
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <TooltipContent>
              Column
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
          <PopoverContent
            className="flex max-h-80 w-40 p-1 flex-col overflow-hidden overflow-y-auto rounded border shadow-xl"
            align="end"
          >
            <div className="flex flex-col">
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().addColumnBefore().run();
                }}
                className="px-2 py-1.5 text-sm hover:bg-accent"
                role="button"
              >
                Add column before
              </EditorBubbleItem>
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().addColumnAfter().run();
                }}
                className="px-2 py-1.5 text-sm hover:bg-accent"
                role="button"
              >
                Add column after
              </EditorBubbleItem>
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().deleteColumn().run();
                }}
                className="px-2 py-1.5 text-sm text-destructive hover:bg-accent"
                role="button"
              >
                Delete column
              </EditorBubbleItem>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <Tooltip>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  className="drop-shadow-lg"
                  variant="outline"
                  size="icon"
                >
                  <Rows className="size-5" />
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <TooltipContent>
              Row
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
          <PopoverContent
            className="flex max-h-80 w-40 p-1 flex-col overflow-hidden overflow-y-auto rounded border shadow-xl"
            align="end"
          >
            <div className="flex flex-col">
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().addRowBefore().run();
                }}
                className="px-2 py-1.5 text-sm hover:bg-accent"
                role="button"
              >
                Add row before
              </EditorBubbleItem>
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().addRowAfter().run();
                }}
                className="px-2 py-1.5 text-sm hover:bg-accent"
                role="button"
              >
                Add row after
              </EditorBubbleItem>
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().deleteRow().run();
                }}
                className="px-2 py-1.5 text-sm text-destructive hover:bg-accent"
                role="button"
              >
                Delete row
              </EditorBubbleItem>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <Tooltip>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  className="drop-shadow-lg"
                  variant="outline"
                  size="icon"
                >
                  <RectangleHorizontal className="size-5" />
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <TooltipContent>
              Cell
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
          <PopoverContent
            className="flex max-h-80 w-40 p-1 flex-col overflow-hidden overflow-y-auto rounded border shadow-xl"
            align="end"
          >
            <div className="flex flex-col">
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().mergeCells().run();
                }}
                className="px-2 py-1.5 text-sm hover:bg-accent"
                role="button"
              >
                Merge cells
              </EditorBubbleItem>
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().splitCell().run();
                }}
                className="px-2 py-1.5 text-sm hover:bg-accent"
                role="button"
              >
                Split cell
              </EditorBubbleItem>
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().toggleHeaderCell().run();
                }}
                className="px-2 py-1.5 text-sm hover:bg-accent"
                role="button"
              >
                Toggle header cell
              </EditorBubbleItem>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <Tooltip>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  className="drop-shadow-lg"
                  variant="outline"
                  size="icon"
                >
                  <MoreHorizontal className="size-5" />
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <TooltipContent>
              Options
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
          <PopoverContent
            className="flex max-h-80 w-40 p-1 flex-col overflow-hidden overflow-y-auto rounded border shadow-xl"
            align="end"
          >
            <div className="flex flex-col">
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().toggleHeaderRow().run();
                }}
                className="px-2 py-1.5 text-sm hover:bg-accent"
                role="button"
              >
                Toggle header row
              </EditorBubbleItem>
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().toggleHeaderColumn().run();
                }}
                className="px-2 py-1.5 text-sm hover:bg-accent"
                role="button"
              >
                Toggle header col
              </EditorBubbleItem>
              <EditorBubbleItem
                onSelect={() => {
                  editor.chain().focus().deleteTable().run();
                }}
                className="px-2 py-1.5 text-sm text-destructive hover:bg-accent"
                role="button"
              >
                Delete table
              </EditorBubbleItem>
            </div>
          </PopoverContent>
        </Popover>
      </TooltipProvider>
    </FloatingMenu>
  );
}
