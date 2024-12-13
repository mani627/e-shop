import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockApi from "../datas/index";

const ordersSlice = createSlice({
  name: "orders",
  initialState: { orders: [], status: "idle", error: null },
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
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (cartItems, { getState }) => {
    // Get products state to access stock information
    const products = getState().products.products;
    

    const hasOverstockedItems = cartItems.some(
      (item) => item.quantity > item.stock
    );

    if (hasOverstockedItems) {
      console.log(`Not enough stock for product to Place order`);

      throw new Error(`Not enough stock for product to Place order`);
    }
    // Check if there's enough stock before placing order
    // for (const item of cartItems) {
    //   const product = products.find((p) => p.id === item.id &&p.categoryId===item.categoryId );
    //   if (!product || product.stock < item.quantity) {
    //     throw new Error(`Not enough stock for product ${item.name}`); // Reject if not enough stock
    //   }
    // }

    const order = await mockApi.placeOrder(cartItems);
    
    
    return { ...order, items: cartItems };
  }
);

export const selectAllOrders = (state) => state.orders.orders;
export default ordersSlice.reducer;
