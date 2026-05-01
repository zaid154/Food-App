import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    item: []
  },

  reducers: {

    // ✅ ADD ITEM (with quantity)
    addCart: (state, action) => {
      const existingItem = state.item.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.item.push({ ...action.payload, quantity: 1 });
      }
    },

    // ✅ REMOVE ITEM (decrease quantity or remove)
    removeCart: (state, action) => {
      const existingItem = state.item.find(
        (item) => item.id === action.payload
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.item = state.item.filter(
          (item) => item.id !== action.payload
        );
      }
    },

    // ✅ CLEAR CART
    clearCart: (state) => {
      state.item = [];
    }

  }
});

export const { addCart, removeCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;