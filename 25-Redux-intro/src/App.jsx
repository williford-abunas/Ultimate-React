import CreateCustomer from './Features/Customers/CreateCustomer.jsx'
import Customer from './Features/Customers/Customer.jsx'
import AccountOperations from './Features/Accounts/AccountOperations.jsx'
import BalanceDisplay from './Features/Accounts/BalanceDisplay.jsx'
import { useSelector } from 'react-redux'

function App() {
  const { fullName } = useSelector((state) => state.customer)
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === '' ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  )
}

export default App
