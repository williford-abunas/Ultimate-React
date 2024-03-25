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
  const [step, setStep] = useState(1)

  const date = new Date()
  date.setDate(date.getDate() + counter)

  const handleAddCount = () => {
    setCounter((prevCount: number) => prevCount + step)
  }
  const handleMinusCount = () => {
    setCounter((prevCount: number) => prevCount - step)
  }

  const handleAddStep = () => {
    setStep((prevCount: number) => prevCount + 1)
  }
  const handleMinusStep = () => {
    setStep((prevCount: number) => prevCount - 1)
  }

  return (
    <>
      <div className="counterContainer">
        <button className="minus" onClick={handleMinusStep}>
          -
        </button>
        <h3>Step: {step}</h3>
        <button className="plus" onClick={handleAddStep}>
          +
        </button>

        <button className="minus" onClick={handleMinusCount}>
          -
        </button>
        <h3>Count: {counter}</h3>
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
    </>
  )
}

export default App
