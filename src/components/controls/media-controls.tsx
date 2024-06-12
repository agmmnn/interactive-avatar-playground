import { useRef } from "react"
import { useAtom } from "jotai"
import { ImageDownIcon, VideoIcon, VideoOffIcon } from "lucide-react"

import {
  isRecordingAtom,
  mediaCanvasRefAtom,
  mediaStreamActiveAtom,
  mediaStreamRefAtom,
} from "@/lib/atoms"

import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function MediaControls() {
  const [mediaStreamActive, setMediaStreamActive] = useAtom(
    mediaStreamActiveAtom
  )
  const [mediaStreamRef] = useAtom(mediaStreamRefAtom)
  const [mediaCanvasRef] = useAtom(mediaCanvasRefAtom)
  const [isRecording, setIsRecording] = useAtom(isRecordingAtom)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunksRef = useRef<Blob[]>([])

  // Function to handle the screenshot capture and download
  const handleCapture = () => {
    if (!mediaStreamRef || !mediaCanvasRef) return
    const video = mediaStreamRef.current
    const canvas = mediaCanvasRef.current

    // Ensure both video and canvas are available
    if (video && canvas) {
      // Set canvas dimensions to match video dimensions
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw current frame of the video onto the canvas
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas content to data URL and trigger download
        const dataURL = canvas.toDataURL("image/png")
        const a = document.createElement("a")
        a.href = dataURL
        a.download = "screenshot.png"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    }
  }

  // Function to start recording the video stream
  const handleStartRecording = () => {
    if (!mediaStreamRef) return
    const video = mediaStreamRef.current

    if (video) {
      const stream = (
        video as HTMLVideoElement & { captureStream: () => MediaStream }
      ).captureStream()
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9",
      })

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    }
  }

  // Function to stop recording and download video
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        })
        recordedChunksRef.current = []

        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "recording.webm"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    }
  }

  return (
    <header className="space-y-2">
      <div className="flex space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCapture}
              disabled={!mediaStreamActive}
            >
              <ImageDownIcon className="size-4" />
              <span className="sr-only">
                Take a screenshot of the current frame
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Take a screenshot of the current frame
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={!mediaStreamActive}
            >
              {isRecording ? (
                <VideoOffIcon className="h-4 w-4" />
              ) : (
                <VideoIcon className="h-4 w-4" />
              )}
              <span className="sr-only">
                Start/stop recording of the stream
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Start/stop recording of the stream
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}
