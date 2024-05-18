"use client";
import { EditorContent, EditorRoot, JSONContent } from "novel";
import { defaultExtensions } from "./extensions";

export function ContentRenderer({ lexical }: { lexical?: string | JSON }) {
  const content = () => {
    if (typeof lexical === "string") {
      return JSON.parse(lexical) as JSONContent;
    }

    if (typeof lexical === "object") {
      return lexical as JSONContent;
    }

    return undefined;
  };

  return (
    <EditorRoot>
      <EditorContent
        initialContent={content()}
        editable={false}
        extensions={[...defaultExtensions]}
        editorProps={{
          editable: () => false,
          attributes: {
            class: "prose max-w-none prose-pre:rounded tiptap",
          },
        }}
      >
        <div></div>
      </EditorContent>
    </EditorRoot>
  );

  // return (
  //   <article
  //     ref={articleRef}
  //     className="prose max-w-none prose-pre:rounded tiptap"
  //     dangerouslySetInnerHTML={{ __html: output }}
  //   ></article>
  // );
}
