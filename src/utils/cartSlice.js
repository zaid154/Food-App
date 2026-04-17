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
            if (typeof action.payload === "number") {
                state.item.splice(action.payload, 1)
                return
            }

            state.item.pop()
        },
        clearCart: (state, action) => {
            state.item.length = 0
        }
    }
})

export const { addCart, removeCart, clearCart } = cartSlice.actions

export default cartSlice.reducer

