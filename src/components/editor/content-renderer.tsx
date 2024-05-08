"use client";
import hljs from "highlight.js";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import CodeBlock from "@tiptap/extension-code-block-lowlight";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { generateHTML } from "@tiptap/html";
import { useEffect, useMemo } from "react";
import { CustomYoutube } from "./extensions/youtube";

const json = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Java: A Brief Introduction",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Java",
        },
        {
          type: "text",
          text: ' is a high-level, class-based, object-oriented programming language that is designed to have as few implemedntation dependencies as possible. It is a general-purpose programming language intended to let programmers "write once, run anywhere" (WORA), measssning that compiled Java code can run on all platforms that support Java without the need to recompile.',
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Syntax:",
        },
        {
          type: "text",
          text: ' Java has a C-like syntax. Here\'s a simple "Hello, world!" program in Java:',
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: "java",
      },
      content: [
        {
          type: "text",
          text: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, world!");\n    }\n}',
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Features:",
        },
        {
          type: "text",
          text: " Java is a powerful language with a vast array of features, including:",
        },
      ],
    },
    {
      type: "bulletList",
      attrs: {
        tight: true,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Object-oriented:",
                },
                {
                  type: "text",
                  text: " Java is an object-oriented language, which means that it uses objects to represent data and operations.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Platform independent:",
                },
                {
                  type: "text",
                  text: " Java code can run on any platform that supports the Java Virtual Machine (JVM).",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Secure:",
                },
                {
                  type: "text",
                  text: " Java has a strong security model that helps to protect programs from malicious attacks.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Robust:",
                },
                {
                  type: "text",
                  text: " Java is a robust language that is designed to be reliable and efficient.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "High-performance:",
                },
                {
                  type: "text",
                  text: " Java is a high-performance language that can be used to develop a wide range of applications.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Applications:",
        },
        {
          type: "text",
          text: " Java is a versatile language that can be used to develop a wide range of applications, including:",
        },
      ],
    },
    {
      type: "bulletList",
      attrs: {
        tight: true,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Web applications:",
                },
                {
                  type: "text",
                  text: " Java is a popular language for developing web applications.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Mobile applications:",
                },
                {
                  type: "text",
                  text: " Java is used to develop mobile applications for Android and other platforms.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Desktop applications:",
                },
                {
                  type: "text",
                  text: " Java can be used to develop desktop applications for Windows, macOS, and Linux.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Enterprise applications:",
                },
                {
                  type: "text",
                  text: " Java is used to develop enterprise applications for businesses.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "youtube",
      attrs: {
        src: "https://www.youtube.com/watch?v=rtsSDThDwPo",
        start: 0,
        width: 0,
        height: 0,
      },
    },
  ],
};
export function ContentRenderer({ lexical }: { lexical?: string }) {
  const output = useMemo(() => {
    if (!lexical) {
      return "";
    }
    
    return generateHTML(JSON.parse(lexical), [
      Document,
      Heading,
      Text,
      Paragraph,
      CodeBlock,
      Bold,
      ListItem,
      BulletList,
      OrderedList,
      HorizontalRule,
      CustomYoutube,
    ]);
  }, [lexical]);

  useEffect(() => {
    hljs.highlightAll();
  }, [output]);

  return (
    <article
      className="prose max-w-none prose-pre:rounded tiptap"
      dangerouslySetInnerHTML={{ __html: output }}
    ></article>
  );
}
