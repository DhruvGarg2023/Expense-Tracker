import { configureStore } from "@reduxjs/toolkit";   // It simplifies store configuration by integrating commonly used middleware and providing a more streamlined setup.
import authSlice from "./authSlice.js"
import expenseSlice from "./expenseSlice.js"

const store = configureStore({
    reducer:{
        auth:authSlice,   //user information
        expense:expenseSlice   //expense information

    }
})

export default store;