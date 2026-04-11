import { createSlice, isAction } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        item: ["PIZZA", "BURGGER"]
    },
    reducer: {
        addCart: (state, action) => {
            state.item.push(action.payload)
        },
        removeCart: (state, action) => {
            state.item.pop()
        },
        clearCart: (state, action) => {
            state.item.length = 0
        }
    }
})

const { addCart, reducer, clearCart } = cartSlice.actions

export default cartSlice.reducer

