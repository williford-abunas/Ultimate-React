import React from 'react'
import ReactDOM, { Container } from 'react-dom/client'

function App() {
  return <h1>Hello React!</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root') as Container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
