import PropTypes from 'prop-types'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFriends } from 'state'
import FlexBetween from './FlexBetween'
import UserImage from './UserImage'

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  hideAddButton, // Prop to control button visibility
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { _id } = useSelector((state) => state.user) // Logged-in user ID
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)

  const { palette } = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const REACT_APP_SERVER = process.env.REACT_APP_SERVER

  const isFriend = friends.find((friend) => friend._id === friendId)

  const patchFriend = async () => {
    const response = await fetch(
      `${REACT_APP_SERVER}/users/${_id}/${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        {/* User avatar */}
        <UserImage image={userPicturePath} size="55px" />
        {/* User name and subtitle */}
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`)
            navigate(0)
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {/* Conditionally render Add/Remove Friend button */}
      {!hideAddButton && friendId !== _id && (
        <IconButton
          onClick={patchFriend}
          sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  )
}

Friend.propTypes = {
  friendId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  userPicturePath: PropTypes.string.isRequired,
  hideAddButton: PropTypes.bool,
}

export default Friend
