import ButtonIcon from '../../ui/ButtonIcon'
import SpinnerMini from '../../ui/SpinnerMini'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useLogOut } from './useLogOut'

function LogOut() {
  const { logOut, isLoading } = useLogOut()

  return (
    <ButtonIcon disabled={isLoading} onClick={logOut}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  )
}

export default LogOut
