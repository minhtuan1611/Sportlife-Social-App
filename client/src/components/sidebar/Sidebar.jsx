import Conversations from './Conversations'
import SearchInput from './SearchInput'
import { useSelector } from 'react-redux'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from 'theme'

const Sidebar = () => {
  const mode = useSelector((state) => state.mode)
  const theme = createTheme(themeSettings(mode))
  return (
    <div
      className="sidebar"
      style={{ backgroundColor: theme.palettee.background.alt }}
    >
      <SearchInput
        color={theme.palettee.background.default}
        colorHover={theme.palettee.primary.dark}
      />
      <div className="dividerr"></div>
      <Conversations />
    </div>
  )
}
export default Sidebar
