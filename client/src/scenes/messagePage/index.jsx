import './index.css'
import { Box } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import Navbar from 'scenes/navbar'
import { useSelector } from 'react-redux'
import { themeSettings } from 'theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'

const Home = () => {
  const mode = useSelector((state) => state.mode)
  const theme = createTheme(themeSettings(mode))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Navbar />
        <div
          className="chat-app"
          style={{ backgroundColor: theme.palettee.background.default }}
        >
          <div
            className="container"
            style={{ backgroundColor: theme.palettee.background.alt }}
          >
            <Sidebar />
            <MessageContainer color={theme.palettee.primary.light} />
          </div>
        </div>
      </Box>
    </ThemeProvider>
  )
}

export default Home
