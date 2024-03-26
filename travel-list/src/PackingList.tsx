import React, { useState } from 'react'
import { itemModel } from './Models.ts'
import Item from './Item.tsx'

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState('input')

  let sortedItems: itemModel[] = []
  if (sortBy === 'input') sortedItems = items
  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a: { description: string }, b: { description: string }) =>
        a.description.localeCompare(b.description)
      )

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort(
        (a: { packed: boolean }, b: { packed: boolean }) =>
          Number(a.packed) - Number(b.packed)
      )
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item: itemModel) => (
          <Item
            item={item}
            key={item.id}
            handleDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  )
}

export default PackingList
