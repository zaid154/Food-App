import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "../utils/cartSlice"
const appStore = configureStore({
    reducer: {
        cart: cartReducers
    }
})

export default appStore;