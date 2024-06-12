import { useAtom } from "jotai"
import { ImageUpIcon, UploadIcon } from "lucide-react"

import { customBgPicAtom, removeBGAtom } from "@/lib/atoms"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"

export function Background() {
  const [removeBG, setRemoveBG] = useAtom(removeBGAtom)
  const [customBgPic, setCustomBgPic] = useAtom(customBgPicAtom)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0] // Assuming only one file is selected
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setCustomBgPic(imageUrl)
    }
  }

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Background</legend>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="remove-bg-switch">Remove Background:</Label>
          <Switch
            id="remove-bg-switch"
            defaultChecked={removeBG}
            onCheckedChange={() => setRemoveBG(!removeBG)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture" className="flex flex-row space-x-1">
            <ImageUpIcon className="size-4" /> <p>Custom Picture:</p>
          </Label>
          <Input id="picture" type="file" onChange={handleFileChange} />
          {customBgPic && (
            <img
              src={customBgPic}
              alt="Custom Background"
              className="rounded-lg shadow-md"
            />
          )}
        </div>
      </div>
    </fieldset>
  )
}
