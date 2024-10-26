import { Typography, useTheme, Link } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import WidgetWrapper from 'components/WidgetWrapper'

const REACT_APP_SERVER = process.env.REACT_APP_SERVER

const AdvertWidget = () => {
  const { palette } = useTheme()
  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium
  const imgUrl = `${REACT_APP_SERVER}/assets/info4.jpeg`

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <Link
        href="https://www.linkedin.com/in/tuan-nguyen1611/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'block', textDecoration: 'none' }}
      >
        <img
          width="100%"
          height="auto"
          alt="advert"
          src={{ imgUrl }}
          style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
        />
      </Link>
      <FlexBetween>
        <Typography color={main}>Udemy</Typography>
        <Link
          href="https://www.linkedin.com/in/minh-tuan-nguyen-91761a1a4/"
          color={medium}
          target="_blank" // Open the link in a new tab
          rel="noopener noreferrer"
        >
          udemy.com
        </Link>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Investing In Stocks The Complete Course! (17+ Hours)
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget
