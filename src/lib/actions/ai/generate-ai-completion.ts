"use server";

import { AiPromptRequest } from "@/lib/models";
import { generateOpenaiCompletion } from "..";
import { generateGeminiCompletion } from "./generate-gemini-completion";

export async function generateAICompletion(values: AiPromptRequest) {
  const provider = process.env.DEFAULT_AI_PROVIDER ?? "GOOGLE";

  if (provider === "GOOGLE") {
    return await generateGeminiCompletion(values);
  }

  if (provider === "OPENAI") {
    return await generateOpenaiCompletion(values);
  }

  throw Error("Invalid AI provider.");
}
