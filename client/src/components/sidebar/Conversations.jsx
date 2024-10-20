import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis'
import Conversation from './Conversation'

const Conversations = () => {
  const { loading, conversations } = useGetConversations()
  return (
    <div className="conversations">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? <span className="loadingg"></span> : null}
    </div>
  )
}
export default Conversations
