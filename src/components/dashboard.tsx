import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { useAtom } from "jotai"
import {
  Bird,
  Book,
  BookOpenTextIcon,
  Bot,
  ChevronRightIcon,
  Code2,
  Settings2Icon,
  SettingsIcon,
  Share,
  SquareTerminal,
  SquareUser,
} from "lucide-react"

import {
  debugAtom,
  mediaStreamActiveAtom,
  selectedNavItemAtom,
} from "@/lib/atoms"
import { NavItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Chat } from "./controls/chat"
import MediaPlayer from "./media-player"
import ModeToggle from "./mode-toggle"
import { Models } from "./models"
import { Playground } from "./playground"
import { Settings } from "./settings"
import { Badge } from "./ui/badge"

export function Dashboard() {
  const [mediaStreamActive] = useAtom(mediaStreamActiveAtom)

  const navItems: NavItem[] = [
    {
      label: "Playground",
      icon: <SquareTerminal className="size-5" />,
      ariaLabel: "Playground",
      content: <Playground />,
    },
    {
      label: "LLM Models",
      icon: <Bot className="size-5" />,
      ariaLabel: "Models",
      content: <Models />,
    },
    {
      label: "API",
      icon: <Code2 className="size-5" />,
      ariaLabel: "API",
      content: <>api</>,
    },
    {
      label: "Settings",
      icon: <Settings2Icon className="size-5" />,
      ariaLabel: "Settings",
      content: <Settings />,
    },
  ]

  const [selectedNavItem, setSelectedNavItem] =
    useAtom<NavItem>(selectedNavItemAtom)

  useEffect(() => setSelectedNavItem(navItems[0]), [])

  const handleNavItemClick = (item) => {
    setSelectedNavItem(item)
  }

  return (
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Home"
            onClick={() => (window.location.href = "/")}
          >
            <Image src="/logo.png" alt="logo" width={24} height={24} />
          </Button>
        </div>

        <nav className="grid gap-1 p-2">
          {navItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-lg",
                    selectedNavItem.ariaLabel === item.ariaLabel && "bg-muted"
                  )}
                  aria-label={item.ariaLabel}
                  onClick={() => handleNavItemClick(item)}
                >
                  {item.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <Link
                  href="https://docs.heygen.com/docs/streaming-avatars-api"
                  target="_blank"
                >
                  <BookOpenTextIcon className="size-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Documentation
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Playground</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <SettingsIcon className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              {selectedNavItem.content}
            </DrawerContent>
          </Drawer>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
          </Button>

          <Button variant="outline" size="icon" className="text-sm" asChild>
            <Link
              href="https://github.com/agmmnn/streaming-avatar-playground"
              target="_blank"
            >
              <GitHubLogoIcon className="size-5" />
            </Link>
          </Button>

          <ModeToggle />
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            {/* <Playground /> */}
            {selectedNavItem.content}
          </div>
          <div
            className={cn(
              "relative flex h-full min-h-[50vh] flex-col rounded-xl bg-repeating-radial-light p-4 [background-size:20px_20px] dark:bg-repeating-radial-dark lg:col-span-2"
            )}
          >
            <Badge
              variant="outline"
              className="absolute right-3 top-3 font-mono font-normal"
            >
              {mediaStreamActive ? (
                <div className="flex space-x-1">
                  <svg
                    className="text-rose-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6.343 4.938a1 1 0 0 1 0 1.415a8.003 8.003 0 0 0 0 11.317a1 1 0 1 1-1.414 1.414c-3.907-3.906-3.907-10.24 0-14.146a1 1 0 0 1 1.414 0m12.732 0c3.906 3.907 3.906 10.24 0 14.146a1 1 0 0 1-1.415-1.414a8.003 8.003 0 0 0 0-11.317a1 1 0 0 1 1.415-1.415M9.31 7.812a1 1 0 0 1 0 1.414a3.92 3.92 0 0 0 0 5.544a1 1 0 1 1-1.415 1.414a5.92 5.92 0 0 1 0-8.372a1 1 0 0 1 1.415 0m6.958 0a5.92 5.92 0 0 1 0 8.372a1 1 0 0 1-1.414-1.414a3.92 3.92 0 0 0 0-5.544a1 1 0 0 1 1.414-1.414m-4.186 2.77a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"
                    />
                  </svg>
                  <div>Live</div>
                </div>
              ) : (
                <div className="flex space-x-1">
                  <svg
                    className="text-rose-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M3.28 2.22a.75.75 0 1 0-1.06 1.06l2.203 2.203c-3.393 3.93-3.224 9.872.506 13.602a1 1 0 0 0 1.414-1.415a8.004 8.004 0 0 1-.501-10.768l1.52 1.52a5.92 5.92 0 0 0 .533 7.763A1 1 0 0 0 9.31 14.77a3.92 3.92 0 0 1-.513-4.913l1.835 1.836a1.503 1.503 0 0 0 1.45 1.889q.201 0 .388-.051l8.25 8.25a.75.75 0 1 0 1.06-1.061zm15.748 13.626l1.462 1.462c2.414-3.861 1.942-9.012-1.415-12.37a1 1 0 1 0-1.415 1.415a8.01 8.01 0 0 1 1.368 9.493m-3.098-3.098l1.591 1.591a5.92 5.92 0 0 0-1.253-6.527a1 1 0 1 0-1.414 1.414a3.92 3.92 0 0 1 1.076 3.522"
                    />
                  </svg>
                  <div className="">Offline</div>
                </div>
              )}
            </Badge>
            <div className="flex-1">
              <MediaPlayer />
            </div>
            <Chat />
          </div>
        </main>
      </div>
    </div>
  )
}
