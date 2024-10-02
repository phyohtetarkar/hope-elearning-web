"use client";

import { cn } from "@elearning/lib/utils";
import Placeholder from "@tiptap/extension-placeholder";
import { Content, Editor, EditorContent, useEditor } from "@tiptap/react";
import { defaultExtensions } from "./default-extensions";
import { Ai } from "./extensions/ai";
import { getSuggestion, SlashCommand } from "./extensions/slash-command";
import { CodeBlockLanguageMenu } from "./menus/codeblock-language-menu";
import { DefaultBubbleMenu } from "./menus/default-bubble-menu";
import { TableOptionsMenu } from "./menus/table-options-menu";
import { AIProvider } from "./types";

interface BlockEditorProps {
  content?: Content;
  placeholder?: string;
  onCreate?: (editor: Editor) => void;
  onUpdate?: (editor: Editor) => void;
  aiProvider?: AIProvider;
}

const BlockEditor = ({
  content,
  placeholder,
  onCreate,
  onUpdate,
  aiProvider,
}: BlockEditorProps) => {
  const getExtensions = () => {
    const extensions = [...defaultExtensions];

    if (aiProvider) {
      return [
        ...extensions,
        Ai.configure({
          apiUrl: aiProvider.url,
          onError: (error) => {
            console.log(error);
          },
        }),
      ];
    }

    return extensions;
  };
  const editor = useEditor({
    extensions: [
      ...getExtensions(),
      Placeholder.configure({
        placeholder: placeholder ?? "Type  /  for commands...",
        emptyEditorClass: cn("is-editor-empty text-gray-400"),
        emptyNodeClass: cn("is-empty text-gray-400"),
      }),
      SlashCommand.configure({
        suggestion: getSuggestion({ ai: !!aiProvider }),
      }),
    ],
    content: content,
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
    onCreate: ({ editor }) => {
      onCreate?.(editor);
    },
    onUpdate: ({ editor }) => {
      onUpdate?.(editor);
    },
    onContentError: ({error}) => {
      console.error(error);
    }
  });

  return (
    <>
      <EditorContent
        editor={editor}
        className="prose dark:prose-invert focus:outline-none max-w-full"
      />
      <TableOptionsMenu editor={editor} />
      <CodeBlockLanguageMenu editor={editor} />
      <DefaultBubbleMenu editor={editor} showAiTools={!!aiProvider} />
    </>
  );
};

export { BlockEditor, type BlockEditorProps };
