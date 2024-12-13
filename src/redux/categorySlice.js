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
        state.categories = mergeCategories(
          state.categories,
          action.payload,
          state.deletedIds
        ); // Include deletedIds
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("creating", action.payload);

        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Debugging logs to check payload and state
        console.log("Action Payload:", action.payload);
        console.log("Current Categories State:", state.categories);

        // Find the index of the category to update
        const updatedCategoryIndex = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );

        console.log("updatedCategoryIndex", updatedCategoryIndex);
        if (updatedCategoryIndex !== -1) {
          // Update the specific category
          state.categories[updatedCategoryIndex] = {
            ...state.categories[updatedCategoryIndex],
            ...action.payload, // Merge the payload with the existing category
          };
        } else {
          console.warn("Category not found for update:", action.payload);
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
  console.log({ deletedIds });

  for (const mockCategory of mockCategories) {
    if (deletedIds?.includes(mockCategory.id)) {
      continue;
    }

    const existingLocalCategory = localCategoryMap.get(mockCategory.id);

    if (existingLocalCategory) {
      // Combine mockCategory and localCategory properties (including id)
      merged.push({
        ...mockCategory,
        isActive: existingLocalCategory.isActive,
        ...existingLocalCategory,
      });
    } else {
      merged.push(mockCategory);
    }
  }
  // deletedIds?.includes(mockCategory.id)
  const filteredLocalCategories = localCategories.filter((localCategory) => {
    return !mockCategories.some(
      (mockCategory) => mockCategory.id === localCategory.id
    ) &&! deletedIds?.includes(localCategory.id);
  });
  merged.push(...filteredLocalCategories);
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
    return await mockApi.createCategory(category);
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category, { dispatch }) => {
    return await mockApi.updateCategory(category);
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
