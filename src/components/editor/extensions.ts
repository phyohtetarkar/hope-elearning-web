import { cn } from "@/lib/utils";
import { mergeAttributes } from "@tiptap/core";
import { CharacterCount } from "@tiptap/extension-character-count";
import Heading from "@tiptap/extension-heading";
import {
  AIHighlight,
  GlobalDragHandle,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TiptapImage,
  TiptapLink,
  Youtube,
} from "novel/extensions";
import { UploadImagesPlugin } from "novel/plugins";
import { CustomCodeBlock } from "./extensions/codeblock";

// You can overwrite the placeholder with your own configuration
const aiHighlight = AIHighlight;

const placeholder = Placeholder.configure({});

const heading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    if (!this.editor?.isEditable) {
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          id: node.textContent.replaceAll(/\s+/g, "-").toLowerCase(),
        }),
        0,
      ];
    }
    return [`h${level}`, 0];
  },
});

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cn(
      "text-gray-600 underline underline-offset-[3px] hover:text-anchor transition-colors cursor-pointer"
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

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cn("opacity-40 rounded border"),
      }),
    ];
  },
}).configure({
  allowBase64: false,
  HTMLAttributes: {
    class: cn("rounded border mx-auto"),
  },
});

// const updatedImage = UpdatedImage.configure({
//   HTMLAttributes: {
//     class: cn("rounded border"),
//   },
// });

const youtube = Youtube.configure({
  HTMLAttributes: {
    class: cn("rounded border border-muted"),
  },
  inline: false,
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
  // gapcursor: false,
  heading: false,
});

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapLink,
  tiptapImage,
  heading,
  taskList,
  taskItem,
  aiHighlight,
  CustomCodeBlock,
  // CustomYoutube.configure({
  //   nocookie: true,
  //   width: 0,
  //   height: 0,
  // }),
  youtube,
  CharacterCount,
  GlobalDragHandle,
];
