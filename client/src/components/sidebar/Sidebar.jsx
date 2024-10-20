import Conversations from './Conversations'

import SearchInput from './SearchInput'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SearchInput />
      <div className="dividerr"></div>
      <Conversations />
    </div>
  )
}
export default Sidebar
