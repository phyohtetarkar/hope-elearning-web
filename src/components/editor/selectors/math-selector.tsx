import { FunctionIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useEditor } from "novel";
import { useEffect, useRef } from "react";

export const MathSelector = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { editor } = useEditor();

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

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
            const { from, to, $anchor } = editor.state.selection;
            console.log($anchor);
            if (!$anchor.parent.isTextblock) {
              return;
            }

            if ($anchor.parent.type.name === "codeBlock") {
              return;
            }
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
