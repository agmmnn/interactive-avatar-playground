import { Background } from "./background"
import { Session } from "./session"

export function Playground() {
  return (
    <form className="grid w-full items-start gap-4">
      <Session />
      <Background />
    </form>
  )
}
