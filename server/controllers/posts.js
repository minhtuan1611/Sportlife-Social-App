import mongoose from 'mongoose'
import Post from '../models/Post.js'
import User from '../models/User.js'

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: 'User not found' })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    })

    await newPost.save()
    res.status(201).json(await Post.find())
  } catch (err) {
    console.error('Error in createPost:', err.message)
    res.status(500).json({ message: err.message })
  }
}

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (err) {
    console.error('Error in getFeedPosts:', err.message)
    res.status(500).json({ message: err.message })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params

    const posts = await Post.find({ userId })
    if (!posts.length) {
      return res.status(404).json({ message: 'No posts found for this user' })
    }

    res.status(200).json(posts)
  } catch (err) {
    console.error('Error in getUserPosts:', err.message)
    res.status(500).json({ message: err.message })
  }
}

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body

    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const isLiked = post.likes.get(userId)

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )

    res.status(200).json(updatedPost)
  } catch (err) {
    console.error('Error in likePost:', err.message)
    res.status(500).json({ message: err.message })
  }
}

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params
    const { userId, comment } = req.body

    // Validate postId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    post.comments.push({ userId, comment })
    await post.save()

    res.status(200).json(post)
  } catch (err) {
    console.error('Error in commentPost:', err.message)
    res.status(500).json({ message: err.message })
  }
}
