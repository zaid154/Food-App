import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        item: []
    },
    reducers: {
<<<<<<< HEAD
=======

        // ADD ITEM (with quantity)
>>>>>>> 5628179a55284007f8dc614178d20affbbf3c7b0
        addCart: (state, action) => {
            const existingItem = state.item.find(
                (item) => item.id === action.payload.id
            )

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.item.push({ ...action.payload, quantity: 1 })
            }
        },

        // REMOVE ITEM (decrease quantity)
        removeCart: (state, action) => {
<<<<<<< HEAD
            if (typeof action.payload === "number") {
                state.item.splice(action.payload, 1)
                return
            }

            state.item.pop()
=======
            const existingItem = state.item.find(
                (item) => item.id === action.payload
            )

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1
            } else {
                state.item = state.item.filter(
                    (item) => item.id !== action.payload
                )
            }
>>>>>>> 5628179a55284007f8dc614178d20affbbf3c7b0
        },

        // CLEAR CART
        clearCart: (state) => {
            state.item = []
        }
    }
})

export const { addCart, removeCart, clearCart } = cartSlice.actions
<<<<<<< HEAD

export default cartSlice.reducer

=======
export default cartSlice.reducer
>>>>>>> 5628179a55284007f8dc614178d20affbbf3c7b0
