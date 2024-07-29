import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPostCollections = createAsyncThunk(
  'post/getPostCollections',
  async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}post-collections`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
);

const postCollectionsSlice = createSlice({
  name: 'postcollections',
  initialState: {
    postCollections: [],
    loading2: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostCollections.pending, (state) => {
        state.loading2 = true;
        state.error = null;
      })
      .addCase(getPostCollections.fulfilled, (state, action) => {
        state.loading2 = false;
        state.postCollections = action.payload;
      })
      .addCase(getPostCollections.rejected, (state, action) => {
        state.loading2 = false;
        state.error = action.error.message;
      });
  }
});

export default postCollectionsSlice.reducer;
