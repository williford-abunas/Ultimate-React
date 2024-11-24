import React from 'react'
import logo from '../logo.svg'

const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
        <p className="logo-title">ReactFacts</p>
      </div>
      <p>React Course - Project 1</p>
    </nav>
  )
}

export default Navbar
