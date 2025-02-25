import { Link } from "react-router-dom"
import React from 'react'
import PageNav from "../components/PageNav.tsx"

function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>Worldwise</h1>
      <Link to="/app">Go to the app</Link>
      </div>
  )
}

export default Homepage