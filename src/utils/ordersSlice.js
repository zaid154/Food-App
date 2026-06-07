import { createSlice } from "@reduxjs/toolkit";

// load saved orders from localStorage so order history is kept after refresh
const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const ordersSlice = createSlice({
    name: "orders",

    initialState: {
        list: savedOrders
    },

    reducers: {

        // add a new order to the top of the list
        addOrder: (state, action) => {
            state.list.unshift(action.payload);
        },

        // remove all orders (used on logout if needed)
        clearOrders: (state) => {
            state.list = [];
        }
    }
});

export const { addOrder, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
