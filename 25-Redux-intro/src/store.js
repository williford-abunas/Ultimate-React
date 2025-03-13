import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Features/Accounts/accountsSlice.js";
import customerReducer from "./Features/Customers/customersSlice.js"

// RTK has built in thunk, devtools
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer
  }
})

export default store