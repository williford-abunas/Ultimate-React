import ButtonIcon from '../ui/ButtonIcon'
import { useDarkMode } from '../context/DarkModeContext'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2'

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  )
}
