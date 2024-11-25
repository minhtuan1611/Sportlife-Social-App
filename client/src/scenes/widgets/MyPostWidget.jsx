import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import Dropzone from 'react-dropzone'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'
import WidgetWrapper from 'components/WidgetWrapper'
import FlexBetween from '../../components/FlexBetween'
import UserImage from '../../components/UserImage'

const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState(null)
  const [post, setPost] = useState('')

  const { palette } = useTheme()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  const mediumMain = palette.neutral.mediumMain
  const medium = palette.neutral.medium

  const handlePost = async () => {
    let imageUrl = ''
    if (image) {
      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      try {
        const response = await fetch(CLOUDINARY_URL, {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        if (data.secure_url) {
          imageUrl = data.secure_url
          console.log('Image uploaded to Cloudinary:', imageUrl)
        } else {
          throw new Error('Failed to retrieve image URL')
        }
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error)
        return // Exit if upload fails
      }
    }

    const postData = {
      userId: _id,
      description: post,
      picturePath: imageUrl,
      userPicturePath: picturePath,
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      })
      const posts = await response.json()
      dispatch(setPosts({ posts }))
      setImage(null)
      setPost('')

    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} size="60px" />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
          aria-label="Write your post here"
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                  aria-label="Click to upload an image file"
                >
                  <input
                    {...getInputProps()}
                    aria-label="Upload an image file"
                  />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '15%' }}
                    aria-label="Remove uploaded image"
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined
            sx={{ color: mediumMain }}
            aria-label="Toggle image upload section"
          />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
            aria-label="Click to toggle image upload section"
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <></>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
          aria-label="Post your status update"
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}

MyPostWidget.propTypes = {
  picturePath: PropTypes.string.isRequired,
}

export default MyPostWidget
