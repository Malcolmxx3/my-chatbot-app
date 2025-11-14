import type { ReactNode } from "react"

export type ChatMessagesProps = {
  id: string;
  message: ReactNode;
  user: string;
  time?: number;
  isLoading?: boolean;
}
