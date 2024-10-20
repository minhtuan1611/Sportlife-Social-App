import { useEffect } from 'react'
import useConversation from '../../zustand/useConversation'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { TiMessages } from 'react-icons/ti'
import { useAuthContext } from '../../context/AuthContext'

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className="message-container">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
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
  const { authUser } = useAuthContext()
  return (
    <div className="welcome-message">
      <div className="welcome-message-content">
        <p>Welcome 👋 {authUser.firstName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="welcome-message-icon" />
      </div>
    </div>
  )
}
