import MessageContainer from '../../components/messages/MessageContainer'
import Sidebar from '../../components/sidebar/Sidebar'

const Home = () => {
  return (
    <div className="chat-app">
      <div className="container ">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  )
}
export default Home
