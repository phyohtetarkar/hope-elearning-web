import { cn } from "@/lib/utils";
import { mergeAttributes } from "@tiptap/core";
import { CharacterCount } from "@tiptap/extension-character-count";
import Heading from "@tiptap/extension-heading";
import Table, { createColGroup } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import { DOMOutputSpec } from "@tiptap/pm/model";
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
import { Mathematics } from "./extensions/mathematics";

// You can overwrite the placeholder with your own configuration
const aiHighlight = AIHighlight;

const placeholder = Placeholder.configure({
  includeChildren: false,
});

const heading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    if (!this.editor?.isEditable && node.textContent) {
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          id: node.textContent.replaceAll(/\s+/g, "-").toLowerCase(),
        }),
        0,
      ];
    }
    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cn(
      "!text-foreground underline underline-offset-[3px] transition-colors cursor-pointer"
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

const textAlign = TextAlign.configure({
  types: ["heading", "paragraph", "math"],
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

const mathematics = Mathematics.configure({
  HTMLAttributes: {
    class: cn("text-foreground rounded p-1 katex-wrapper"),
  },
});

const TiptapTable = Table.extend({
  renderHTML({ node, HTMLAttributes }) {
    const { colgroup, tableWidth, tableMinWidth } = createColGroup(
      node,
      this.options.cellMinWidth
    );

    const table: DOMOutputSpec = [
      "div",
      {
        class: "table-wrapper overflow-y-auto my-[2em] not-draggable",
      },
      [
        "table",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: tableWidth
            ? `width: ${tableWidth}`
            : `minWidth: ${tableMinWidth}`,
        }),
        colgroup,
        ["tbody", 0],
      ],
    ];

    return table;
  },
}).configure({
  HTMLAttributes: {
    class: cn("not-prose table-auto border-collapse w-full not-draggable"),
  },
  lastColumnResizable: false,
  allowTableNodeSelection: true,
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
        "rounded-lg bg-muted text-red-700 dark:bg-muted/90 dark:text-red-400 px-1.5 py-1 font-mono font-medium before:content-none after:content-none"
      ),
      spellcheck: "false",
    },
  },
  horizontalRule: {
    HTMLAttributes: {
      class: cn("my-4 bg-border border-border"),
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
  textAlign,
  heading,
  taskList,
  taskItem,
  aiHighlight,
  CustomCodeBlock,
  youtube,
  CharacterCount,
  GlobalDragHandle,
  mathematics,
  TiptapTable,
  TableHeader.configure({
    HTMLAttributes: {
      class: cn(
        "bg-muted border border-default p-2 text-start min-w-[150px] font-semibold"
      ),
    },
  }),
  TableRow,
  TableCell.configure({
    HTMLAttributes: {
      class: cn("border border-default p-2 min-w-[150px] align-middle"),
    },
  }),
];
