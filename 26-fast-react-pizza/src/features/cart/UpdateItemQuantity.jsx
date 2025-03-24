import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

// eslint-disable-next-line react/prop-types
function UpdateItemQuantity({pizzaId, currentQuantity}) {
  const dispatch = useDispatch()
  return (
    <div className="flex gap-2 md:gap-3 items-center">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
      <span className='text-sm font-medium'>{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  )
}

export default UpdateItemQuantity