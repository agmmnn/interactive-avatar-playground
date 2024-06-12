const api_token = process.env.HEYGEN_API_KEY

export async function POST() {
  if (!api_token) {
    throw new Error("API token is not defined")
  }

  try {
    const response = await fetch(
      "https://api.heygen.com/v1/streaming.create_token",
      {
        method: "POST",
        headers: {
          "x-api-key": api_token,
          "content-type": "application/json",
        },
        body: JSON.stringify({}),
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }
    const data = await response.json()

    return Response.json({ data })
  } catch (error: any) {
    console.error(error)
    return Response.json({ error: error.message })
  }
}
