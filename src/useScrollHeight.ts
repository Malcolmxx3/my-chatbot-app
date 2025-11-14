import { useRef, useEffect } from "react"
import type { ChatMessagesProps } from "./types/Chat";

export const useScrollHeight = (dependencies: ChatMessagesProps[]) => {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = containerRef.current;

    if (containerElem) 
      containerElem.scrollTop = containerElem.scrollHeight;

  }, [dependencies])

  return containerRef
}