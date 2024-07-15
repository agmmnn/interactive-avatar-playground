import { useState } from "react"
import Image from "next/image"
import { generateText } from "ai"
import { chromeai } from "chrome-ai"
import { useAtom } from "jotai"
import { Bird, Rabbit, Turtle } from "lucide-react"

import { maxTokensAtom, providerModelAtom, temperatureAtom } from "@/lib/atoms"

import { models } from "."
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Slider } from "../ui/slider"
import { Textarea } from "../ui/textarea"

const chromeModel = chromeai("text", {
  temperature: 0.5,
  topK: 5,
})

export function Providers() {
  const [providerModel, setProviderModel] = useAtom(providerModelAtom)
  const [temperature, setTemperature] = useAtom(temperatureAtom)
  const [maxTokens, setMaxTokens] = useAtom(maxTokensAtom)
  const [result, setResult] = useState("")
  const [prompt, setPrompt] = useState("")

  function handleModelChange(value: string): void {
    setProviderModel(value)
  }

  async function handleChat() {
    if (providerModel === "chromeai:text") {
      const { text } = await generateText({
        model: chromeai() as any,
        prompt: "Who are you?",
      })
      setResult(text)
      return
    }

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        providerModel: providerModel,
        prompt: prompt,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const result = await response.json()
    setResult(result.data)
  }

  return (
    <div className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Providers</legend>
        <div className="grid gap-3">
          <Label htmlFor="model">Model</Label>
          <Select
            defaultValue={providerModel}
            onValueChange={(x) => handleModelChange(x)}
          >
            <SelectTrigger
              id="model"
              className="h-fit"
              // className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((item) => (
                <SelectItem
                  value={item.provider + ":" + item.model}
                  key={item.model}
                >
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Image
                      src={`/icons/${item.icon}.svg`}
                      alt="logo-provider"
                      width={20}
                      height={20}
                    />
                    <div className="grid gap-0.5">
                      <p>
                        {item.company}{" "}
                        <span className="font-medium text-foreground">
                          {item.model}
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        {item.model} by {item.company}
                      </p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <p className="flex w-full flex-row items-center">
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              placeholder="0.4"
              value={temperature}
              className="ml-auto w-20"
            />
          </p>
          <Slider
            defaultValue={[1]}
            max={2}
            step={0.1}
            onValueChange={(x) => setTemperature(x[0])}
            value={[temperature]}
            onDoubleClick={() => setTemperature(1)}
          />
        </div>
        <div className="grid gap-3">
          <p className="flex w-full flex-row items-center">
            <Label htmlFor="max-tokens">Maximum Tokens</Label>
            <Input
              id="max-tokens"
              type="number"
              placeholder="0.4"
              value={maxTokens}
              className="ml-auto w-20"
            />
          </p>
          <Slider
            defaultValue={[256]}
            max={4095}
            min={1}
            step={1}
            onValueChange={(x) => setMaxTokens(x[0])}
            value={[maxTokens]}
            onDoubleClick={() => setMaxTokens(256)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="top-p">Top P</Label>
            <Input id="top-p" type="number" placeholder="0.7" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="top-k">Top K</Label>
            <Input id="top-k" type="number" placeholder="0.0" />
          </div>
        </div>
      </fieldset>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
        <div className="grid gap-3">
          <Label htmlFor="role">Role</Label>
          <Select defaultValue="system">
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="assistant">Assistant</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="You are a..."
            className="min-h-[9.5rem]"
            value={prompt}
            onChange={(x) => setPrompt(x.target.value)}
          />
        </div>
        <Button onClick={handleChat}>Run</Button>
        {result}
      </fieldset>
    </div>
  )
}
