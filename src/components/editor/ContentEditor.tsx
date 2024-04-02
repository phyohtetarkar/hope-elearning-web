"use client";

import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

interface ContentEditorProps {
  holderId: string;
  placeholder?: string;
  onReady?: (editor: EditorJS) => void;
}

function ContentEditor({ holderId, placeholder, onReady }: ContentEditorProps) {
  const initializingRef = useRef(false);
  const editorRef = useRef<EditorJS>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (initializingRef.current) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const initializeEditorJs = async () => {
      initializingRef.current = true;
      const MainEditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      //const List = (await import("@editorjs/list")).default;
      const NestedList = (await import("@editorjs/nested-list")).default;
      const ImageTool = (await import("@editorjs/image")).default;
      const Embed = (await import("@editorjs/embed")).default;
      const Marker = (await import("@editorjs/marker")).default;
      // const InlineCode = (await import("@editorjs/inline-code")).default;
      const CodeBlock = (await import("./CodeBlock")).default;
      const Table = (await import("@editorjs/table")).default;
      const Delimiter = (await import("@editorjs/delimiter")).default;

      const editor = new MainEditorJS({
        holder: holderId,
        placeholder: placeholder ?? "Type / to browse options...",
        minHeight: 0,
        onReady: () => {
          setIsReady(true);
          editorRef.current = editor;
          onReady?.(editor);
        },
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: NestedList,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          embed: {
            class: Embed,
            inlineToolbar: false,
            config: {
              services: {
                youtube: true,
              },
            },
          },
          code: {
            class: CodeBlock,
          },
          marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M",
          },
          table: {
            class: Table,
            inlineToolbar: true,
          },
          delimiter: {
            class: Delimiter,
          },
        },
      });
    };

    initializeEditorJs();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = undefined;
        initializingRef.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holderId, placeholder]);

  return (
    <div>
      {!isReady && <div className="text-muted">Loading editor...</div>}
      <div id={holderId} spellCheck="false" className="text-gray-800"></div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ContentEditor), {
  ssr: false,
  loading: () => <div className="text-muted">Loading editor...</div>,
});
