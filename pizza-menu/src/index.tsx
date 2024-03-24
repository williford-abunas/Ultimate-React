import React from 'react'
import ReactDOM, { Container } from 'react-dom/client'
import './index.css'
import { PizzaModel, pizzaData } from './data.tsx'

interface PizzaProps {
  pizzaData: PizzaModel[]
}

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <>
      <header className="header">
        <h1>Fast React Pizza Co.</h1>
      </header>
    </>
  )
}
function Menu() {
  return (
    <>
      <main className="menu">
        <h2>Our Menu</h2>
        <Pizza pizzaData={pizzaData} />
      </main>
    </>
  )
}

function Pizza({ pizzaData }: PizzaProps) {
  return (
    <ul className="pizzas">
      {pizzaData.map((pizza, index) => (
        <li className="pizza" key={index}>
          <img src={pizza.photoName} alt={pizza.name} />
          <h3>{pizza.name}</h3>
          <p>{pizza.ingredients}</p>
          <span>{pizza.price}</span>
        </li>
      ))}
    </ul>
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 24
  const isOpen = hour >= openHour && hour <= closeHour
  console.log(isOpen)

  return (
    <>
      <footer className="footer">
        {new Date().toLocaleTimeString()} - We're currently open!
      </footer>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as Container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
