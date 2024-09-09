import { FunctionIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useEditor } from "novel";

export const MathSelector = () => {
  const { editor } = useEditor();

  if (!editor) return null;

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size='icon'
            className="rounded-none w-14"
            onClick={(evt) => {
              if (editor.isActive("math")) {
                editor.chain().focus().unsetLatex().run();
              } else {
                const { from, to } = editor.state.selection;
                const latex = editor.state.doc.textBetween(from, to);

                if (!latex) return;

                editor.chain().focus().setLatex({ latex }).run();
              }
            }}
          >
            <FunctionIcon
              className={cn("size-6", {
                "text-primary": editor.isActive("math"),
              })}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          LaTex
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
