import React from 'react'
import ReactDOM, { Container } from 'react-dom/client'
import './index.css'
import { PizzaModel, pizzaData } from '../public/data'

function App() {
  return (
    <>
      <Header />
      <Menu />
      <Footer />
    </>
  )
}

function Header() {
  return (
    <>
      <h1 className="text-red">Fast React Pizza Co.</h1>
    </>
  )
}
function Menu() {
  return (
    <>
      <h2>Our Menu</h2>
      <Pizza />
    </>
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
      <footer>{new Date().toLocaleTimeString()} - We're currently open!</footer>
    </>
  )
}

function Pizza() {
  return (
    <div>
      <h2>Pizza</h2>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as Container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
