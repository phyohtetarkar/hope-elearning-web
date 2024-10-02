import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

const lowlight = createLowlight(common);

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    codeBlockCommand: {
      setLanguage: ({ language }: { language: string }) => ReturnType;
    };
  }
}

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
      HTMLAttributes: {},
      defaultLanguage: "plaintext",
      lowlight: lowlight,
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setLanguage:
        ({ language }) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, {
            language: !language ? this.options.defaultLanguage : language,
          });
        },
    };
  },
  // addNodeView() {
  //   return ({ node }) => {
  //     const language = node.attrs["language"] ?? this.options.defaultLanguage;
  //     const pre = document.createElement("pre");

  //     Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
  //       pre.setAttribute(key, value);
  //     });

  //     const code = document.createElement("code");
  //     pre.append(code);

  //     code.classList.add(`${this.options.languageClassPrefix}${language}`);

  //     return {
  //       dom: pre,
  //       contentDOM: code,
  //       // update: (updatedNode) => {
  //       //   if (updatedNode.type !== this.type) {
  //       //     return false;
  //       //   }

  //       //   const newLang =
  //       //     updatedNode.attrs["language"] ?? this.options.defaultLanguage;

  //       //   code.removeAttribute("class");
  //       //   code.classList.add(`${this.options.languageClassPrefix}${newLang}`);

  //       //   return true;
  //       // },
  //     };
  //   };
  // },
});
