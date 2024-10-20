import PropTypes from 'prop-types'
import { useSocketContext } from '../../context/SocketContext'
import useConversation from '../../zustand/useConversation'

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  const isSelected = selectedConversation?._id === conversation._id
  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)

  return (
    <>
      <div
        className={`conversation ${isSelected ? 'selected' : ''}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="avatar-img">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="conversation-details">
          <div className="details-top">
            <p className="font">{conversation.firstName}</p>
            <span className="emoji">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider" />}
    </>
  )
}

Conversation.propTypes = {
  conversation: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
  }).isRequired,
  lastIdx: PropTypes.number,
  emoji: PropTypes.string,
}

export default Conversation
