import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow responses up to 60 seconds (maximum allowed)
export const maxDuration = 60

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Add system message to provide context about the campus
  const systemMessage = {
    role: "system",
    content: `You are a helpful AI assistant for a university campus. 
    You can provide information about campus facilities, events, courses, and general university information.
    Be friendly, concise, and helpful. If you don't know something specific about this campus, 
    provide general information that would be applicable to most universities.`,
  }

  // Add system message to the beginning if it doesn't exist
  const messagesWithSystem = messages[0]?.role === "system" ? messages : [systemMessage, ...messages]

  const result = streamText({
    model: openai("o3-mini"), // Using OpenAI's o3-mini model [^1][^2]
    messages: messagesWithSystem,
  })

  return result.toDataStreamResponse()
}
