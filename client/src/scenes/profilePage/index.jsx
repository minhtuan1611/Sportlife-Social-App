import { Box, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from 'scenes/navbar'
import FriendListWidget from 'scenes/widgets/FriendListWidget'
import MyPostWidget from 'scenes/widgets/MyPostWidget'
import PostsWidget from 'scenes/widgets/PostsWidget'
import UserWidget from 'scenes/widgets/UserWidget'

const REACT_APP_SERVER = process.env.REACT_APP_SERVER

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const token = useSelector((state) => state.token)
  const loggedInUserId = useSelector((state) => state.user?._id) // Assuming the logged-in user's ID is stored here
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  const getUser = async () => {
    const response = await fetch(`${REACT_APP_SERVER}/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null

  const isUserProfile = userId === loggedInUserId

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        paddingTop="5.5rem"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget
            userId={userId}
            picturePath={user.picturePath}
            size="60px"
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          {isUserProfile && <MyPostWidget picturePath={user.picturePath} />}
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile hideAddFriendButton />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
