// This is a simplified example focusing on structure and key components.
// A full implementation would require significantly more code, including API integration,
// robust error handling, and more detailed styling.

import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import {
//   incrementItem,
//   decrementItem,
//   removeItem,
//   addItem,
//   createOrder,
// } from './cartSlice'; // Create this slice
// import {
//   getCategories,
//   createCategory,
//   updateCategory,
//   deleteCategory,
// } from './categorySlice'; // Create this slice
// import {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from './productSlice'; // Create this slice
import "./index.css"; // Import your Tailwind CSS
import { selectAllCategories } from "./redux/categorySlice";
import { selectAllOrders } from "./redux/orderSlice";
import { selectAllProducts } from "./redux/productsSlice";
import { selectProductsWithOrders } from "./redux/productsWithOrdersSlice";

// const Header = () => {
//   const cart = useSelector((state) => state.cart.items);
//   const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
//   return (
//     <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold">My Shop</h1>
//       <div className="flex items-center">
//         <Link to="/cart" className="relative mr-4">
//           <span className="material-symbols-outlined">shopping_cart</span>
//           {cartCount > 0 && (
//             <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full px-1">
//               {cartCount}
//             </span>
//           )}
//         </Link>
//         <Link to="/categories">
//           <span className="material-symbols-outlined">settings</span>
//         </Link>
//       </div>
//     </header>
//   );
// };

// const HomePage = () => {
//   const categories = useSelector((state) => state.categories.categories);
//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Categories</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {categories.map((category) => (
//           <Link
//             to={`/products/${category.id}`}
//             key={category.id}
//             className="border p-4 rounded"
//           >
//             {category.name}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

const Header = lazy(() => import("./components/Header"));
const HomePage = lazy(() => import("./components/HomePage"));
const ProductListing = lazy(() => import("./components/ProductListing"));
const ItemDescription = lazy(() => import("./components/ItemDescription"));
const CartPage = lazy(() => import("./components/CartPage"));
const OrdersListing = lazy(() => import("./components/OrdersListing"));
const CategoryList = lazy(() => import("./components/CategoryList"));
//  const CreateCategory = lazy(() => import('./components/CreateCategory'));
const UpdateCategory = lazy(() => import("./components/UpdateCategory"));
const ProductList = lazy(() => import("./components/ProductList"));
// const CreateProduct = lazy(() => import('./components/CreateProduct'));
const UpdateProduct = lazy(() => import("./components/UpdateProduct"));
const App = () => {
  const orders = useSelector(selectAllOrders);
  const productsWithOrdersData = useSelector(selectProductsWithOrders);
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);

  //console.log("products",products, "orders",orders,"final",productsWithOrdersData);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
          <Route path="/categories/create" element={<UpdateCategory />} />
          <Route path="/categories/update/:id" element={<UpdateCategory />} />

          {/* Product Manipulation */}
          <Route path="/products/list/:categoryId" element={<ProductList />} />
          <Route path="/products/create/:id" element={<UpdateProduct />} />
          <Route path="/products/update/:id" element={<UpdateProduct />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

// const App = () => {
//   const dispatch = useDispatch();
//  // const navigate = useNavigate(); // For navigation
//   const categories = useSelector(selectAllCategories);
//   const products = useSelector(selectAllProducts);
//   const cartItems = useSelector(selectCartItems);
//   const orders = useSelector(selectAllOrders);

// console.log("mkm",cartItems)
//   useEffect(() => {
//       dispatch(fetchCategories());
//   }, [dispatch]);

//   const handleCategoryToggle = (categoryId) => {
//       dispatch(toggleCategoryStatus(categoryId));
//   };
//   const handleCreateCategory = (categoryData) => {
//       dispatch(createCategory(categoryData));
//   };
//   const handleUpdateCategory = (categoryData) => {
//       dispatch(updateCategory(categoryData));
//   };
//   const handleDeleteCategory = (categoryId) => {
//       dispatch(deleteCategory(categoryId));
//   };

//   useEffect(() => {
//       // Example: Fetch products when a category is selected (you'll need to pass the categoryId)
//       if (categories.length > 0) {
//           dispatch(fetchProducts(categories[0].id)); // Fetch for the first category initially
//       }
//   }, [dispatch, categories]);

//   const handleProductToggle = (productId) => {
//       dispatch(toggleProductStatus(productId));
//   };
//   const handleCreateProduct = (productData) => {
//       dispatch(createProduct(productData));
//   };
//   const handleUpdateProduct = (productData) => {
//       dispatch(updateProduct(productData));
//   };
//   const handleDeleteProduct = (productId) => {
//       dispatch(deleteProduct(productId));
//   };

//   const handleAddToCart = (product) => {
//       dispatch(addToCart(product));
//   };

//   const handleRemoveFromCart = (productId) => {
//       dispatch(removeFromCart(productId));
//   };

//   const handleUpdateCartItemQuantity = (productId, quantity) => {
//       dispatch(updateCartItemQuantity({ id: productId, quantity }));
//   };

//   const handlePlaceOrder = () => {
//       dispatch(placeOrder(cartItems)).then(() => {
//           dispatch(clearCart());
//        //   navigate('/orders'); // Navigate after placing the order
//       });
//   };

//   // Example usage in JSX:
//   return (
//       <div>
//           {/* Categories */}
//           <h2>Categories</h2>
//           {categories.map(category => (
//               <div key={category.id}>
//                   <p>{category.name}</p>
//                   <button onClick={() => handleCategoryToggle(category.id)}>Toggle Status</button>
//                   <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
//                   <button onClick={() => handleUpdateCategory({id:category.id, name: 'category Updated', imageUrl: ' updated newurl' })}>Update</button>
//               </div>
//           ))}
//           <button onClick={() => handleCreateCategory({ name: 'New Cat', imageUrl: 'newurl' })}>Create Category</button>

//           {/* Products */}
//           <h2>Products</h2>
//           {products.map(product => (
//               <div key={product.id}>
//                   <p>{product.name}</p>
//                   <button onClick={() => handleProductToggle(product.id)}>Toggle Status</button>
//                   <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
//                   <button onClick={() => handleUpdateProduct({id:product.id, name: 'updated Products', description: ' updated desc', stock: 100, price: 1000, imageUrl: 'updatd purl', categoryId: 1,isActive:true , sales:product.sales})}>Update</button>
//                   <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
//               </div>
//           ))}
//           <button onClick={() => handleCreateProduct({ name: 'New Prod', description: 'desc', stock: 10, price: 20, imageUrl: 'purl', categoryId: 1 })}>Create Product</button>

//           {/* Cart */}
//           <h2>Cart</h2>
//           {cartItems.map(item => (
//               <div key={item.id}>
//                   <p>{item.name} x {item.quantity}</p>
//                   <button onClick={() => handleUpdateCartItemQuantity(item.id, item.quantity - 1)}>-</button>
//                   <button onClick={() => handleUpdateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
//                   <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
//               </div>
//           ))}
//           <button onClick={handlePlaceOrder}>Place Order</button>

//           {/* Orders */}
//           <h2>Orders</h2>
//           {orders.map(order => (
//               <div key={order.orderId}>
//                   <p>Order ID: {order.orderId}</p>
//                   <ul>
//                       {order.items.map(item => (
//                           <li key={item.id}>{item.name} x {item.quantity}</li>
//                       ))}
//                   </ul>
//               </div>
//           ))}
//       </div>
//   );
// }

export default App;
