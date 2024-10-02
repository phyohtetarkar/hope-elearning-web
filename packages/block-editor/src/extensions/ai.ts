import { requestCompletion } from "@/utilities/request-completion";
import { Extension } from "@tiptap/core";

interface AiTextOptons {
  prompt: string;
  command: string;
  insert: false | { from: number; to: number };
}

export interface AiStorage {
  status?: "loading" | "success" | "error";
  message?: string;
  error?: Error;
}

export interface AiOptions {
  apiUrl: string;
  onLoading?: () => void;
  onError?: (error: Error) => void;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    aiCommands: {
      aiTextPrompt: (options: AiTextOptons) => ReturnType;
      aiCompletion: ({ command }: { command: string }) => ReturnType;
      aiReset: () => ReturnType;
      setAiWriter: () => ReturnType;
    };
  }
}

export const Ai = Extension.create<AiOptions, AiStorage>({
  name: "ai",

  addOptions() {
    return {
      apiUrl: "",
    };
  },

  addStorage() {
    return {};
  },

  addCommands() {
    return {
      aiTextPrompt:
        ({ prompt, command, insert }) =>
        ({ editor }) => {
          const body = {
            prompt: prompt,
            command: command,
          };

          const { apiUrl, onLoading, onError } = this.options;

          if (!apiUrl) {
            return false;
          }

          let update = false;

          requestCompletion({
            apiUrl: apiUrl,
            body: JSON.stringify(body),
            onLoading: () => {
              editor.storage.ai = {
                status: "loading",
                message: undefined,
                error: undefined,
              } as AiStorage;
              onLoading?.();
            },
            onChunk: (chunk) => {
              if (!update && insert) {
                const storage = editor.storage.ai as AiStorage;
                storage.message = chunk;
                update = editor.commands.setAiPlaceholder(insert);
              } else {
                editor.commands.command(() => {
                  const storage = editor.storage.ai as AiStorage;
                  storage.message = chunk;
                  return true;
                });
              }
            },
            onSuccess: (completion) => {
              const cm = editor.chain().command(() => {
                const storage = editor.storage.ai as AiStorage;
                storage.status = "success";
                return true;
              });

              if (insert) {
                const range = editor.$pos(insert.from).range;
                cm.deleteRange(range).insertContentAt(insert.from, completion);
              }

              cm.run();
            },
            onError: (error) => {
              onError?.(error);
              const cm = editor.chain().command(() => {
                const storage = editor.storage.ai as AiStorage;
                storage.status = "error";
                storage.error = error;
                return true;
              });

              if (insert) {
                const range = editor.$pos(insert.from).range;
                cm.focus()
                  .deleteRange(range)
                  .insertContentAt(range.from, prompt)
                  .aiReset();
              }

              cm.run();
            },
            onComplete: () => {
              // editor.setEditable(true);
            },
          });

          return true;
        },

      aiCompletion:
        ({ command }) =>
        ({ chain, state }) => {
          const { from, to, empty } = state.selection;

          if (empty || !command) {
            return false;
          }

          const prompt = state.doc.textBetween(from, to);

          if (!prompt) {
            return false;
          }

          return chain()
            .aiReset()
            .aiTextPrompt({
              prompt: prompt,
              command: command,
              insert: { from, to },
            })
            .run();
        },

      aiReset:
        () =>
        ({ commands }) => {
          return commands.command(({ editor }) => {
            editor.storage.ai = {};
            return true;
          });
        },
    };
  },
});
