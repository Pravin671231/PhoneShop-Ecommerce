import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";
import addressReducer from "./features/addressSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    address: addressReducer,
  },
});

export default store;
