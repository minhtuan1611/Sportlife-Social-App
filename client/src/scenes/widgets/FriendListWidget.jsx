import { Box, Typography, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from 'state'
import WidgetWrapper from '../../components/WidgetWrapper'
import Friend from '../../components/Friend'

const REACT_APP_SERVER = process.env.REACT_APP_SERVER

// eslint-disable-next-line react/prop-types
const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)

  const getFriends = async () => {
    const response = await fetch(
      `${REACT_APP_SERVER}/users/${userId}/friends`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  useEffect(() => {
    getFriends()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) =>
          friend._id ? (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ) : null
        )}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendListWidget
