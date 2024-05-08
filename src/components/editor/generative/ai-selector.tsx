"use client";

import { Command, CommandInput } from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TypingSpinner } from "@/components/ui/typing-spinner";
import { useToast } from "@/components/ui/use-toast";
import { useCompletion } from "ai/react";
import { ArrowUp, Sparkles } from "lucide-react";
import { useEditor } from "novel";
import { addAIHighlight } from "novel/extensions";
import { useState } from "react";
import Markdown from "react-markdown";
import AICompletionCommands from "./ai-completion-command";
import AISelectorCommands from "./ai-selector-commands";
//TODO: I think it makes more sense to create a custom Tiptap extension for this functionality https://tiptap.dev/docs/editor/ai/introduction

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ open, onOpenChange }: AISelectorProps) {
  const { editor } = useEditor();
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/generate/gemini",
    onResponse: (response) => {
      if (response.status === 429) {
        toast({
          title: "Error",
          description: "You have reached your request limit for the day.",
          variant: "destructive",
        });
        return;
      }
    },
    onError: (e) => {
      toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  const hasCompletion = completion.length > 0;

  return (
    <Command className="w-[350px]">
      {hasCompletion && (
        <div className="flex max-h-[400px]">
          <ScrollArea>
            <div className="prose p-2 px-4 prose-sm">
              <Markdown>{completion}</Markdown>
            </div>
          </ScrollArea>
        </div>
      )}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-muted-foreground text-purple-500">
          <Sparkles className="mr-2 h-4 w-4 shrink-0  " />
          AI is thinking
          <div className="ml-auto mt-1">
            <TypingSpinner />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative">
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              autoFocus
              className="p-0 pr-7 ring-0 focus:ring-0 border-0"
              placeholder={
                hasCompletion
                  ? "Tell AI what to do next"
                  : "Ask AI to edit or generate..."
              }
              onFocus={() => addAIHighlight(editor!)}
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-900"
              onClick={() => {
                if (completion)
                  return complete(completion, {
                    body: { option: "zap", command: inputValue },
                  }).then(() => setInputValue(""));

                const slice = editor!.state.selection.content();
                const text = editor!.storage.markdown.serializer.serialize(
                  slice.content
                );

                complete(text, {
                  body: { option: "zap", command: inputValue },
                }).then(() => setInputValue(""));
              }}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          {hasCompletion ? (
            <AICompletionCommands
              onDiscard={() => {
                editor?.chain().unsetHighlight().focus().run();
                onOpenChange(false);
              }}
              completion={completion}
            />
          ) : (
            <AISelectorCommands
              onSelect={(value, option) =>
                complete(value, { body: { option } })
              }
            />
          )}
        </>
      )}
    </Command>
  );
}
