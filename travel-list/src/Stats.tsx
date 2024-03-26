import React from 'react'

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items in your packing list.🚀</em>
      </p>
    )
  const numItems = items.length
  const numPacked = items.filter((item: { packed: any }) => item.packed).length

  const percentage = (numPacked / numItems) * 100

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'You got everything ready to go!✈️'
          : `You have ${numItems} items on your list, and you already packed
        ${numPacked} (${Math.round(percentage)}%).`}
      </em>
    </footer>
  )
}

export default Stats
