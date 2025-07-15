import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
