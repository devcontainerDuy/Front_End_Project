import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the async thunk for fetching collections
export const getCollection = createAsyncThunk(
  'collections/getCollections',
  async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}categories`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
);

// Create the slice for collections
export const collectionSlice = createSlice({
  name: 'collections',
  initialState: {
    collections: [],
    loading1: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(getCollection.pending, (state) => {
        state.loading1 = true;
        state.error = null;
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        state.loading1 = false;
        state.collections = action.payload;
      })
      .addCase(getCollection.rejected, (state, action) => {
        state.loading1 = false;
        state.error = action.error.message; // Set error message on failure
      });
  }
});

export default collectionSlice.reducer;
