import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import accountReducer from "./Features/Accounts/accountsSlice.js";
import customerReducer from "./Features/Customers/customersSlice.js"

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store