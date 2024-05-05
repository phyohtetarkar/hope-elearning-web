import { cn } from "@/lib/utils";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import {
  AIHighlight,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TiptapImage,
  TiptapLink,
} from "novel/extensions";
import { CustomYoutube } from "./extensions/youtube";

// You can overwrite the placeholder with your own configuration
const aiHighlight = AIHighlight;

const placeholder = Placeholder.configure({});

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cn(
      "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer"
    ),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cn("not-prose pl-2"),
  },
});

const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cn("flex items-start my-4"),
  },
  nested: true,
});

// const horizontalRule = HorizontalRule.configure({
//   HTMLAttributes: {
//     class: cn("mt-10 mb-10 border-t"),
//   },
// });

const lowlight = createLowlight(common);

const codeBlockLowLight = CodeBlockLowlight.configure({
  HTMLAttributes: {
    class: cn(
      "rounded-md bg-gray-800 text-gray-200 border p-5 font-mono font-medium"
    ),
    spellCheck: false,
  },
  defaultLanguage: "plaintext",
  lowlight: lowlight,
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cn("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cn("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cn("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cn("border-l-4 border-gray-600"),
    },
  },
  codeBlock: false,
  code: {
    HTMLAttributes: {
      class: cn(
        "rounded-lg bg-gray-100 text-danger-600 px-1.5 py-1 font-mono font-medium"
      ),
      spellcheck: "false",
    },
  },
  horizontalRule: {
    HTMLAttributes: {
      class: cn("my-4"),
    },
  },
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
});

export const defaultExtensions = [
  starterKit,
  placeholder,
  TiptapLink,
  TiptapImage,
  taskList,
  taskItem,
  aiHighlight,
  codeBlockLowLight,
  CustomYoutube.configure({
    nocookie: true,
    width: 0,
    height: 0,
  }),
];
