import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt, command }: { prompt: string; command: string } =
    await req.json();

  const question = () => {
    if (command === "prompt") {
      return `Please generate for this prompt: "${prompt}". Use markdown formatting when appropriate.`;
    }

    return `Please ${command} this text: "${prompt}". Use markdown formatting when appropriate.`;
  };

  try {
    const result = await streamText({
      model: google("gemini-pro"),
      prompt: question(),
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    return new Response(error.message, {
      status: 400,
    });
  }
}
