import { useEffect, useState } from "react"
import { NewSessionRequestQualityEnum } from "@heygen/streaming-avatar"
import { useAtom } from "jotai"

import {
  avatarIdAtom,
  publicAvatarsAtom,
  qualityAtom,
  voiceIdAtom,
} from "@/lib/atoms"

import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export function Session() {
  const [publicAvatars, setPublicAvatars] = useAtom(publicAvatarsAtom)
  const [quality, setQuality] = useAtom(qualityAtom)
  const [avatarId, setAvatarId] = useAtom(avatarIdAtom)
  const [voiceId, setVoiceId] = useAtom(voiceIdAtom)

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch("/public-streaming-avatars.json")
        const data = await response.json()
        setPublicAvatars(data.data.avatar)
      } catch (error) {
        console.error("Error fetching avatars:", error)
      }
    }
    fetchAvatars()
  }, [])

  useEffect(() => {
    if (avatarId !== "") {
      const default_voice = publicAvatars.find(
        (avatar) => avatar.pose_id === avatarId
      )["default_voice"]["free"]

      setVoiceId(default_voice)
      console.log(default_voice)
    }
  }, [avatarId])

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Session</legend>
      <div className="grid gap-3">
        <Label htmlFor="model">Avatar ID</Label>
        <Select onValueChange={(x) => setAvatarId(x)}>
          <SelectTrigger
            id="model"
            className="items-start [&_[data-description]]:hidden"
          >
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            {publicAvatars.map((avatar) => (
              <SelectItem
                value={avatar.pose_id}
                key={avatar.pose_id}
                className="cursor-pointer"
              >
                <div className="flex items-start gap-3 text-muted-foreground">
                  {/* <Rabbit className="size-5" /> */}
                  <div className="grid gap-0.5">
                    <p>
                      <span className="pr-2 font-medium text-foreground">
                        {avatar.pose_name}
                      </span>
                      {avatar.gender}
                    </p>
                    <p className="text-xs" data-description>
                      {avatar.pose_id}
                    </p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="model">Voice ID</Label>
        <Select onValueChange={(x) => setVoiceId(x)}>
          <SelectTrigger
            id="model"
            className="items-start [&_[data-description]]:hidden"
          >
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>Enter your API key</SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="model">Bitrate</Label>
        <Select
          onValueChange={(x: NewSessionRequestQualityEnum) => setQuality(x)}
          defaultValue={quality}
        >
          <SelectTrigger className="items-start [&_[data-description]]:hidden">
            <SelectValue placeholder={quality} defaultValue={quality} />
          </SelectTrigger>
          <SelectContent>
            {["high", "medium", "low"].map((quality) => (
              <SelectItem
                value={quality}
                key={quality}
                className="cursor-pointer"
              >
                <div className="flex items-start gap-3 text-muted-foreground">
                  <div className="grid gap-0.5">
                    <p>
                      <span className="pr-2 font-medium capitalize text-foreground">
                        {quality}
                      </span>
                    </p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </fieldset>
  )
}
