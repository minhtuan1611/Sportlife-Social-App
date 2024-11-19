import User from '../models/User.js'

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    )
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath }
      }
    )
    res.status(200).json(formattedFriends)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params

    const user = await User.findById(id)
    const friend = await User.findById(friendId)

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' })
    }
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((fid) => fid.toString() !== friendId)
      friend.friends = friend.friends.filter((fid) => fid.toString() !== id)
    } else {
      user.friends.push(friendId)
      friend.friends.push(id)
    }

    await user.save() // Save the updated user
    await friend.save() // Save the updated friend
    const updatedFriends = await Promise.all(
      user.friends.map((fid) => User.findById(fid))
    )

    const formattedFriends = updatedFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      })
    )
    res.status(200).json(formattedFriends)
  } catch (err) {
    console.error('Error in addRemoveFriend:', err)
    res.status(500).json({ message: err.message })
  }
}

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      '-password'
    )

    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
