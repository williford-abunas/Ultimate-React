import React from 'react'
import { itemProp } from './Models.ts'

function Item({ item, handleDeleteItem, onToggleItem }: itemProp) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => {
          onToggleItem(item.id)
        }}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
        <button onClick={() => handleDeleteItem(item.id)}>❌</button>
      </span>
    </li>
  )
}

export default Item
