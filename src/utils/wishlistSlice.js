import { createSlice } from "@reduxjs/toolkit";

// load saved wishlist from localStorage so likes survive page refresh
const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistSlice = createSlice({
    name: "wishlist",

    initialState: {
        item: savedWishlist
    },

    reducers: {

        // add a recipe to wishlist if it is not already there
        addWishlist: (state, action) => {
            const exists = state.item.find((i) => i.id === action.payload.id);
            if (!exists) {
                state.item.push(action.payload);
            }
        },

        // remove a recipe from wishlist by id
        removeWishlist: (state, action) => {
            state.item = state.item.filter((i) => i.id !== action.payload);
        },

        // empty the wishlist
        clearWishlist: (state) => {
            state.item = [];
        }
    }
});

export const { addWishlist, removeWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
