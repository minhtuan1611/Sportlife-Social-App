import PropTypes from 'prop-types'
import { extractTime } from '../../utils/extractTime'
import useConversation from '../../zustand/useConversation'
import { useSelector } from 'react-redux'
import UserImage from '../UserImage'

const Message = ({ message }) => {
  const { _id, picturePath } = useSelector((state) => state.user)
  const { selectedConversation } = useConversation()
  const fromMe = message.senderId === _id
  const formattedTime = extractTime(message.createdAt)
  const profilePicc = fromMe ? picturePath : selectedConversation?.picturePath
  const bubbleBgColor = fromMe ? 'blue' : 'white'
  const shakeClass = message.shouldShake ? 'shake' : ''

  return fromMe ? (
    <div className="chat chat-end">
      <div className="chat-message-container">
        <div className={`chat-message ${bubbleBgColor} ${shakeClass}`}>
          {message.message}
        </div>
        <div className="chat-time">{formattedTime}</div>
      </div>
      <UserImage image={profilePicc} size="40px" style={{ padding: '10px' }} />
    </div>
  ) : (
    <div className="chat chat-start">
      <UserImage image={profilePicc} size="40px" style={{ padding: '10px' }} />
      <div className="chat-message-container">
        <div className={`chat-message ${bubbleBgColor} ${shakeClass}`}>
          {message.message}
        </div>
        <div className="chat-time">{formattedTime}</div>
      </div>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.shape({
    senderId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    shouldShake: PropTypes.bool,
  }).isRequired,
}

export default Message
