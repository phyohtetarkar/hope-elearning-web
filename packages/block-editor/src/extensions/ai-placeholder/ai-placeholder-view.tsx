import { NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper, useEditorState } from "@tiptap/react";
import Markdown from "react-markdown";
import { AiStorage } from "../ai";

const AiPlaceholderView = ({ editor }: NodeViewProps) => {
  const { completion } = useEditorState({
    editor: editor,
    selector: (instance) => {
      const storage = instance.editor.storage.ai as AiStorage;
      return {
        completion: storage.message,
      };
    },
  });

  return (
    <NodeViewWrapper>
      <Markdown>{completion}</Markdown>
    </NodeViewWrapper>
  );
};

export default AiPlaceholderView;
