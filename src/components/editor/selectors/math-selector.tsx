import { FunctionIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "novel";

export const MathSelector = () => {
  const { editor } = useEditor();

  if (!editor) return null;

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          {editor.isActive("math") ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none w-14"
              onClick={(evt) => {
                editor.chain().focus().unsetLatex().run();
              }}
            >
              <FunctionIcon className={"size-6 text-primary"} />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none w-14"
              onClick={(evt) => {
                const { from, to } = editor.state.selection;
                const latex = editor.state.doc.textBetween(from, to);

                if (!latex) return;

                editor.chain().focus().setLatex({ latex }).run();
              }}
            >
              <FunctionIcon className={"size-6"} />
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent>
          LaTex
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
