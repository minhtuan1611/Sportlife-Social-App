import PropTypes from 'prop-types'
import UserImage from '../UserImage'
import { getTimeDifference, truncateMessage } from '../../utils/message'
const Conversation = ({
  conversation,
  lastMessage,
  isSelected,
  setSelectedConversation,
  isLast,
}) => {
  return (
    <>
      <div
        className={`conversation ${isSelected ? 'selected' : ''}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <UserImage image={conversation.picturePath} size="55px" />
        <div className="conversation-details">
          <div className="details-top">
            <p className="font">{conversation.firstName}</p>
          </div>
          <p className="message-content">
            {lastMessage ? truncateMessage(lastMessage.message) : ''}
            {lastMessage ? getTimeDifference(lastMessage.createdAt) : ''}
          </p>
        </div>
      </div>

      {!isLast && <div className="divider" />}
    </>
  )
}

Conversation.propTypes = {
  conversation: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    picturePath: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
  }).isRequired,
  lastMessage: PropTypes.object,
  isSelected: PropTypes.bool.isRequired,
  setSelectedConversation: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
}

export default Conversation
