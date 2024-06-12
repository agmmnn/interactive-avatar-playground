import { anthropic } from "@ai-sdk/anthropic"
import { vertex } from "@ai-sdk/google-vertex"
import { mistral } from "@ai-sdk/mistral"
import { createOpenAI, openai } from "@ai-sdk/openai"
import { experimental_createProviderRegistry as createProviderRegistry } from "ai"

export const registry = createProviderRegistry({
  anthropic,
  vertex,
  mistral,
  openai: createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }),
})
