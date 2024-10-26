import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const REACT_APP_SERVER = process.env.REACT_APP_SERVER

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  const token = useSelector((state) => state.token)

  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const res = await fetch(
        `${REACT_APP_SERVER}/messages/send/${selectedConversation._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          // eslint-disable-next-line no-undef
          body: JSON.stringify({ message }),
        }
      )
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setMessages([...messages, data])
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}
export default useSendMessage
