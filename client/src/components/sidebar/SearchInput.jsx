import { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import useConversation from '../../zustand/useConversation'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const SearchInput = () => {
  const [search, setSearch] = useState('')
  const { setSelectedConversation } = useConversation()
  const conversations = useSelector((state) => state.user.friends)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    if (search.length < 3) {
      return toast.error('Search term must be at least 3 characters long')
    }

    const conversation = conversations.find((c) =>
      c.firstName.toLowerCase().includes(search.toLowerCase())
    )

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch('')
    } else toast.error('No such user found!')
  }
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="search-btn">
        <IoSearchSharp className="search-icon" />
      </button>
    </form>
  )
}
export default SearchInput
