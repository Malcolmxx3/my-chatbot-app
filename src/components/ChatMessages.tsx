import { useScrollHeight } from "@/useScrollHeight"
import type { ChatMessagesProps } from "../types/Chat"
import ChatMessage from "./ChatMessage"

const ChatMessages = ({ chatMessages } : { chatMessages: ChatMessagesProps[] }) => {
  const chatMessagesRef = useScrollHeight(chatMessages);

  
  return (
    <div 
      className='grow flex flex-col gap-3 overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      ref={chatMessagesRef}
    >
      {chatMessages.length === 0 
        ? <p className='text-white text-center font-bold text-lg mt-12'>Welcome! 💬 Feel free to ask me anything.</p> 
        : chatMessages.map((chatMessage) => (
        <ChatMessage
          key={chatMessage.id}
          chatMessage={chatMessage}
        />
      ))}
    </div>
  )
}

export default ChatMessages
