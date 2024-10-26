import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const REACT_APP_SERVER = process.env.REACT_APP_SERVER

const useGetLastMessage = (conversationId) => {
  const [loading, setLoading] = useState(false)
  const [lastMessage, setLastMessage] = useState(null)
  const token = useSelector((state) => state.token)

  useEffect(() => {
    const getLastMessage = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${REACT_APP_SERVER}/messages/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setLastMessage(data.length > 0 ? data[data.length - 1] : null)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (conversationId) {
      getLastMessage()
    }
  }, [conversationId, token])

  return { lastMessage, loading }
}

export default useGetLastMessage
