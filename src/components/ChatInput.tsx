import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { getGroqChatCompletion } from '../groq-api'
import dayjs from 'dayjs'

import type { ChatMessagesProps } from '../types/Chat'

const ChatInput = ({ chatMessages, setChatMessages }: { chatMessages: ChatMessagesProps[], setChatMessages(a: ChatMessagesProps[]): void }) => {

  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (isLoading || textInput === '') return

    setIsLoading(true);

    const senderMessage = [
      ...chatMessages,
      {
        id: crypto.randomUUID(),
        message: textInput,
        user: 'sender',
        time: dayjs().valueOf()
      }
    ]

    setChatMessages(senderMessage)

    setTextInput('');

    setChatMessages([
      ...senderMessage,
      {
        id: crypto.randomUUID(),
        message: 'loading',
        user: 'robot',
        isLoading: true,
      }
    ])

    const apiResponse = async () => {
      try {
        const result = await getGroqChatCompletion(textInput);
        const response = result.choices[0]?.message?.content || 'timeout';
        return response
      } catch(err) {
        if (err instanceof Error)
          return err.message;
      }
    }

    setChatMessages([
      ...senderMessage,
      {
        id: crypto.randomUUID(),
        message: await apiResponse(),
        user: 'robot',
        time: dayjs().valueOf(),
        isLoading: false,
      }
    ])

    setIsLoading(false)
  }

  const clearInput = () => {
    localStorage.removeItem('messages');
    setChatMessages([]);
    setTextInput('');
    setIsLoading(false);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
    if (e.key === 'Escape') clearInput();
  }
  

  return (
    <div className='flex gap-3 w-full'>
      <input
        className='rounded-3xl py-2 px-6 grow placeholder-gray-400/60 font-extralight border outline-green-500 caret-pink-500 border-white text-white'
        type='text'
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        onKeyDown={(e) => onKeyDown(e)}
        placeholder='send a message to chatbot'
        id='text-input'
      />

      <button
        className='bg-green-700 text-white font-bold py-2 px-4 rounded-3xl hover:bg-green-600 hover:border-black border-2'
        onClick={sendMessage}
      >
        Send
      </button>

      <button
        className='bg-red-600 py-2 px-4 text-white font-bold rounded-3xl hover:bg-red-700 hover:border-black border-2'
        onClick={clearInput}
      >
        Clear
      </button>
    </div>
  )
}

export default ChatInput
