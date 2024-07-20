import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./redux/CollectionSlice"; 
import BrandReducer from "./redux/BrandSlice"; 
import serviceReducer from "./redux/ServiceSlice";
export const store = configureStore({
  reducer: {
    collections: collectionReducer,
    brands: BrandReducer,
    services: serviceReducer,
  },
});
