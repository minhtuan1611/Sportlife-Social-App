import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import UserImage from '../UserImage'
import { getTimeDifference, truncateMessage } from '../../utils/message'
import styled from 'styled-components'

const ConversationWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center; /* Vertically center the child elements */
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  &:hover {
    background-color: ${({ color }) => color};
  }

  &.selected {
    background-color: ${({ color }) => color};
  }
`

const Conversation = ({
  conversation,
  lastMessage,
  isSelected,
  setSelectedConversation,
  isLast,
  color,
}) => {
  const [timeDifference, setTimeDifference] = useState(
    lastMessage ? getTimeDifference(lastMessage.createdAt) : ''
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lastMessage) {
        setTimeDifference(getTimeDifference(lastMessage.createdAt))
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [lastMessage])

  return (
    <>
      <ConversationWrapper
        className={isSelected ? 'selected' : ''}
        onClick={() => setSelectedConversation(conversation)}
        color={color}
      >
        <UserImage image={conversation.picturePath} size="55px" />
        <div className="conversation-details">
          <div className="details-top">
            <p className="font">{conversation.firstName}</p>
          </div>
          <p className="message-content">
            {lastMessage ? truncateMessage(lastMessage.message) : ''}
            {lastMessage ? timeDifference : ''}
          </p>
        </div>
      </ConversationWrapper>

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
  color: PropTypes.string.isRequired,
}

export default Conversation
