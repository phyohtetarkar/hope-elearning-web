import { FunctionIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useEditor } from "novel";

export const MathSelector = () => {
  const { editor } = useEditor();

  if (!editor) return null;

  return (
    <>
      {editor.isActive("math") ? (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-none w-14"
          onClick={(evt) => {
            const latex = editor.getAttributes("math").latex;

            if (!latex) return;

            editor.chain().focus().unsetLatex({ latex }).run();
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
            latex && editor.chain().focus().setLatex({ latex }).run();
          }}
        >
          <FunctionIcon className={"size-6"} />
        </Button>
      )}
    </>
  );
};
