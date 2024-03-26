export interface itemModel {
  id: number
  description: string
  quantity: number
  packed: boolean
}

export interface itemProp {
  item: itemModel
  handleDeleteItem: (id: number) => void
  onToggleItem: (id: number) => void
}
