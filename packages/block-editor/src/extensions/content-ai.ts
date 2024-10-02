// import ContentAiNodeView from "@/renderers/content-ai-node-view";
// import { requestCompletion } from "@/utilities/request-completion";
// import { mergeAttributes, Node } from "@tiptap/core";
// import { ReactNodeViewRenderer } from "@tiptap/react";

// interface ContentAiStorageOptions {
//   abortController?: AbortController;
// }

// export interface ContentAiOptions {
//   apiUrl: string;
//   HTMLAttributes: Record<string, any>;
//   onLoading?: () => void;
//   onSuccess?: (completion: string) => void;
//   onError?: (error: Error) => void;
// }

// // declare module "@tiptap/core" {
// //   interface Commands<ReturnType> {
// //     contentAiCommand: {
// //       aiPrompt: () => ReturnType;
// //       aiCompletion: ({ command }: { command: string }) => ReturnType;
// //     };
// //   }
// // }

// export const ContentAi = Node.create<ContentAiOptions, ContentAiStorageOptions>(
//   {
//     name: "contentAi",
//     inline: false,
//     group: "block",
//     selectable: false,
//     marks: "",

//     addAttributes() {
//       return {
//         completion: "",
//         type: "",
//       };
//     },

//     addOptions() {
//       return {
//         apiUrl: "/api/completion",
//         HTMLAttributes: {},
//       };
//     },

//     addStorage() {
//       return {
//         abortController: undefined,
//       };
//     },

//     addCommands() {
//       return {
//         aiPrompt:
//           () =>
//           ({ commands }) => {
//             return commands.insertContent({
//               type: this.name,
//               attrs: {
//                 type: "prompt",
//               },
//             });
//           },
//         aiCompletion:
//           ({ command }) =>
//           ({ state, editor }) => {
//             const { from, to, empty } = state.selection;

//             if (empty) {
//               return false;
//             }

//             const prompt = state.doc.textBetween(from, to);

//             if (!prompt) {
//               return false;
//             }

//             const $aiNode = editor.$node(this.name);

//             if ($aiNode) {
//               return false;
//             }

//             const body = {
//               prompt: prompt,
//               command: command,
//             };

//             const { apiUrl, onLoading, onSuccess, onError } = this.options;

//             // const srequestCompletion = async (body: string) => {
//             //   try {
//             //     editor.setEditable(false);
//             //     onLoading?.();
//             //     const controller = new AbortController();
//             //     this.storage.abortController = controller;
//             //     const response = await fetch(apiUrl, {
//             //       method: "POST",
//             //       body: body,
//             //       signal: controller.signal,
//             //     });

//             //     if (!response.ok) {
//             //       throw Error(await response.text());
//             //     }

//             //     const reader = response.body?.getReader();

//             //     if (!reader) {
//             //       throw Error("No content");
//             //     }

//             //     let result = "";
//             //     let update = false;

//             //     // eslint-disable-next-line no-constant-condition
//             //     while (true) {
//             //       const { done, value } = await reader.read();
//             //       if (done) {
//             //         onSuccess?.(result);
//             //         editor
//             //           .chain()
//             //           .focus()
//             //           .deleteRange({ from, to: from + 1 })
//             //           .insertContentAt(from, result)
//             //           .run();
//             //         return;
//             //       }
//             //       const chunk = new TextDecoder().decode(value);
//             //       const size = 5;

//             //       for (let i = 0; i < chunk.length; i += size) {
//             //         const w = chunk.slice(i, i + size);
//             //         result += w;

//             //         if (update) {
//             //           editor
//             //             .chain()
//             //             .focus()
//             //             .scrollIntoView()
//             //             .command(({ tr }) => {
//             //               tr.setNodeMarkup(from, this.type, {
//             //                 completion: result,
//             //               });
//             //               return true;
//             //             })
//             //             .setMeta("preventUpdate", true)
//             //             .run();
//             //         } else {
//             //           update = editor
//             //             .chain()
//             //             .focus()
//             //             .command(({ commands }) => {
//             //               commands.toggleNode("paragraph", "paragraph");
//             //               return true;
//             //             })
//             //             .scrollIntoView()
//             //             .insertContentAt(
//             //               { from, to },
//             //               {
//             //                 type: this.name,
//             //                 attrs: {
//             //                   completion: result,
//             //                 },
//             //               }
//             //             )
//             //             .setMeta("preventUpdate", true)
//             //             .run();
//             //         }

//             //         await new Promise((resolve) => setTimeout(resolve, 25));
//             //       }

//             //       // if (result.length > 200) {
//             //       //   throw "Limit exceeds";
//             //       // }
//             //     }
//             //   } catch (error) {
//             //     onError?.(error as Error);
//             //     const range = editor.$pos(from).range;
//             //     editor
//             //       .chain()
//             //       .focus()
//             //       .deleteRange(range)
//             //       .insertContentAt(from, prompt)
//             //       .run();
//             //   } finally {
//             //     editor.setEditable(true);
//             //   }
//             // };

//             // requestCompletion(JSON.stringify(body));

//             const controller = new AbortController();
//             this.storage.abortController = controller;
//             let update = false;

//             requestCompletion({
//               apiUrl: apiUrl,
//               body: JSON.stringify(body),
//               signal: controller.signal,
//               onLoading: () => {
//                 editor.setEditable(false);
//                 onLoading?.();
//               },
//               onChunk: (chunk) => {
//                 if (update) {
//                   editor
//                     .chain()
//                     .focus()
//                     .scrollIntoView()
//                     .command(({ tr }) => {
//                       tr.setNodeMarkup(from, this.type, {
//                         completion: chunk,
//                       });
//                       return true;
//                     })
//                     .setMeta("preventUpdate", true)
//                     .run();
//                 } else {
//                   update = editor
//                     .chain()
//                     .focus()
//                     .command(({ commands }) => {
//                       commands.toggleNode("paragraph", "paragraph");
//                       return true;
//                     })
//                     .scrollIntoView()
//                     .insertContentAt(
//                       { from, to },
//                       {
//                         type: this.name,
//                         attrs: {
//                           completion: chunk,
//                         },
//                       }
//                     )
//                     .setMeta("preventUpdate", true)
//                     .run();
//                 }
//               },
//               onSuccess: (completion) => {
//                 onSuccess?.(completion);
//                 const range = editor.$pos(from).range;
//                 editor
//                   .chain()
//                   .focus()
//                   .deleteRange(range)
//                   .insertContentAt(from, completion)
//                   .run();
//               },
//               onError: (error) => {
//                 onError?.(error as Error);
//                 const range = editor.$pos(from).range;
//                 editor
//                   .chain()
//                   .focus()
//                   .deleteRange(range)
//                   .insertContentAt(from, prompt)
//                   .run();
//               },
//               onComplete: () => {
//                 editor.setEditable(true);
//               },
//             });

//             return true;
//           },
//       };
//     },

//     renderHTML({ node, HTMLAttributes }) {
//       const type = node.attrs["type"];

//       if (type === "prompt") {
//         return [
//           "div",
//           mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
//         ];
//       }

//       const completion = node.attrs["completion"] ?? "";

//       return [
//         "span",
//         mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
//         completion,
//       ];
//     },

//     addNodeView() {
//       return ReactNodeViewRenderer(ContentAiNodeView);
//     },

//     onDestroy() {
//       this.storage.abortController?.abort();
//     },
//   }
// );
