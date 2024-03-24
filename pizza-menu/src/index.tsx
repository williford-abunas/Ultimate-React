import React from 'react'
import ReactDOM, { Container } from 'react-dom/client'
import './index.css'
import { PizzaModel, pizzaData } from './data.tsx'

interface PizzaProps {
  pizzaObj: PizzaModel
  key: number
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
  const numPizzas = pizzaData.length
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {numPizzas > 0 ? (
        <>
          <p>
            Authentic Italian Cuisine. 6 exquisite dishes to choose from. Stone
            oven. Organic.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza, index) => (
              <Pizza pizzaObj={pizza} key={index} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're preparing our menu. Please come back later.</p>
      )}
    </main>
  )
}

function Pizza({ pizzaObj, key }: PizzaProps) {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? 'sold-out' : ''}`} key={key}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <h3>{pizzaObj.name}</h3>
      <p>{pizzaObj.ingredients}</p>
      <span>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price}</span>
    </li>
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 20
  const isOpen = hour >= openHour && hour <= closeHour
  console.log(isOpen)

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We're happy to have you between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  )
}

function Order({ closeHour }) {
  return (
    <div className="order">
      <p>We're open until {closeHour}:00. Come visit us or order online. </p>
      <button className="btn">Order</button>
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root') as Container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
