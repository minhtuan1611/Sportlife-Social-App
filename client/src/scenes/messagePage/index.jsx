import MessageContainer from '../../components/messages/MessageContainer'
import { Box } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from 'scenes/navbar'

const Home = () => {
  return (
    <Box>
      <Navbar />
      <div className="chat-app">
        <div className="container ">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </Box>
  )
}
export default Home
