"use client";

import { uploadImage } from "@/lib/actions";
import { cn, debounce } from "@/lib/utils";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorInstance,
  EditorRoot,
  JSONContent,
} from "novel";
import { handleCommandNavigation } from "novel/extensions";
import {
  createImageUpload,
  handleImageDrop,
  handleImagePaste,
} from "novel/plugins";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import { defaultExtensions } from "./extensions";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";

const extensions = [...defaultExtensions, slashCommand];

interface NovelEditorProps {
  content?: JSONContent;
  onCreate?: (editor: EditorInstance) => void;
  onChange?: (editor: EditorInstance) => void;
  onDebouncedChange?: (content: JSONContent, wordCount: number) => void;
}

function NovelEditor({
  content,
  onCreate,
  onChange,
  onDebouncedChange,
}: NovelEditorProps) {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  const { toast } = useToast();

  const debouncedUpdate = debounce((editor: EditorInstance) => {
    const json = editor.getJSON();
    const wordCount = editor.storage.characterCount.words();
    onDebouncedChange?.(json, wordCount ?? 0);
  }, 2000);

  const onUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    //This should return a src of the uploaded image
    return await uploadImage(formData);
  };

  const uploadFn = createImageUpload({
    onUpload,
    validateFn: (file) => {
      if (!file.type.includes("image/")) {
        toast({
          title: "Error",
          description: "File type not supported.",
          variant: "destructive",
        });
        return false;
      } else if (file.size / 1024 / 1024 > 1) {
        toast({
          title: "Error",
          description: "File size too big (max 1MB).",
          variant: "destructive",
        });
        return false;
      }
      return true;
    },
  });

  return (
    <EditorRoot>
      <EditorContent
        initialContent={content}
        extensions={extensions}
        onUpdate={({ editor }) => {
          onChange?.(editor);
          // debouncedUpdate(editor);
        }}
        onCreate={({ editor }) => onCreate?.(editor)}
        // slotAfter={<ImageResizer />}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: cn(
              `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`
            ),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
        }}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer`}
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
        {/* <EditorBubble
          tippyOptions={{
            placement: openAI ? "bottom-start" : "top",
          }}
          className="flex w-fit max-w-[90vw] overflow-hidden rounded border bg-background shadow-xl"
        >
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <TextButtons />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble> */}

        <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
          <Separator orientation="vertical" />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />

          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </GenerativeMenuSwitch>
      </EditorContent>
    </EditorRoot>
  );
}

export default NovelEditor;
