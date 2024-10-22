export const getTimeDifference = (timestamp) => {
  if (!timestamp) return ''
  const now = new Date()
  const date = new Date(timestamp)
  const diffInSeconds = Math.floor((now - date) / 1000)

  const days = Math.floor(diffInSeconds / (3600 * 24))
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((diffInSeconds % 3600) / 60)
  const seconds = diffInSeconds % 60

  if (days > 0) return `${days}d `
  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m `
  return `${seconds}s `
}

export const truncateMessage = (message) => {
  const maxLength = 15 // Define your maximum length here
  if (message.length > maxLength) {
    return message.substring(0, maxLength - 3) + '...'
  } else {
    return message
  }
}
