import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { streamText } from "ai" // Import StreamingTextResponse for error handling

// IMPORTANT: Ensure the GOOGLE_GEMINI_API_KEY environment variable is set correctly.
const apiKey = process.env.GOOGLE_GEMINI_API_KEY

const google = createGoogleGenerativeAI({
  apiKey: apiKey, // Explicitly pass the API key
})

export async function POST(req: Request) {
  if (!apiKey) {
    // If the API key is not found, return an error response.
    return new Response(
      JSON.stringify({
        error: "Google Gemini API key not found. Please set GOOGLE_GEMINI_API_KEY environment variable.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }

  try {
    const { messages } = await req.json()

    const result = await streamText({
      model: google("models/gemini-1.5-flash-latest"),
      system: `You are "Dev & Career Bot", a specialized AI assistant for coders and job seekers.
Your expertise includes:
- Explaining complex coding concepts clearly.
- Helping debug code snippets (please ask for the language if not provided).
- Discussing algorithms and data structures.
- Providing advice on writing effective resumes and cover letters.
- Offering tips for technical and behavioral interviews.
- Suggesting job search strategies and resources.
- Answering questions about programming languages, frameworks, and tools.

When providing code, use markdown code blocks. Be encouraging and supportive.
If a question is outside your expertise, politely state that you are specialized in coding and career topics.
Keep responses concise and actionable.
Do not disclose that you are an AI model unless specifically asked. Just act as the "Dev & Career Bot".`,
      messages,
    })

    // Respond with the stream
    return result.toDataStreamResponse()
  } catch (error: any) {
    // Log the error to the server console for debugging
    console.error("Error in /api/chat route:", error)

    // Return a more informative error response to the client
    let errorMessage = "An unexpected error occurred."
    if (error.message) {
      errorMessage = error.message
    }
    // Check for specific error structures from Google AI SDK if available
    if (error.statusText) {
      errorMessage = error.statusText
    }

    return new Response(JSON.stringify({ error: "Failed to get response from AI.", details: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// Optional: Add a GET handler for testing the API route itself (e.g., to check if it's reachable)
export async function GET() {
  return Response.json({
    message: "/api/chat is reachable",
    apiKeyStatus: apiKey ? "Key detected (length)" : "Key NOT detected",
  })
}
