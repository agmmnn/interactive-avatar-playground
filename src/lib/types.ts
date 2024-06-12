import { ReactNode } from "react"

export interface NavItem {
  label: string
  icon: ReactNode // Assuming icon is a ReactNode (could be JSX.Element or any other suitable type)
  ariaLabel: string
  content: ReactNode // Assuming content is a ReactNode (could be JSX.Element or any other suitable type)
}
