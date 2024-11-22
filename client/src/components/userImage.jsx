import PropTypes from 'prop-types'
import { Box } from '@mui/material'

const UserImage = ({ image, size }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={`${image}`}
      />
    </Box>
  )
}

UserImage.propTypes = {
  image: PropTypes.string.isRequired,
  size: PropTypes.string,
}

export default UserImage
