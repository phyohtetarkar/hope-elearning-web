import { cn } from "@/lib/utils";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

const lowlight = createLowlight(common);

export const CustomCodeBlock = CodeBlockLowlight.extend({
  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        if (editor.isActive("codeBlock")) {
          editor
            .chain()
            .command(({ tr }) => {
              tr.insertText("  ");
              return true;
            })
            .run();
        }
        return true;
      },
    };
  },
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: cn(
          "rounded !bg-gray-800 dark:!bg-gray-900 text-gray-200 border p-5 font-mono font-medium"
        ),
        spellcheck: false,
      },
      defaultLanguage: "plaintext",
      lowlight: lowlight,
    };
  },
  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      const language = node.attrs["language"] ?? this.options.defaultLanguage;

      const wrapper = document.createElement("div");
      wrapper.className = "relative";

      const pre = document.createElement("pre");

      if (editor.isEditable) {
        const select = document.createElement("select");
        select.className =
          "absolute bg-gray-800/50 text-white/70 rounded top-4 right-4 px-2 py-1";

        for (const l in common) {
          const option = document.createElement("option");
          const v = document.createAttribute("value");
          const t = document.createTextNode(l);
          v.value = l;
          option.appendChild(t);
          option.setAttributeNode(v);
          select.appendChild(option);
          option.selected = l === language;
        }

        select.addEventListener("change", (evt) => {
          const { value } = evt.target as any;

          if (editor.isEditable && typeof getPos === "function") {
            editor
              .chain()
              .focus(undefined, { scrollIntoView: false })
              .command(({ tr }) => {
                const position = getPos();
                const currentNode = tr.doc.nodeAt(position);

                tr.setNodeMarkup(position, undefined, {
                  ...currentNode?.attrs,
                  language: value,
                });

                return true;
              })
              .run();
          }
        });
        wrapper.append(select);
      } else {
        const button = document.createElement("button");
        button.className =
          "absolute text-sm rounded bg-gray-800/50 text-white/70 hover:text-white border border-white/70 hover:border-white top-3 right-3 px-2 py-0.5";
        button.textContent = "Copy";
        wrapper.append(button);

        button.addEventListener("click", (evt) => {
          navigator.clipboard.writeText(node.textContent);
          const target = evt.target as any;
          if (target) {
            target.textContent = "Copied!";
          }

          setTimeout(() => {
            if (target) {
              target.textContent = "Copy";
            }
          }, 2000);
        });
      }

      const code = document.createElement("code");
      pre.append(code);

      Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
        pre.setAttribute(key, value);
      });

      code.classList.add(`${this.options.languageClassPrefix}${language}`);

      wrapper.append(pre);

      return {
        dom: wrapper,
        contentDOM: code,
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) {
            return false;
          }

          const newLang =
            updatedNode.attrs["language"] ?? this.options.defaultLanguage;

          code.removeAttribute("class");
          code.classList.add(`${this.options.languageClassPrefix}${newLang}`);

          return true;
        },
      };
    };
  },
});
