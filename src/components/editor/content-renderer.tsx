"use client";
import { cn } from "@/lib/utils";
import { mergeAttributes } from "@tiptap/core";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapLink from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/html";
import hljs from "highlight.js";
import { useEffect, useMemo, useRef } from "react";
import { CustomYoutube } from "./extensions/youtube";

export function ContentRenderer({ lexical }: { lexical?: string }) {
  const highlightedRef = useRef(false);
  const articleRef = useRef<HTMLElement>(null);
  const output = useMemo(() => {
    if (!lexical) {
      return "";
    }

    return generateHTML(JSON.parse(lexical), [
      Document,
      Heading.extend({
        renderHTML({ node, HTMLAttributes }) {
          const hasLevel = this.options.levels.includes(node.attrs.level);
          const level = hasLevel ? node.attrs.level : this.options.levels[0];
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              id: node.content.firstChild?.text
                ?.replaceAll(/\s+/g, "-")
                .toLowerCase(),
            }),
            0,
          ];
        },
      }),
      Text,
      Paragraph,
      CodeBlock.configure({
        HTMLAttributes: {
          class: cn(
            "!rounded bg-gray-800 text-gray-200 border p-5 font-mono font-medium"
          ),
          spellCheck: false,
        },
      }),
      Bold,
      ListItem,
      BulletList,
      OrderedList,
      TiptapLink,
      Underline,
      HorizontalRule,
      CustomYoutube,
    ]);
  }, [lexical]);

  useEffect(() => {
    if (highlightedRef.current || !output) {
      return;
    }
    articleRef.current?.querySelectorAll("code").forEach((block) => {
      hljs.highlightElement(block);
    });
    highlightedRef.current = true;
  }, [output]);

  return (
    <article
      ref={articleRef}
      className="prose max-w-none prose-pre:rounded tiptap"
      dangerouslySetInnerHTML={{ __html: output }}
    ></article>
  );
}
