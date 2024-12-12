import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const mockApi = {
    fetchCategories: () => Promise.resolve([{ id: 1, name: 'Category 1', imageUrl: 'url1', isActive: true }, { id: 2, name: 'Category 2', imageUrl: 'url2', isActive: false }]),
    createCategory: (category) => Promise.resolve({ ...category, id: Date.now() }),
    updateCategory: (category) => Promise.resolve(category),
    deleteCategory: (id) => Promise.resolve(),
    fetchProducts: (categoryId) => Promise.resolve([{ id: 1, name: 'Product 1', description: 'desc', stock: 10, price: 20, imageUrl: 'purl1', categoryId: categoryId, isActive: true, sales: 0 }, { id: 2, name: 'Product 2', description: 'desc2', stock: 5, price: 30, imageUrl: 'purl2', categoryId: categoryId, isActive: false, sales: 0 }]),
      createProduct: (product) => Promise.resolve({ ...product, id: Date.now(), sales: 0 }),
      updateProduct: (product) => Promise.resolve(product),
      deleteProduct: (id) => Promise.resolve(),
    placeOrder: (cartItems) => Promise.resolve({ orderId: Date.now() }),

  };
const ordersSlice = createSlice({
    name: 'orders',
    initialState: { orders: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload);
        });
    },
});

// export const placeOrder = createAsyncThunk('orders/placeOrder', async (cartItems) => {
//     const order = await mockApi.placeOrder(cartItems);
//     return { ...order, items: cartItems };
// });
export const placeOrder = createAsyncThunk('orders/placeOrder', async (cartItems, { getState }) => {
    // Get products state to access stock information
    const products = getState().products.products;

    // Check if there's enough stock before placing order
    for (const item of cartItems) {
        const product = products.find(p => p.id === item.id);
        if (!product || product.stock < item.quantity) {
            throw new Error(`Not enough stock for product ${item.name}`); // Reject if not enough stock
        }
    }

    const order = await mockApi.placeOrder(cartItems);
    return { ...order, items: cartItems };
});

export const selectAllOrders = (state) => state.orders.orders;
export default ordersSlice.reducer;
