import { NextResponse } from "next/server"
import { generateText } from "ai"

import { registry } from "@/lib/provider-registry"

export async function POST(request: Request, { params }) {
  const { providerModel, prompt } = await request.json()

  if (!providerModel || !prompt) {
    return NextResponse.error()
  }

  try {
    const result = await generateText({
      model: registry.languageModel(providerModel),
      prompt: "give a very short answer for this: " + prompt,
    })

    if (!result) {
      throw new Error(`Failed to fetch: ${result}`)
    }

    return NextResponse.json({ data: result.text })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message })
  }
}
