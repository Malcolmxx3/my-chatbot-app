import { useState, useEffect } from "react"
import type { ChatMessagesProps } from "./types/Chat"
import ChatMessages from "./components/ChatMessages"
import ChatInput from "./components/ChatInput"

function App() {
  const [chatMessages, setChatMessages] = useState<ChatMessagesProps[]>(() => {
    const message = localStorage.getItem('messages')
    if (message) return JSON.parse(message)
    return [];
  })

  useEffect(() => {
    const length = chatMessages.length - 1;
    if (chatMessages[length]?.message === 'loading') {
      chatMessages.pop()
      chatMessages.pop()
    }

    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  return (
    <>
      <main className='flex justify-center w-full bg-chatbot h-screen bg-cover bg-center'>
        <div className='w-xl mx-12 flex flex-col gap-4  mt-4 mb-8'>
          <ChatMessages
            chatMessages={chatMessages}
          />
          
          <ChatInput 
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
          />
        </div>
      </main>
    </>
  )
}

export default App
