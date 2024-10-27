import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme, Link } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserImage from '../../components/UserImage'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'

const REACT_APP_SERVER = process.env.REACT_APP_SERVER

// eslint-disable-next-line react/prop-types
const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null)
  const { palette } = useTheme()
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main

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

  if (!user) {
    return null
  }

  const { firstName, lastName, location, occupation, friends } = user

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} size="60px" />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Link
                href="https://www.linkedin.com/in/tuan-nguyen1611/"
                color={medium}
              >
                Connect with me!
              </Link>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                My profile
              </Typography>
              <Link href="https://tuan-s-portfolio.vercel.app/" color={medium}>
                Contact me!
              </Link>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}

export default UserWidget
