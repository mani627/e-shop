import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockApi from "../datas/index";



const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    deletedIds: [],
    status: "idle",
    error: null,
  },
  reducers: {
    toggleCategoryStatus: (state, action) => {
      const categoryIndex = state.categories.findIndex(
        (c) => c.id === action.payload
      );
      if (categoryIndex !== -1) {
        state.categories[categoryIndex].isActive =
          !state.categories[categoryIndex].isActive;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = mergeCategories(state.categories, action.payload, state.deletedIds); // Include deletedIds
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedCategoryIndex = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );
        if (updatedCategoryIndex !== -1) {
          state.categories[updatedCategoryIndex] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deletedIds = [...state.deletedIds, action.payload];

      });
  },
});

const mergeCategories = (localCategories, mockCategories, deletedIds) => {
  const merged = [];
  const localCategoryMap = new Map(localCategories.map((c) => [c.id, c]));

  for (const mockCategory of mockCategories) {
    if (deletedIds.includes(mockCategory.id)) {
      continue;
    }

    const existingLocalCategory = localCategoryMap.get(mockCategory.id);
    if (existingLocalCategory) {
      merged.push({ ...mockCategory, isActive: existingLocalCategory.isActive });
    } else {
      merged.push(mockCategory);
    }
  }

  return merged;
};

// Thunks with Re-fetch Logic
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    return await mockApi.fetchCategories();
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (category, { dispatch }) => {
    await mockApi.createCategory(category);
    // Fetch updated categories after creation
    return await dispatch(fetchCategories()).unwrap();
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category, { dispatch }) => {
    await mockApi.updateCategory(category);
    // Fetch updated categories after update
    return await dispatch(fetchCategories()).unwrap();
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    await mockApi.deleteCategory(id);
    return id;
  }
);

export const { toggleCategoryStatus } = categoriesSlice.actions;
export const selectAllCategories = (state) => state.categories.categories;
export default categoriesSlice.reducer;