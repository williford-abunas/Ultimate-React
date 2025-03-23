import Button from '../../ui/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

function UpdateItemQuantity({pizzaId}) {
  return (
    <div className="flex gap-1 md:gap-3 items-center">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>

    </div>
  )
}

export default UpdateItemQuantity