import { cn } from "@/lib/utils";
import { Node, mergeAttributes } from "@tiptap/core";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { EditorState } from "@tiptap/pm/state";
import katex, { KatexOptions } from "katex";

export interface MathematicsOptions {
  shouldRender: (
    state: EditorState,
    pos: number,
    node: ProseMirrorNode
  ) => boolean;
  katexOptions?: KatexOptions;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customCommand: {
      setLatex: ({ latex }: { latex: string }) => ReturnType;
      unsetLatex: ({ latex }: { latex: string }) => ReturnType;
    };
  }
}

export const Mathematics = Node.create<MathematicsOptions>({
  name: "math",
  inline: true,
  group: "inline",
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      latex: "",
    };
  },

  addOptions() {
    return {
      shouldRender: (state, pos, node) => {
        const $pos = state.doc.resolve(pos);
        return (
          node.type.name === "text" && $pos.parent.type.name !== "codeBlock"
        );
      },
      katexOptions: {
        throwOnError: false,
      },
      HTMLAttributes: {
        class: cn("text-foreground rounded p-1"),
      },
    };
  },

  addCommands() {
    return {
      setLatex:
        ({ latex }) =>
        ({ chain, state }) => {
          if (!latex) {
            return false;
          }

          const selection = state.selection;
          return chain()
            .deleteRange({ from: selection.from, to: selection.to })
            .insertContentAt(
              selection.from,
              {
                type: "math",
                attrs: {
                  latex: latex,
                },
              },
              {
                updateSelection: true,
              }
            )
            .run();
        },
      unsetLatex:
        ({ latex }) =>
        ({ chain, state }) => {
          const selection = state.selection;
          return chain()
            .deleteRange({
              from: selection.from,
              to: selection.to,
            })
            .insertContentAt(selection.from, latex, {
              updateSelection: true,
            })
            .run();
        },
    };
  },

  parseHTML() {
    return [{ tag: `span[data-type="${this.name}"]` }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const latex = node.attrs["latex"] ?? "";
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": this.name,
      }),
      latex,
    ];
  },

  renderText({ node }) {
    const latex = node.attrs["latex"] ?? "";
    return latex;
  },

  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      const dom = document.createElement("span");
      const latex: string = node.attrs["latex"] ?? "";

      Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
        dom.setAttribute(key, value);
      });

      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        dom.setAttribute(key, value);
      });

      if (editor.isEditable) {
        dom.classList.add("hover:bg-accent", "cursor-pointer");
      }

      dom.addEventListener("click", (evt) => {
        if (editor.isEditable && typeof getPos === "function") {
          const pos = getPos();
          const nodeSize = node.nodeSize;
          editor
            .chain()
            .setTextSelection({ from: pos, to: pos + nodeSize })
            .run();
        }
      });

      dom.contentEditable = "false";

      dom.innerHTML = katex.renderToString(latex, this.options.katexOptions);

      return {
        dom: dom,
      };
    };
  },
});
