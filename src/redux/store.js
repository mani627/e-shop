import { configureStore  } from '@reduxjs/toolkit';
import categoriesSlice from "./categorySlice";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice"
import ordersSlice from "./orderSlice"


const store = configureStore({
    reducer: {
        categories:categoriesSlice ,
        products: productsSlice,
        cart: cartSlice,
        orders: ordersSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // This line configures thunk
});

export default store;