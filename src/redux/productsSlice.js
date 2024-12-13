import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockApi from "../datas/index";
import { placeOrder } from "./orderSlice";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    deleteProductId: [],
    status: "idle",
    error: null,
  },
  reducers: {
    toggleProductStatus: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.isActive = !product.isActive;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { products, productsWithOrders } = action.payload;
        console.log("logic", products, productsWithOrders);

        state.products = products
          .filter((product) => !state.deleteProductId.includes(product.id))
          .map((newProduct) => {
            const updatedProduct = productsWithOrders.find(
              (p) => p.id === newProduct.id
            );
            return updatedProduct
              ? {
                  ...newProduct,
                  ...updatedProduct,
                  isActive: newProduct.isActive,
                }
              : newProduct;
          });
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        
        
        const index = state.products.findIndex(
          (p) => {
console.log("index",p.id,+action.payload.id);

           return p.id === +action.payload.id
          }
        );
      //  console.log({index},+action.payload.id);
        
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.products = state.products.filter((p) => p.id !== deletedId);
        state.deleteProductId.push(deletedId); // Maintain deleted product IDs
      })
      // Deduct stock count when order is placed
      .addCase(placeOrder.fulfilled, (state, action) => {
        action.payload.items.forEach((orderedItem) => {
          const product = state.products.find((p) => p.id === orderedItem.id);

          if (product) {
            product.stock -= orderedItem.quantity;
            product.sales += orderedItem.quantity * product.price; // Increment sales
          }
        });
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (categoryId, { getState }) => {
    const productsWithOrders = getState().productsWithOrders; // Access productsWithOrders slice
    const existStateProducts = getState().products;
    const deleteProductIds = existStateProducts.deleteProductId; // Access deleted product IDs

    console.log("sds",existStateProducts.products);
    
    let products = await mockApi.fetchProducts(categoryId);

    function updateProducts(products, exist) {
      return products.map((product) => {
        // Find the matching product in the exist array
        const matchingProduct = exist.find((item) => item.id === product.id);
        // If found, replace the product; otherwise, keep the original
        return matchingProduct ? matchingProduct : product;
      });
    }

    // Update products and filter out deleted ones
    products = updateProducts(products, existStateProducts.products).filter(
      (product) => !deleteProductIds.includes(product.id)
    );

    return { products, productsWithOrders }; // Combine data
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    return await mockApi.createProduct(product);
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {

   
    return await mockApi.updateProduct(product);
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await mockApi.deleteProduct(id);
    return id;
  }
);

export const { toggleProductStatus } = productsSlice.actions;
export const selectAllProducts = (state) => state.products.products;
export default productsSlice.reducer;
