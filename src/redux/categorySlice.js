import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockApi from "../datas/index"
// Mock API (replace with your actual API calls)
// const mockApi = {
//     fetchCategories: () => Promise.resolve([{ id: 1232323232, name: 'Category ww', imageUrl: 'url1', isActive: true }, { id: 22323232323, name: 'Category 55', imageUrl: 'url2', isActive: false }]),
//     createCategory: (category) => Promise.resolve({ ...category,isActive: true, id: Date.now() }),
//     updateCategory: (category) => Promise.resolve({ ...category,isActive: true}),
//     deleteCategory: (id) => Promise.resolve(),
//     fetchProducts: (categoryId) => Promise.resolve([{ id: 1, name: 'Product 1', description: 'desc', stock: 10, price: 20, imageUrl: 'purl1', categoryId: categoryId, isActive: true, sales: 0 }, { id: 2, name: 'Product 2', description: 'desc2', stock: 5, price: 30, imageUrl: 'purl2', categoryId: categoryId, isActive: false, sales: 0 }]),
//       createProduct: (product) => Promise.resolve({ ...product, id: Date.now(), sales: 0 }),
//       updateProduct: (product) => Promise.resolve(product),
//       deleteProduct: (id) => Promise.resolve(),
//     placeOrder: (cartItems) => Promise.resolve({ orderId: Date.now() }),
//   };
  
  // Categories Slice
  const categoriesSlice = createSlice({
    name: 'categories',
    initialState: { categories: [], status: 'idle', error: null },
    reducers: {
      toggleCategoryStatus: (state, action) => {
        const category = state.categories.find(c => c.id === action.payload);
        if (category) {
          category.isActive = !category.isActive;
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.pending, (state) => { state.status = 'loading'; })
        .addCase(fetchCategories.fulfilled, (state, action) => {

          
          state.status = 'succeeded'; state.categories = action.payload; })
        .addCase(fetchCategories.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; })


        .addCase(createCategory.fulfilled, (state, action) => { state.categories.push(action.payload); })
        .addCase(updateCategory.fulfilled, (state, action) => {
          
        
            const index = state.categories.findIndex((c) => c.id === action.payload.id);
            console.log("mkmkmkmkmkm",action.payload,index);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter((c) => c.id !== action.payload);
        });
    },
  });
  
  export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    return await mockApi.fetchCategories();
  });
  
  export const createCategory = createAsyncThunk('categories/createCategory', async (category) => {
      return await mockApi.createCategory(category);
  });
  
  export const updateCategory = createAsyncThunk('categories/updateCategory', async (category) => {
      return await mockApi.updateCategory(category);
  });
  export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
      await mockApi.deleteCategory(id);
      return id;
  });
  
  export const { toggleCategoryStatus } = categoriesSlice.actions;
  export const selectAllCategories = (state) => state.categories.categories;
  export default categoriesSlice.reducer;