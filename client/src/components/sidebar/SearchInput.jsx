import { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import useConversation from '../../zustand/useConversation'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

// eslint-disable-next-line react/prop-types
const SearchInput = ({ color, colorHover }) => {
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
    <form
      className="search-form"
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
        borderRadius: '1rem',
        backgroundColor: '#f0f0f0',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
        marginBottom: '1rem',
      }}
    >
      <input
        type="text"
        placeholder="Search…"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          height: '2.5rem',
          padding: '0.5rem 1rem',
          border: 'none',
          outline: 'none',
          flexGrow: 1,
          borderRadius: '1rem 0 0 1rem',
          backgroundColor: 'transparent',
        }}
      />
      <button
        type="submit"
        className="search-btn"
        style={{
          backgroundColor: color,
          color: '#fff',
          border: 'none',
          height: '2.5rem',
          width: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0 1rem 1rem 0',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = colorHover)
        }
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = color)}
      >
        <IoSearchSharp />
      </button>
    </form>
  )
}

export default SearchInput
