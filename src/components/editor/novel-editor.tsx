"use client";
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  JSONContent,
} from "novel";
import { useState } from "react";
import { defaultExtensions } from "./extensions";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { slashCommand, suggestionItems } from "./slash-command";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { TextButtons } from "./selectors/text-buttons";
import { ColorSelector } from "./selectors/color-selector";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

const extensions = [...defaultExtensions, slashCommand];

export default function NovelEditor() {
  const [content, setContent] = useState<JSONContent>();

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  //   const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
  //     const json = editor.getJSON();
  //     setContent(json);
  //     setSaveStatus("Saved");
  //   }, 500);

  return (
    <EditorRoot>
      <EditorContent
        initialContent={content}
        extensions={extensions}
        onUpdate={({ editor }) => {
          // console.log(editor.getHTML());
        }}
        slotAfter={<ImageResizer />}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: cn(
              `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`
            ),
          },
        }}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-sliver">
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
