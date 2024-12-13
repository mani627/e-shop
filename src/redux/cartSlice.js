import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [


        ]
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id && action.payload.categoryId === item.categoryId);



            if (existingItem) {
                existingItem.quantity = Math.min(existingItem.quantity + 1, action.payload.stock); // Limit to stock
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateCartItemQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id && action.payload.categoryId === item.categoryId);
            if (item) {
                item.quantity = Math.min(action.payload.quantity, item.stock);
                if (item.quantity === 0) {
                    state.items = state.items.filter(i => i.id !== item.id);
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;