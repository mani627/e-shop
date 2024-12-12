import { createSlice } from '@reduxjs/toolkit';

const productsWithOrdersSlice = createSlice({
    name: 'productsWithOrders',
    initialState: [], // Initialize as an empty array
    reducers: {
        addProductsWithOrders: (state, action) => {
            if (Array.isArray(action.payload)) {
                action.payload.forEach(newProduct => {
                    const existingProductIndex = state.findIndex(p => p.id === newProduct.id);
                    if (existingProductIndex !== -1) {
                        // Product exists, update its values
                        state[existingProductIndex] = { ...state[existingProductIndex], ...newProduct };
                    } else {
                        // Product doesn't exist, add it
                        state.push(newProduct);
                    }
                });
            } else if (typeof action.payload === 'object' && action.payload !== null) {
                const existingProductIndex = state.findIndex(p => p.id === action.payload.id);
                if (existingProductIndex !== -1) {
                    state[existingProductIndex] = { ...state[existingProductIndex], ...action.payload };
                } else {
                    state.push(action.payload);
                }
            } else {
                console.error("Payload must be an array or object");
            }
        },
        updateProductWithOrder: (state, action) => {
            const index = state.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload }; 
            }
        },
        removeProductWithOrder: (state, action) => {
            return state.filter(product => product.id !== action.payload);
        }
    },
});

export const { addProductsWithOrders, updateProductWithOrder, removeProductWithOrder } = productsWithOrdersSlice.actions;
export const selectProductsWithOrders = (state) => state.productsWithOrders;
export default productsWithOrdersSlice.reducer;