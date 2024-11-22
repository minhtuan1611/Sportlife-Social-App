import PropTypes from 'prop-types' // Import PropTypes
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'
import PostWidget from './PostWidget'

const REACT_APP_SERVER = process.env.REACT_APP_SERVER

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts) || []
  const token = useSelector((state) => state.token)

  const getPosts = async () => {
    try {
      const response = await fetch(`${REACT_APP_SERVER}/posts`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      dispatch(setPosts({ posts: data }))
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const getUserPosts = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_SERVER}/posts/${userId}/posts`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!response.ok) throw new Error('Failed to fetch user posts')
      const data = await response.json()
      dispatch(setPosts({ posts: data }))
    } catch (error) {
      console.error('Error fetching user posts:', error)
    }
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts()
    } else {
      getPosts()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(posts) &&
        [...posts]
          .reverse()
          .map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              description,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
            }) => (
              <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
              />
            )
          )}
    </>
  )
}

// Add PropTypes for validation
PostsWidget.propTypes = {
  userId: PropTypes.string,
  isProfile: PropTypes.bool,
}

export default PostsWidget
