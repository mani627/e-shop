

import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";


const Header = lazy(() => import("./components/Header"));
const HomePage = lazy(() => import("./components/HomePage"));
const ProductListing = lazy(() => import("./components/ProductListing"));
const ItemDescription = lazy(() => import("./components/ItemDescription"));
const CartPage = lazy(() => import("./components/CartPage"));
const OrdersListing = lazy(() => import("./components/OrdersListing"));
const CategoryList = lazy(() => import("./components/CategoryList"));
const UpdateCategory = lazy(() => import("./components/UpdateCategory"));
const ProductList = lazy(() => import("./components/ProductList"));
const UpdateProduct = lazy(() => import("./components/UpdateProduct"));
const NotFound = lazy(() => import("./components/NotFound"));


const App = () => {
  


  return (
    <BrowserRouter>
      <Suspense fallback={ <div id="loadingDiv"><div class="loader"></div></div> }>
        <Header />
        <Routes>
          {/* create orders */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:categoryId" element={<ProductListing />} />
          <Route path="/product/:productId" element={<ItemDescription />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersListing />} />

          {/* Category Manipulation */}
          <Route path="/categories" element={<CategoryList />} />
        {/* Mainteined generic component for update and create */}
          <Route path="/categories/create" element={<UpdateCategory />} />
          <Route path="/categories/update/:id" element={<UpdateCategory />} />

          {/* Product Manipulation */}
          <Route path="/products/list/:categoryId" element={<ProductList />} />
          {/* Mainteined generic component for update and create */}
          <Route path="/products/create/:id" element={<UpdateProduct />} />
          <Route path="/products/update/:id" element={<UpdateProduct />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
