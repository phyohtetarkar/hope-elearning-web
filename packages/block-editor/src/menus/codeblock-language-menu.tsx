import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@elearning/ui";
import { cn } from "@elearning/lib/utils";
import { Editor } from "@tiptap/core";
import { FloatingMenu, useEditorState } from "@tiptap/react";
import { common } from "lowlight";
import { ChevronDownIcon } from "lucide-react";
import { useMemo } from "react";

export const CodeBlockLanguageMenu = ({
  editor,
}: {
  editor: Editor | null;
}) => {
  const languages = useMemo(() => {
    const list: string[] = [];
    for (const l in common) {
      list.push(l);
    }
    return list;
  }, []);

  if (!editor) {
    return null;
  }

  const editorState = useEditorState({
    editor,
    selector: (instance) => ({
      getLanguage: instance.editor.getAttributes("codeBlock").language,
    }),
  });

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
            if (node.type.name !== "codeBlock") {
              return;
            }
            
            nodePos = p;
            return false;
          });

          if (nodePos !== undefined) {
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
        return editor.isActive("codeBlock");
      }}
    >
      <Popover>
        <PopoverTrigger asChild>
          {editorState.getLanguage && (
            <Button className="shadow-lg" variant="outline" size="sm">
              {editorState.getLanguage}
              <ChevronDownIcon className="size-4 ms-1 text-default-foreground" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="w-fit p-1 max-h-[320px] overflow-y-auto shadow-xl"
          align="end"
        >
          {languages.map((l, i) => {
            return (
              <div
                key={i}
                className="hover:bg-accent p-1 rounded-md cursor-pointer"
                onClick={() => {
                  editor
                    .chain()
                    .focus(undefined, { scrollIntoView: false })
                    .setLanguage({ language: l })
                    .run();
                }}
              >
                <span>{l}</span>
              </div>
            );
          })}
        </PopoverContent>
      </Popover>
    </FloatingMenu>
  );
};
