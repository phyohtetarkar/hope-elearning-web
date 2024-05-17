"use client";
import { cn } from "@/lib/utils";
import { mergeAttributes } from "@tiptap/core";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import { CustomCodeBlock } from "./extensions/codeblock";
import { Youtube } from "novel/extensions";

export function ContentRenderer({ lexical }: { lexical?: string }) {
  const editor = useEditor({
    editorProps: {
      editable: () => false,
      attributes: {
        class: "prose max-w-none prose-pre:rounded tiptap",
      },
    },
    extensions: [
      Document,
      Heading.extend({
        renderHTML({ node, HTMLAttributes }) {
          const hasLevel = this.options.levels.includes(node.attrs.level);
          const level = hasLevel ? node.attrs.level : this.options.levels[0];
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              id: node.textContent.replaceAll(/\s+/g, "-").toLowerCase(),
            }),
            0,
          ];
        },
      }),
      Text,
      Paragraph,
      CustomCodeBlock,
      Code.configure({
        HTMLAttributes: {
          class: cn(
            "rounded-lg bg-gray-100 text-danger-600 px-1.5 py-1 font-mono font-medium"
          ),
          spellcheck: "false",
        },
      }),
      Bold,
      ListItem,
      BulletList,
      OrderedList,
      TiptapLink,
      Underline,
      Blockquote,
      Image.configure({
        HTMLAttributes: {
          class: cn("rounded-md border mx-auto"),
        },
      }),
      HorizontalRule,
      Youtube.configure({
        HTMLAttributes: {
          class: cn("rounded border border-muted"),
        },
        inline: false,
      }),
    ],
    content: lexical ? JSON.parse(lexical) : undefined,
  });

  return <EditorContent editor={editor} />;

  // return (
  //   <article
  //     ref={articleRef}
  //     className="prose max-w-none prose-pre:rounded tiptap"
  //     dangerouslySetInnerHTML={{ __html: output }}
  //   ></article>
  // );
}
