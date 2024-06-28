"use server";

import { getSession } from "@/lib/auth";
import { AiPromptRequest } from "@/lib/models";
import { createOpenAI } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { match } from "ts-pattern";

export async function generateOpenaiCompletion(values: AiPromptRequest) {
  "use server";
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    throw new Error(
      "Missing OPENAI_API_KEY - make sure to add it to your .env file."
    );
  }
  const { userId } = await getSession();

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  });

  const { prompt, option, command } = values;

  const messages = match(option)
    .with("continue", () => [
      {
        role: "system",
        content:
          "You are an AI writing assistant that continues existing text based on context from prior text. " +
          "Give more weight/priority to the later characters than the beginning ones. " +
          "Limit your response to no more than 200 characters, but make sure to construct complete sentences." +
          "Use Markdown formatting when appropriate.",
      },
      {
        role: "user",
        content: prompt,
      },
    ])
    .with("improve", () => [
      {
        role: "system",
        content:
          "You are an AI writing assistant that improves existing text. " +
          "Limit your response to no more than 200 characters, but make sure to construct complete sentences." +
          "Use Markdown formatting when appropriate.",
      },
      {
        role: "user",
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with("shorter", () => [
      {
        role: "system",
        content:
          "You are an AI writing assistant that shortens existing text. " +
          "Use Markdown formatting when appropriate.",
      },
      {
        role: "user",
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with("longer", () => [
      {
        role: "system",
        content:
          "You are an AI writing assistant that lengthens existing text. " +
          "Use Markdown formatting when appropriate.",
      },
      {
        role: "user",
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with("fix", () => [
      {
        role: "system",
        content:
          "You are an AI writing assistant that fixes grammar and spelling errors in existing text. " +
          "Limit your response to no more than 200 characters, but make sure to construct complete sentences." +
          "Use Markdown formatting when appropriate.",
      },
      {
        role: "user",
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with("zap", () => [
      {
        role: "system",
        content:
          "You area an AI writing assistant that generates text based on a prompt. " +
          "You take an input from the user and a command for manipulating the text" +
          "Use Markdown formatting when appropriate.",
      },
      {
        role: "user",
        content: `For this text: ${prompt}. You have to respect the command: ${command}`,
      },
    ])
    .run() as CoreMessage[];

  const stream = createStreamableValue<string, string>();

  (async () => {
    try {
      const { textStream } = await streamText({
        model: openai("gpt-3.5-turbo"),
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
