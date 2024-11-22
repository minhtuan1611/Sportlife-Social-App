import PropTypes from 'prop-types'
import { Box } from '@mui/material'

const REACT_APP_SERVER = process.env.REACT_APP_SERVER

const UserImage = ({ image, size }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={`${REACT_APP_SERVER}/assets/${image}`}
      />
    </Box>
  )
}

UserImage.propTypes = {
  image: PropTypes.string.isRequired,
  size: PropTypes.string,
}

export default UserImage
