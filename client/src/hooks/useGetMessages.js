import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const REACT_APP_SERVER = process.env.REACT_APP_SERVER

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  const token = useSelector((state) => state.token)

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${REACT_APP_SERVER}/messages/${selectedConversation._id}`,
          // add authorization
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setMessages(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (selectedConversation?._id) {
      getMessages()
    }
  }, [selectedConversation._id, setMessages, token])

  return { messages, loading }
}
export default useGetMessages
