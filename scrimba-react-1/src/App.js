import logo from './logo.svg'

function App() {
  return (
    <div className="app-container">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

const Main = () => {
  return (
    <div className="main-container">
      <h1>Fun facts about React:</h1>
      <ul>
        <li>Was first realeased in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 100k stars on Github</li>
        <li>Is maintained by Facebook</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
    </div>
  )
}

const Header = () => {
  return (
    <header>
      <nav className="navEl">
        <img src={logo} alt="logo" className="logo" />
        <ul className="nav-items">
          <li>Pricing</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className="footer">
      <p>developed by Pocodev 2024</p>
    </footer>
  )
}

export default App
