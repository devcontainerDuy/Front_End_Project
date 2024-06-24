import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading_product: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading_product = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading_product = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading_product = false;
        state.error = action.error.message; 
      });
  }
});

export default productSlice.reducer;
