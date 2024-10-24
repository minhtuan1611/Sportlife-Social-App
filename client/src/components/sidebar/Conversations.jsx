import PropTypes from 'prop-types'
import Conversation from './Conversation'
import { useSelector } from 'react-redux'
import useConversation from '../../zustand/useConversation'
import useGetLastMessage from '../../hooks/useGetLastMessage'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from 'theme'

const Conversations = () => {
  const conversations = useSelector((state) => state.user.friends)
  const mode = useSelector((state) => state.mode)
  const { selectedConversation, setSelectedConversation } = useConversation()
  const theme = createTheme(themeSettings(mode))

  return (
    <div className="conversations">
      {conversations.map((conversation, idx) => (
        <ConversationWrapper
          key={conversation._id}
          conversation={conversation}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          isLast={idx === conversations.length - 1}
          color={theme.palette.primary.light}
        />
      ))}
    </div>
  )
}

const ConversationWrapper = ({
  conversation,
  selectedConversation,
  setSelectedConversation,
  isLast,
  color,
}) => {
  const { lastMessage, loading } = useGetLastMessage(conversation._id)
  const isSelected = selectedConversation?._id === conversation._id

  return (
    <Conversation
      conversation={conversation}
      lastMessage={lastMessage}
      isSelected={isSelected}
      setSelectedConversation={setSelectedConversation}
      isLast={isLast}
      loading={loading}
      color={color}
    />
  )
}

// Prop type validation for ConversationWrapper
ConversationWrapper.propTypes = {
  conversation: PropTypes.object.isRequired,
  selectedConversation: PropTypes.object,
  setSelectedConversation: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
}

export default Conversations
