import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { match } from "ts-pattern";
import {
  Content,
  GenerateContentRequest,
  GoogleGenerativeAI,
} from "@google/generative-ai";

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const buildGoogleGenAIPrompt = (messages: Message[]) => {
  const contents = messages
    .filter((message) => message.role === "user")
    .map((message) => {
      return {
        role: "user",
        parts: [{ text: message.content }],
      } as Content;
    });

  const request: GenerateContentRequest = {
    contents: contents,
  };

  return request;
};

export async function POST(req: Request): Promise<Response> {
  // Check if the GOOGLE_API_KEY is set, if not return 400
  if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === "") {
    return new Response(
      "Missing GOOGLE_API_KEY - make sure to add it to your .env file.",
      {
        status: 400,
      }
    );
  }

  let { prompt, option, command } = await req.json();
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
    .run() as Message[];

  const geminiStream = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(buildGoogleGenAIPrompt(messages));

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
