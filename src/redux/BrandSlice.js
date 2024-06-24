import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBrands = createAsyncThunk(
  'brands/getBrands',
  async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}brands`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
);

export const brandSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  }
});

export default brandSlice.reducer;
