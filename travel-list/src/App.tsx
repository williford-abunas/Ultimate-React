import React, { useState } from 'react'
import Logo from './Logo.tsx'
import Form from './Form.tsx'
import { itemModel } from './Models.ts'
import PackingList from './PackingList.tsx'
import Stats from './Stats.tsx'

export default function App() {
  const [items, setItems] = useState<itemModel[]>([])

  const handleAddItems = (item: itemModel) => {
    setItems((items) => [...items, item])
  }

  const handleDeleteItem = (id: number) => {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  const handleToggleItem = (id: number) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  const handleClearList = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?'
    )

    if (confirmed) setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}
