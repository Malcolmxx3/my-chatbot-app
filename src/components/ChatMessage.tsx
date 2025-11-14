import dayjs from 'dayjs'
import type { ChatMessagesProps } from '../types/Chat'
import Spinner from './Spinner'

const ChatMessage = ({ chatMessage: { user, message, isLoading, time } }: { chatMessage: ChatMessagesProps }) => {

  return (
    <div className={`flex ${user === 'sender' ? 'justify-end' : 'justify-start'} gap-2`}>

      {user === 'robot' && (<img className='size-[50px] rounded-full object-cover border-white border-2' src='robot-icon.png' />)}

      <div className='bg-gray-200/90 py-3 px-4 rounded-lg max-w-xs overflow-hidden'>
        <span>
          {isLoading ? (<Spinner />) : message}
        </span>

        <p className='font-light text-gray-500 text-[14px]'>
          {time && dayjs(time).format('h:mma')}
        </p>
      </div>

      {user === 'sender' && (<img className='size-[50px] rounded-full object-cover border-white border-2' src='user.jpg' />)}

    </div>
  )
}

export default ChatMessage
