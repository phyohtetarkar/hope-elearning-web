import { cn } from "@/lib/utils";
import {
  InputRule,
  Mark,
  Node,
  PasteRule,
  mergeAttributes,
} from "@tiptap/core";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { EditorState } from "@tiptap/pm/state";
import katex, { KatexOptions } from "katex";

/**
 * Matches latex expression.
 */
export const inputRegex = /\$([^\$]*)\$/;

/**
 * Matches latex expression while pasting.
 */
export const pasteRegex = /\$([^\$]*)\$/gi;

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
      renderLatex: () => ReturnType;
    };
  }
}

const LatexMark = Mark.create({
  name: "latex",
  exitable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: cn(
          "bg-gray-800 text-white dark:bg-gray-100 dark:text-red-500 rounded px-1.5 py-1 font-mono"
        ),
        spellcheck: false,
      },
    };
  },

  renderHTML({ mark, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "latex"
      }),
      0,
    ];
  },
});

export const Mathematics = Node.create<MathematicsOptions>({
  name: "math",
  inline: true,
  group: "inline",
  selectable: true,
  atom: true,

  addExtensions() {
    return [LatexMark];
  },

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
      katexOptions: undefined,
      HTMLAttributes: {
        class: cn("text-foreground rounded p-1"),
      },
    };
  },

  addCommands() {
    return {
      renderLatex:
        () =>
        ({ state, chain }) => {
          const pos = state.selection.$anchor.pos;
          state.doc.descendants((node, p) => {
            if (!node.isText) return;

            if (node.marks.length === 0) return;

            const mark = node.marks[0];

            if (mark.type.name !== "latex") return;

            const end = p + node.nodeSize;

            if (pos < p || pos > end) {
              const latex = node.text ?? "";
              chain()
                .deleteRange({ from: p, to: end })
                .insertContentAt(p, {
                  type: "math",
                  attrs: {
                    latex: latex,
                  },
                });
            }
          });
          return true;
        },
    };
  },

  addInputRules() {
    return [
      new InputRule({
        find: inputRegex,
        handler: ({ state, range, match, chain }) => {
          const { tr } = state;
          const start = range.from;
          let end = range.to;

          if (match[1]) {
            const attributes = {
              latex: match[1],
            };
            this.storage.latex = match[1];
            // const newNode = this.type.create(attributes);
            const offset = match[0].lastIndexOf(match[1]);
            let matchStart = start + offset;

            if (matchStart > end) {
              matchStart = end;
            } else {
              end = matchStart + match[1].length;
            }

            // insert last typed character
            // const lastChar = match[0][match[0].length - 1];

            // tr.insertText(lastChar, start + match[0].length - 1);

            // insert node from input rule
            // tr.replaceWith(start, end, newNode);
            chain()
              .setTextSelection({ from: start + 1, to: end })
              .setMark("latex")
              .setTextSelection(end)
              .deleteRange({ from: start, to: start + 1 })
              .run();
          }

          tr.scrollIntoView();
        },
      }),
    ];
  },

  addPasteRules() {
    return [
      new PasteRule({
        find: pasteRegex,
        handler: ({ match, chain, range, pasteEvent }) => {
          console.log(match);
          if (match.input) {
            chain()
              .deleteRange(range)
              .insertContentAt(range.from, {
                type: this.type.name,
                attrs: {
                  latex: match[1] ?? "",
                },
              });
          }
        },
      }),
    ];
  },

  parseHTML() {
    return [{ tag: 'span[data-type="latex"]' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const latex = node.attrs["latex"] ?? "";
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        contenteditable: "false",
        "data-type": "latex",
      }),
      `$${latex}$`,
    ];
  },

  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      const span = document.createElement("span");
      const latex: string = node.attrs["latex"] ?? "";

      Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
        span.setAttribute(key, value);
      });

      if (editor.isEditable) {
        span.classList.add("hover:bg-accent", "cursor-pointer");
      }

      span.addEventListener("click", (evt) => {
        if (editor.isEditable && typeof getPos === "function") {
          const pos = getPos();
          const nodeSize = node.nodeSize;
          editor
            .chain()
            .deleteRange({ from: pos, to: pos + nodeSize })
            .insertContentAt(pos, latex)
            .setTextSelection({ from: pos, to: pos + latex.length })
            .setMark("latex")
            .setTextSelection(pos + 1)
            .run();
        }
      });

      span.setAttribute("contenteditable", "false");

      span.innerHTML = katex
        .renderToString(latex, {
          throwOnError: false,
        })
        .trim();

      return {
        dom: span,
      };
    };
  },

  onSelectionUpdate() {
    this.editor.commands.renderLatex();
  },
});
