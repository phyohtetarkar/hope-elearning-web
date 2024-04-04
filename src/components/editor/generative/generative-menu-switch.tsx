import { EditorBubble, useEditor } from "novel";
import React, { Fragment, useEffect, type ReactNode } from "react";
import { AISelector } from "./ai-selector";
import { removeAIHighlight } from "novel/extensions";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface GenerativeMenuSwitchProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor();

  useEffect(() => {
    if (!open && editor) {
      removeAIHighlight(editor);
    }
  }, [open, editor]);
  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false);
          editor?.chain().unsetHighlight().run();
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border bg-background shadow-xl"
    >
      {open && <AISelector open={open} onOpenChange={onOpenChange} />}
      {!open && (
        <div className="flex w-fit h-10">
          <Button
            className="gap-1 rounded-none text-purple-500 h-full"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="sm"
          >
            <Sparkles size={20} fill="currentColor"  />
            Ask AI
          </Button>
          {children}
        </div>
      )}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
