import CreateCustomer from './Features/Customers/CreateCustomer.jsx'
import Customer from './Features/Customers/Customer.jsx'
import AccountOperations from './Features/Accounts/AccountOperations.jsx'
import BalanceDisplay from './Features/Accounts/BalanceDisplay.jsx'

function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  )
}

export default App
