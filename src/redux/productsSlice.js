import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "./orderSlice";


// Mock API (replace with your actual API calls)
const mockApi = {
    fetchCategories: () => Promise.resolve([{ id: 1, name: 'Category 1', imageUrl: 'url1', isActive: true }, { id: 2, name: 'Category 2', imageUrl: 'url2', isActive: false }]),
    createCategory: (category) => Promise.resolve({ ...category, id: Date.now() }),
    updateCategory: (category) => Promise.resolve(category),
    deleteCategory: (id) => Promise.resolve(),
    fetchProducts: (categoryId) => Promise.resolve([{ id: 1, name: 'Product 1', description: 'desc', stock: 10, price: 20, imageUrl: 'purl1', categoryId: categoryId, isActive: true, sales: 0 }, { id: 2, name: 'Product 2', description: 'desc2', stock: 5, price: 30, imageUrl: 'purl2', categoryId: categoryId, isActive: false, sales: 0 }]),
      createProduct: (product) => Promise.resolve({ ...product,isActive:true, id: Date.now(), sales: 0 }),
      updateProduct: (product) => Promise.resolve(product),
      deleteProduct: (id) => Promise.resolve(),
    placeOrder: (cartItems) => Promise.resolve({ orderId: Date.now() }),
  };

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
            .addCase(fetchProducts.fulfilled, (state, action) => { state.status = 'succeeded'; state.products = action.payload; })
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
                    if (product) {
                        product.stock -= orderedItem.quantity;
                        product.sales += orderedItem.quantity * product.price; // Increment sales
                    }
                });
            });
    },
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (categoryId) => {
    return await mockApi.fetchProducts(categoryId);
});
export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
    return await mockApi.createProduct(product);
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
    console.log("sdjfhbdsjkf",product.id);
    
    return await mockApi.updateProduct(product);
});
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await mockApi.deleteProduct(id);
    return id;
});

export const { toggleProductStatus } = productsSlice.actions;
export const selectAllProducts = (state) => state.products.products;
export default productsSlice.reducer;