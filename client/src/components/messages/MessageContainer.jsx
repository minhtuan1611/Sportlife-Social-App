import { useEffect } from 'react'
import useConversation from '../../zustand/useConversation'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { TiMessages } from 'react-icons/ti'
import { useSelector } from 'react-redux'

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className="message-container">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="message-header">
            <span className="label-text">To: </span>
            <span className="text-color">{selectedConversation.firstName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  )
}
export default MessageContainer

const NoChatSelected = () => {
  const { firstName } = useSelector((state) => state.user)

  return (
    <div className="welcome-message">
      <div className="welcome-message-content">
        <p>Welcome 👋 {firstName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="welcome-message-icon" />
      </div>
    </div>
  )
}
