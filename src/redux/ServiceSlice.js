
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getServices = createAsyncThunk(
  "services/getServices",
  async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "services");
    const data = await response.json();
    return data;
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default serviceSlice.reducer;
