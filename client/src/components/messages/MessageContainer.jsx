import { useEffect } from 'react'
import useConversation from '../../zustand/useConversation'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { TiMessages } from 'react-icons/ti'
import { useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
const MessageContainer = ({ color }) => {
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
          <div
            className="message-header"
            style={{
              backgroundColor: color,
            }}
          >
            <span className="label-text">To: </span>
            <span className="text-color">{selectedConversation.firstName}</span>
          </div>
          <Messages blueColor="#00a0bc" whiteColor="#ffffff" /> <MessageInput />
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
