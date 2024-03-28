import React from 'react'
import { useState } from 'react'
import initialFriends from './data.ts'
import { friendsModel } from './Models.ts'

function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState<friendsModel | null>(
    null
  )

  const handleShowForm = () => {
    setShowAddFriend((showAddFriend: boolean) => !showAddFriend)
  }

  const handleAddFriend = (friend: friendsModel) => {
    setFriends((friends) => [...friends, friend])
    setShowAddFriend(false)
  }

  const handleSelection = (friend: friendsModel) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend))
    setShowAddFriend(false)
  }

  const handleSplitBill = (value: any) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    )

    setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelect={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowForm}>
          {showAddFriend ? 'close' : 'Add friend'}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  )
}

function FriendsList({ friends, onSelect, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend: friendsModel) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelect={onSelect}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  )
}

interface friendProps {
  friend: friendsModel
  onSelect: any
  selectedFriend: friendsModel
}

function Friend({ friend, onSelect, selectedFriend }: friendProps) {
  const isSelected = selectedFriend?.id === friend.id
  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}.
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}.
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <Button onClick={() => onSelect(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  )
}

function Button({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!name || !image) return

    const id = crypto.randomUUID()
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    }

    onAddFriend(newFriend)

    setName('')
    setImage('https://i.pravatar.cc/48')
  }

  return (
    <form action="POST" className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="friendName">🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        name="friendName"
        id="friendName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="image">📷 Image URL</label>
      <input
        type="text"
        name="image"
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState<string | number>('')
  const [paidByUser, setPaidByUser] = useState<string | number>('')
  const paidByFriend = bill ? Number(bill) - Number(paidByUser) : ''
  const [whoIsPaying, setWhoIsPaying] = useState('user')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!bill || !paidByUser) return

    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
  }

  return (
    <form action="" className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label htmlFor="bill">💰 Bill value</label>
      <input
        type="text"
        name="bill"
        id="bill"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label htmlFor="expense">🤑 Your expense</label>
      <input
        type="text"
        name="expense"
        id="expense"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > Number(bill)
              ? paidByUser
              : Number(e.target.value)
          )
        }
      />

      <label htmlFor="bill">🧑🏻‍🤝‍🧑🏾 {selectedFriend.name}'s expense</label>
      <input type="text" name="bill" id="bill" disabled value={paidByFriend} />

      <label htmlFor="paying">Who is paying the bill?</label>
      <select
        name="paying"
        id="paying"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  )
}

export default App
