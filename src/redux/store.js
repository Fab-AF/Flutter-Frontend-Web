import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import categoryReducer from "./category/categorySlice";

// Create store
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});

export default store;
