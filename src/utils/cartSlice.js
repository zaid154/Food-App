import { createSlice, isAction } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        item: []
    },
    reducers: {
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

export const { addCart, removeCart, clearCart } = cartSlice.actions

export default cartSlice.reducer

