"use client";

import { Command, CommandInput } from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TypingSpinner } from "@/components/ui/typing-spinner";
import { useToast } from "@/components/ui/use-toast";
import { generateGeminiCompletion } from "@/lib/actions";
import { AiPromptRequest } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { readStreamableValue } from "ai/rsc";
import { ArrowUp, Sparkles } from "lucide-react";
import { useEditor } from "novel";
import { useState } from "react";
import Markdown from "react-markdown";
import AICompletionCommands from "./ai-completion-command";
import AISelectorCommands from "./ai-selector-commands";

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ open, onOpenChange }: AISelectorProps) {
  const { editor } = useEditor();
  const [inputValue, setInputValue] = useState("");
  const [completion, setCompletion] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCompletion = async (values: AiPromptRequest) => {
    try {
      setLoading(true);
      const result = await generateGeminiCompletion(values);
      let textContent = "";

      for await (const delta of readStreamableValue(result)) {
        textContent = `${textContent}${delta}`;

        setCompletion(textContent);
      }
      setInputValue("");
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const hasCompletion = completion.length > 0;

  return (
    <Command className="w-[350px]">
      {hasCompletion && (
        <div className="flex max-h-[400px]">
          <ScrollArea>
            <div className="prose p-2 px-4 prose-sm dark:prose-invert prose-pre:!bg-gray-800 dark:prose-pre:!bg-gray-900 prose-pre:border">
              <Markdown>{completion}</Markdown>
            </div>
          </ScrollArea>
        </div>
      )}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-primary">
          <Sparkles className="mr-2 h-4 w-4 shrink-0" />
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
              onFocus={() => {
                // addAIHighlight(editor!)
              }}
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 size-7 -translate-y-1/2 rounded-full shadow"
              onClick={() => {
                if (completion) {
                  handleCompletion({
                    prompt: completion,
                    option: "zap",
                    command: inputValue,
                  });

                  return;
                }

                const slice = editor!.state.selection.content();

                let text = "";
                
                if (editor?.isActive("math")) {
                  text = editor.getAttributes('math').latex;
                } else {
                  text = editor!.storage.markdown.serializer.serialize(
                    slice.content
                  );
                }

                handleCompletion({
                  prompt: text,
                  option: "zap",
                  command: inputValue,
                });
              }}
            >
              <ArrowUp className="size-4" />
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
                handleCompletion({
                  prompt: value,
                  option: option,
                  command: "",
                })
              }
            />
          )}
        </>
      )}
    </Command>
  );
}
