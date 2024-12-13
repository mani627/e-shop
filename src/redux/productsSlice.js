import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "./orderSlice";
import mockApi from "../datas/index"
import { addProductsWithOrders } from "./productsWithOrdersSlice";



const productsSlice = createSlice({
    name: 'products',
    initialState: { products: [], status: 'idle', error: null },
    reducers: {
        toggleProductStatus: (state, action) => {
            const product = state.products.find(p => p.id === action.payload);
            if (product) {
                product.isActive = !product.isActive;
            }
        },
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { products, productsWithOrders } = action.payload;
            
                state.products = products.map((newProduct) => {
                    const updatedProduct = productsWithOrders.find((p) => p.id === newProduct.id);
                    return updatedProduct ? { ...newProduct, ...updatedProduct } : newProduct;
                });
            })

            .addCase(fetchProducts.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; })
            .addCase(createProduct.fulfilled, (state, action) => { state.products.push(action.payload); })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((p) => p.id !== action.payload);
            })
            //deduct stock count when order place
            .addCase(placeOrder.fulfilled, (state, action) => {
                action.payload.items.forEach(orderedItem => {
                    const product = state.products.find(p => p.id === orderedItem.id);
                    console.log("bb",JSON.parse(JSON.stringify(state)),action.payload.items);
                    
                    if (product) {
                        product.stock -= orderedItem.quantity;
                        product.sales += orderedItem.quantity * product.price; // Increment sales
                    }
                    console.log("uu",action.payload.items);
                    
                });

                console.log("Updated State After Update:", JSON.parse(JSON.stringify(state))); // Check the updated state
                // dispatch(addProductsWithOrders(state.products));

            });
    },
});

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (categoryId, { getState }) => {
        const productsWithOrders = getState().productsWithOrders; // Access productsWithOrders slice
        const products = await mockApi.fetchProducts(categoryId);
        return { products, productsWithOrders }; // Combine data
    }
);
export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
    return await mockApi.createProduct(product);
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
    console.log("sdjfhbdsjkf", product.id);

    return await mockApi.updateProduct(product);
});
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await mockApi.deleteProduct(id);
    return id;
});

export const { toggleProductStatus,stockUpdate } = productsSlice.actions;
export const selectAllProducts = (state) => state.products.products;
export default productsSlice.reducer;