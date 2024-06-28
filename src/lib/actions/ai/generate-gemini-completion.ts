"use server";

import { getSession } from "@/lib/auth";
import { AiPromptRequest } from "@/lib/models";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { CoreMessage, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { match } from "ts-pattern";

export async function generateGeminiCompletion(values: AiPromptRequest) {
  "use server";
  if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === "") {
    throw new Error(
      "Missing GOOGLE_API_KEY - make sure to add it to your .env file."
    );
  }

  const { userId } = await getSession();

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const { prompt, option, command } = values;

  const messages = match(option)
    .with("continue", () => [
      {
        role: "user",
        content: `
          Please continue writing this text \"${prompt}\" by giving more weight/priority to the later characters than the beginning ones
          and limit your response to no more than 200 characters, but make sure to construct complete sentences. Also use markdown formatting when appropriate.
        `,
      },
    ])
    .with("improve", () => [
      {
        role: "user",
        content: `
          Please improve this text \"${prompt}\" writing and limit your response to no more than 200 characters, 
          but make sure to construct complete sentences. Also use markdown formatting when appropriate.
        `,
      },
    ])
    .with("shorter", () => [
      {
        role: "user",
        content: `
          Please shortens this text \"${prompt}\" writing and use markdown formatting when appropriate.
        `,
      },
    ])
    .with("longer", () => [
      {
        role: "user",
        content: `Please lengthens this text \"${prompt}\" writing and use markdown formatting when appropriate.`,
      },
    ])
    .with("fix", () => [
      {
        role: "user",
        content: `
        Please fix grammar of this text \"${prompt}\" writing and spelling errors. Also limit your response to no more than 200 characters, 
        but make sure to construct complete sentences. Also use markdown formatting when appropriate.
        `,
      },
    ])
    .with("zap", () => [
      {
        role: "user",
        content: `
          Please generates text based on \"${prompt}\" by respecting command: \"${command}\". 
          Also use markdown formatting when appropriate.
        `,
      },
    ])
    .run() as CoreMessage[];

  const stream = createStreamableValue<string, string>();

  (async () => {
    try {
      const { textStream } = await streamText({
        model: google("models/gemini-pro"),
        messages: messages,
      });

      for await (const text of textStream) {
        stream.update(text);
      }

      stream.done();
    } catch (error: any) {
      stream.error(error?.message);
    }
  })();

  return stream.value;
}
