import { useState } from 'react'
import { BsSend } from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage'

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message) return
    await sendMessage(message)
    setMessage('')
  }

  return (
    <>
      <form className="message-input" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            className="message-input-field"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="send-button">
            {loading ? <div className="loadingg"></div> : <BsSend />}
          </button>
        </div>
      </form>
    </>
  )
}
export default MessageInput
