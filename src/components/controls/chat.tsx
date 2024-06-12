import { useRef } from "react"
import { generateText } from "ai"
import { AnimatePresence, motion } from "framer-motion"
import { useAtom } from "jotai"
import {
  ArrowUp,
  BotMessageSquareIcon,
  Mic,
  Paperclip,
  SpeechIcon,
} from "lucide-react"

import {
  avatarAtom,
  chatModeAtom,
  debugAtom,
  inputTextAtom,
  mediaStreamActiveAtom,
  providerModelAtom,
  sessionDataAtom,
} from "@/lib/atoms"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function Chat() {
  const [avatar] = useAtom(avatarAtom)
  const [inputText, setInputText] = useAtom(inputTextAtom)
  const [sessionData] = useAtom(sessionDataAtom)
  const [mediaStreamActive] = useAtom(mediaStreamActiveAtom)
  const [, setDebug] = useAtom(debugAtom)
  const [chatMode, setChatMode] = useAtom(chatModeAtom)
  const [providerModel, setProviderModel] = useAtom(providerModelAtom)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  async function handleSpeak() {
    if (!avatar) return
    textAreaRef.current.value = ""
    let resultData = inputText

    if (chatMode) {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            providerModel: providerModel,
            prompt: inputText,
          }),
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`)
        }

        const result = await response.json()
        resultData = result.data // Use the fetched data in chat mode
      } catch (error) {
        console.error(error)
        setDebug(error.message)
        return
      }
    }

    try {
      await avatar.current!.speak({
        taskRequest: {
          text: resultData,
          sessionId: sessionData?.sessionId,
        },
      })
      setInputText(chatMode ? resultData : "")
    } catch (error) {
      console.error(error)
      setDebug(error.message)
    }
  }

  return (
    <>
      <div className="mb-2 flex w-full items-center justify-end space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label
              htmlFor="chat-mode"
              className="flex flex-row items-center space-x-1"
            >
              <SpeechIcon className="size-5" />
              <p>Repeat</p>
            </Label>
          </TooltipTrigger>
          <TooltipContent side="top">Repeat the input text</TooltipContent>
        </Tooltip>

        <Switch
          id="chat-mode"
          className="data-[state=unchecked]:bg-primary"
          defaultChecked={chatMode}
          onCheckedChange={() => setChatMode(!chatMode)}
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Label
              htmlFor="chat-mode"
              className="flex flex-row items-center space-x-1"
            >
              <p>Chat</p>
              <BotMessageSquareIcon className="size-5" />
            </Label>
          </TooltipTrigger>
          <TooltipContent side="top">Chat</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex w-full items-center">
        <div className="bg-default flex w-full flex-col gap-1.5 rounded-[26px] border bg-background p-1.5 transition-colors">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="flex flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Paperclip className="size-5" />
                    <Input multiple={false} type="file" className="hidden" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Attach File</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <Textarea
                id="prompt-textarea"
                data-id="root"
                value={inputText}
                ref={textAreaRef}
                onChange={(v) => setInputText(v.target.value)}
                dir="auto"
                rows={1}
                className="h-[40px] min-h-[40px] resize-none overflow-y-hidden rounded-none border-0 px-0 shadow-none focus:ring-0 focus-visible:ring-0"
              />
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Mic className="size-5" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
            <Button
              // disabled={!mediaStreamActive}
              size="icon"
              className="rounded-full"
              onClick={handleSpeak}
            >
              <ArrowUp className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Input
          id="message"
          placeholder="Type your message here..."
          className="resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          value={inputText}
          onChange={(v) => setText(v.target.value)}
        />
        <div className="flex items-center p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip>

          <Button
            onClick={handleSpeak}
            disabled={mediaStreamActive ? false : true}
            size="sm"
            className="ml-auto gap-1.5"
          >
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </div> */}
    </>
  )
}
