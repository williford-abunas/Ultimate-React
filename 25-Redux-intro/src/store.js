import { createStore, combineReducers } from "redux";
import accountReducer from "./Features/Accounts/accountsSlice.js";
import customerReducer from "./Features/Customers/customersSlice.js"

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
})

const store = createStore(rootReducer)

export default store