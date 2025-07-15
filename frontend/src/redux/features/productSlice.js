import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  const { data } = await axios.get(`${API}/products`);
  //  console.log("Fetched products:", data);
  return data.product;
});
export const fetchProduct = createAsyncThunk("product/fetchId", async (id) => {
  const { data } = await axios.get(`${API}/products/${id}`);
  // console.log("Fetched products:", data);

  return data;
});

const initialState = {
  items: [],
  product: null,
  error: null,
  loadingItems: false,
  loadingProduct: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // PRODUCTS - ITEMS
      .addCase(fetchProducts.pending, (state) => {
        state.loadingItems = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingItems = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingItems = false;
        state.error = action.error.message;
      })

      // PRODUCT - PRODUCT
      .addCase(fetchProduct.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
