import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./redux/CollectionSlice"; 
import BrandReducer from "./redux/BrandSlice"; 


export const store = configureStore({
  reducer: {
    collections: collectionReducer,
    brands: BrandReducer
  }
});
