import React, { useState } from 'react'

function App() {
  return (
    <>
      <h1>Counter & Date</h1>
      <Counter />
    </>
  )
}

function Counter() {
  const [counter, setCounter] = useState(0)
  const [range, setRange] = useState(0)

  const date = new Date()
  date.setDate(date.getDate() + counter)

  const handleAddCount = () => {
    setCounter((prevCount: number) => prevCount + Number(range))
  }
  const handleMinusCount = () => {
    setCounter((prevCount: number) => prevCount - Number(range))
  }

  const handleRange = (stepRange: any) => {
    setRange(stepRange)
  }

  const handleCountChange = (count: number) => {
    setCounter(Number(count))
  }

  return (
    <>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={range}
          onChange={(e) => handleRange(e.target.value)}
        />
        <p>{range}</p>
      </div>

      <div className="counterContainer">
        <button className="minus" onClick={handleMinusCount}>
          -
        </button>
        <input
          type="text"
          onChange={(e) => handleCountChange(Number(e.target.value))}
          value={counter}
        />
        <button className="plus" onClick={handleAddCount}>
          +
        </button>
      </div>
      <p className="message">
        <span>
          {counter === 0
            ? 'Today is'
            : counter > 0
            ? `${counter} days from today is `
            : `${Math.abs(counter)} days ago was`}
        </span>
        <span>{date.toDateString()}.</span>
      </p>
      {counter !== 0 || range !== 0 ? (
        <button
          onClick={() => {
            setCounter(0)
            setRange(0)
          }}
        >
          reset
        </button>
      ) : null}
    </>
  )
}

export default App
